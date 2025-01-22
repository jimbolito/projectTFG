// import { /* inject, */ BindingScope, injectable, Provider} from '@loopback/core';

// /*
//  * Fix the service type. Possible options can be:
//  * - import {ScrapingService} from 'your-module';
//  * - export type ScrapingService = string;
//  * - export interface ScrapingService {}
//  */
// export type ScrapingService = unknown;

// @injectable({scope: BindingScope.TRANSIENT})
// export class ScrapingServiceProvider implements Provider<ScrapingService> {
//   constructor(/* Add @inject to inject parameters */) { }

//   value() {
//     // Add your implementation here
//     throw new Error('To be implemented');
//   }
// }


//codigo nuevo

import {
  BindingScope,
  injectable,
  Provider,
} from '@loopback/core';
import puppeteer from 'puppeteer';

/**
 * Definimos la estructura que tendrán los productos scrapteados.
 * Ajusta o amplía estos campos según tus necesidades reales.
 */
export interface ScrapedProduct {
  name: string;
  price: number;
  oldPrice?: number | null;
  discountPercentage?: string | null;
  stock_quantity: number;
  description?: string;
  brand: string;
  sex?: string;
  level?: string;
  weight?: string;
  // sizes?: string[];
  imageUrls?: string[];
  creation_date: Date;

}

/**
 * Esta será la interfaz de nuestro servicio,
 * con el método `scrape` que recibe una URL.
 */
export interface ScrapingService {
  scrape(url: string): Promise<ScrapedProduct[]>;
}

/**
 * ScrapingServiceProvider: el proveedor que implementa la lógica de scraping
 */
@injectable({ scope: BindingScope.TRANSIENT })
export class ScrapingServiceProvider implements Provider<ScrapingService> {
  constructor(/* inyecta dependencias si necesitas */) { }


  /**
   * Método para aceptar cookies antes de realizar el scraping.
   */
  // private async acceptCookies(page: any) {
  //   // Esperar a que aparezca el contenedor del banner de cookies
  //   await page.waitForSelector('#CybotCookiebotDialogFooter');

  //   // Seleccionar el botón "Allow all"
  //   const allowAllButton = await page.$(
  //     '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'
  //   );
  //   if (allowAllButton) {
  //     await allowAllButton.click();
  //     console.log("Aceptando cookies");
  //     await this.delay(5000);
  //   } else {
  //     throw new Error('No se encontró el botón "Allow all" en el banner de cookies.');
  //   }
  // }

  //Waiting timing to do something:
  private async delay(ms?: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms ?? 500);
    });
  }
  private async pressButtonPlus(page: any) {
    // Selector para el botón 'Add to Cart'
    const addToCartSelector = '#AddToCart';

    try {
      // Verificar si el botón 'Add to Cart' está disabled
      const isAddToCartDisabled = await page.$eval(addToCartSelector, (button: { hasAttribute: (arg0: string) => boolean; }) => {
        return button.hasAttribute('disabled');
      });

      if (isAddToCartDisabled) {
        console.log('El botón "Add to Cart" está deshabilitado. No se realizará ninguna acción.');
        return 0;
      }

      // Selector para el botón 'Plus'
      const plusButtonSelector = 'button.plus[aria-label*="Increase quantity"]';

      // Obtener el botón 'Plus'
      const plusButton = await page.$(plusButtonSelector);

      if (!plusButton) {
        console.log('No se encontró el botón "Plus".');
        return 0;
      }

      // Generar un número aleatorio entre 10 y 40 para definir la cantidad de clics
      const randomClicks = Math.floor(Math.random() * (40 - 10 + 1)) + 10;

      console.log(`Realizando ${randomClicks} clic(s) en el botón "Plus".`);

      for (let i = 0; i < randomClicks; i++) {
        await plusButton.click();
        // Añadir un pequeño retraso entre clics para simular interacción humana
        await this.delay(600);
      }

      console.log('Acción completada.');

      return randomClicks;
    } catch (error) {
      console.error('Ocurrió un error:', error);
      return 0;
    }
  }



  value(): ScrapingService {
    return {
      scrape: async (url: string): Promise<ScrapedProduct[]> => {
        //Entornolocalhost que si funciona:
        // const browser = await puppeteer.launch({
        //   headless: false, // Cambiar a `true` si no necesitas ver la interacción
        //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // });

        //Entorno docker-compose
        const browser = await puppeteer.launch({
          executablePath: '/usr/bin/google-chrome', // Ruta al ejecutable de Google Chrome
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'], // Opciones necesarias para contenedores Docker
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        // Navegar a la URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Aceptar cookies si es necesario
        // await this.acceptCookies(page);

        // Esperar a que cargue el contenedor de productos
        await page.waitForSelector('#product-grid');

        // Extraer los enlaces únicos de los productos
        const productLinks = await page.$$eval(
          '#product-grid .product-card a.product-featured-image-link',
          (links) => links.map((link) => (link as any).href)
        );

        console.log(`Se encontraron ${productLinks.length} productos.`);

        const products: ScrapedProduct[] = [];

        // Iterar sobre los enlaces de productos
        for (const productLink of productLinks) {
          const productPage = await browser.newPage();
          // Configurar la resolución de la página
          await productPage.setViewport({
            width: 1920, // Ancho de la ventana
            height: 1080, // Alto de la ventana
          });
          await productPage.goto(productLink, { waitUntil: 'networkidle2' });


          //Cantidad de producto:
          const quantity: any = await this.pressButtonPlus(productPage);


          // Extrae la información del producto
          const name = await productPage.$eval('.product-title', el => el.textContent.trim());
          const priceText = await productPage.$eval('.price ins .amount', el => el.textContent.trim());
          // const initialPriceText = await productPage.$eval('.price del .amount', el => el.textContent.trim());
          // Manejo de error para el precio inicial
          const initialPriceText = await productPage
            .$eval('.price del .amount', el => el.textContent.trim())
            .catch(() => ''); // Si no existe, devuelve `vacio`
          // const percentageDiscount = await productPage.$eval('.badge.onsale', el => el.textContent.trim());
          const percentageDiscount = await productPage
            .$eval('.badge.onsale', el => el.textContent.trim())
            .catch(() => ''); // Manejo similar para porcentaje de descuento


          const description = await productPage.$eval('.collapsible__content.accordion__content.rte', el => el.textContent.trim());
          // const description = await productPage.$eval('#ProductAccordion-collapsible_tab_YejnpG-template--24313445745013__main-product', el => el.textContent.trim());

          const brand = await productPage.$$eval('.custom_row', (rows) => {
            for (const row of rows) {
              const titleElement = row.querySelector('.row_title');
              if (titleElement && titleElement.textContent?.trim() === 'Marca') {
                const valueElement = row.querySelector(':scope > div:nth-child(2) > div');
                return valueElement?.textContent?.trim() || null;
              }
            }
            return null;
          });

          // Obtén el valor del sexo
          const sex = await productPage.$$eval('.custom_row', (rows) => {
            for (const row of rows) {
              const titleElement = row.querySelector('.row_title');
              if (titleElement && titleElement.textContent?.trim() === 'Sexo') {
                const valueElement = row.querySelector(':scope > div:nth-child(2) > div');
                return valueElement?.textContent?.trim() || null;
              }
            }
            return null;
          });

          // Obtén el valor del nivel
          const level = await productPage.$$eval('.custom_row', (rows) => {
            for (const row of rows) {
              const titleElement = row.querySelector('.row_title');
              if (titleElement && titleElement.textContent?.trim() === 'Nivel') {
                const valueElement = row.querySelector(':scope > div:nth-child(2) > div');
                return valueElement?.textContent?.trim() || null;
              }
            }
            return null;
          });

          // Obtén el valor del peso
          const weight = await productPage.$$eval('.custom_row', (rows) => {
            for (const row of rows) {
              const titleElement = row.querySelector('.row_title');
              if (titleElement && titleElement.textContent?.trim() === 'Peso') {
                const valueElement = row.querySelector(':scope > div:nth-child(2) > div');
                return valueElement?.textContent?.trim() || null;
              }
            }
            return null;
          });

          const images = await productPage.$$eval('.product-images img', imgs =>
            imgs.map(img => img.getAttribute('src'))
          );

          const price = parseFloat(priceText.replace('€', '').replace(',', '.'));
          const initialPrice = parseFloat(initialPriceText.replace('€', '').replace(',', '.'));
          const creationDate = new Date();

          // const quantityStock = await this.pressPlusButtom(page);

          const productData = {
            name,
            price,
            initial_price: initialPrice,
            percentage_discount: percentageDiscount,
            stock_quantity: quantity,
            description,
            brand,
            sex,
            level,
            weight,
            images,
            creation_date: creationDate
          };

          products.push(productData);
          console.log(productData);

          await productPage.close();
        }

        // Cerrar el navegador
        await browser.close();

        return products;
      },
    };
  }

}
