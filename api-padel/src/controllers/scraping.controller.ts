import {inject} from '@loopback/core';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {ScrapingService} from '../services/scraping-service.service';
import urls from '../urls';
import {repository} from '@loopback/repository';
import {PadelballRepository, PadelracketRepository, PadelshoeRepository} from '../repositories';

export class ScrapingController {
  constructor(
    @inject('services.ScrapingService')
    protected scrapingService: ScrapingService,
    @repository(PadelshoeRepository)
    public shoeRepo: PadelshoeRepository,
    @repository(PadelracketRepository)
    public racketRepo: PadelracketRepository,
    @repository(PadelballRepository)
    public ballRepo: PadelballRepository,
  ) {}

  @post('/scrape')
  async scrapeByCategoryAndBrand(
    @requestBody() body: {category: string; brand: string},
  ) {
    const {category, brand} = body;

    // Validar entrada
    if (!category || !brand) {
      throw new HttpErrors.BadRequest('El campo "category" y "brand" son obligatorios.');
    }

    const categoryObj = (urls as any)[category];
    if (!categoryObj) {
      throw new HttpErrors.NotFound(`La categoría "${category}" no existe en urls.ts`);
    }

    const url = categoryObj[brand];
    if (!url) {
      throw new HttpErrors.NotFound(`La marca "${brand}" no existe en la categoría "${category}"`);
    }

    // Hacemos el scraping
    const scrapedData = await this.scrapingService.scrape(url);

    // Configuración por categoría
    const categoryConfig = {
      shoesCategory: {
        repo: this.shoeRepo,
        mapData: (item: any) => ({
          name: item.name,
          price: item.price,
          initial_price: item.oldPrice || undefined,
          percentage_discount: item.discountPercentage || undefined,
          stock_quantity: item.stock_quantity,
          description: item.description || 'Sin descripción',
          brand,
          sex: item.sex,
          level: item.level,
          weight: item.weight,
          images: item.imageUrls,
          creation_date: new Date().toISOString(),
        }),
      },
      padelCategory: {
        repo: this.racketRepo,
        mapData: (item: any) => ({
          name: item.name,
          price: item.price,
          initial_price: item.oldPrice || undefined,
          percentage_discount: item.discountPercentage || undefined,
          stock_quantity: item.stock_quantity,
          description: item.description || 'Sin descripción',
          brand,
          sex: item.sex,
          level: item.level,
          weight: item.weight,
          images: item.imageUrls,
          creation_date: new Date().toISOString(),
        }),
      },
      ballsCategory: {
        repo: this.ballRepo,
        mapData: (item: any) => ({
          name: item.name,
          price: item.price,
          percentage_discount: item.discountPercentage || undefined,
          description: item.description || 'Sin descripción',
          initial_price: item.oldPrice || undefined,
          brand,
          creation_date: new Date().toISOString(),
        }),
      },
    };

    const config = categoryConfig[category as keyof typeof categoryConfig];
    if (!config) {
      throw new HttpErrors.BadRequest(`La categoría "${category}" no está configurada.`);
    }

    // Insertar datos
    const {repo, mapData} = config;
    let insertedCount = 0;

    for (const item of scrapedData) {
      const data = mapData(item);
      await repo.create(data);
      insertedCount++;
    }

    return {
      message: 'Scraping completado',
      category,
      brand,
      insertedCount,
    };
  }
}


