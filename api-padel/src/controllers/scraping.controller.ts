// // Uncomment these imports to begin using these cool features!

// // import {inject} from '@loopback/core';


// // export class ScrapingController {
// //   constructor() {}
// // }


// //nuevo codigo
// // src/controllers/scraping.controller.ts

// import {inject} from '@loopback/core';
// import {post, requestBody} from '@loopback/rest';
// import {ScrapingService} from '../services/scraping-service.service'; // <-- Importa la interfaz
// import urls from '../urls'; // <-- Archivo donde tienes definidas las URLs

// // Repositorios (si vas a guardar en Mongo)
// import {repository} from '@loopback/repository';
// import {Padelball, Padelracket, Padelshoe} from '../models';
// import {PadelballRepository, PadelracketRepository, PadelshoeRepository} from '../repositories';

// export class ScrapingController {
//   constructor(
//     // @inject('services.ScrapingServiceProvider')
//     @inject('services.ScrapingService')
//     protected scrapingService: ScrapingService, // inyecta la interfaz (ojo con el nombre del binding)
//     @repository(PadelshoeRepository)
//     public shoeRepo: PadelshoeRepository,
//     @repository(PadelracketRepository)
//     public racketRepo: PadelracketRepository,
//     @repository(PadelballRepository)
//     public ballRepo: PadelballRepository,
//   ) { }

//   /**
//    * Endpoint para scrapear según categoría y marca.
//    * Ej. POST /scrape
//    * {
//    *   "category": "shoesCategory",
//    *   "brand": "Adidas"
//    * }
//    */
//   @post('/scrape')
//   async scrapeByCategoryAndBrand(
//     @requestBody() body: {category: string; brand: string},
//   ) {
//     const {category, brand} = body;
//     const categoryObj = (urls as any)[category];
//     if (!categoryObj) {
//       return {error: `La categoría "${category}" no existe en urls.ts`};
//     }

//     const url = categoryObj[brand];
//     if (!url) {
//       return {
//         error: `La marca "${brand}" no existe en la categoría "${category}"`,
//       };
//     }

//     // Hacemos el scraping con nuestro servicio
//     const scrapedData = await this.scrapingService.scrape(url);
//     console.log("scrapedData");
//     // console.log(scrapedData)

//     // Guardamos en la colección correspondiente (según la categoría)
//     // Ajusta tu lógica si las colecciones difieren en campos
//     let insertedCount = 0;

//     // Ejemplo: shoesCategory => Padelshoe
//     if (category === 'shoesCategory') {
//       for (const item of scrapedData) {
//         const shoe: Partial<Padelshoe> = {
//           name: item.name,
//           price: item.price,
//           initial_price: item.oldPrice || undefined,
//           percentage_discount: item.discountPercentage || undefined,
//           stock_quantity: item.stock_quantity,
//           description: item.description || 'Sin descripción',
//           brand,
//           sex: item.sex,
//           level: item.level,
//           weight: item.weight,
//           images: item.imageUrls,
//           creation_date: new Date().toISOString(),
//           // sizes: item.sizes,
//           // Podrías mapear tus images: item.imageUrls
//         };
//         await this.shoeRepo.create(shoe);
//         insertedCount++;
//       }
//     } else if (category === 'padelCategory') {
//       // Insertar en padelrackets
//       for (const item of scrapedData) {
//         const racket: Partial<Padelracket> = {
//           name: item.name,
//           price: item.price,
//           initial_price: item.oldPrice || undefined,
//           percentage_discount: item.discountPercentage || undefined,
//           stock_quantity: item.stock_quantity,
//           description: item.description || 'Sin descripción',
//           brand,
//           sex: item.sex,
//           level: item.level,
//           weight: item.weight,
//           images: item.imageUrls,
//           creation_date: new Date().toISOString(),
//         };
//         await this.racketRepo.create(racket);
//         insertedCount++;
//       }
//     } else if (category === 'ballsCategory') {
//       // Insertar en padelballs
//       for (const item of scrapedData) {
//         const ball: Partial<Padelball> = {
//           name: item.name,
//           price: item.price,
//           initial_price: item.oldPrice || undefined,
//           percentage_discount: item.discountPercentage || undefined,
//           brand,
//           creation_date: new Date().toISOString(),
//         };
//         await this.ballRepo.create(ball);
//         insertedCount++;
//       }
//     }

//     return {
//       message: 'Scraping completado',
//       category,
//       brand,
//       insertedCount,
//     };
//   }
// }


//Codigo anter fuincional:
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


