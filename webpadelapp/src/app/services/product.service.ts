// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   constructor() { }
// }


//original

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class ProductService {
  //En local funciona
  // private readonly BASE_URL = 'http://localhost:3000'; // Cambia según la URL de tu API

  //En dockercompose:
  // private readonly BASE_URL = 'http://api-padel:3000'; // Apunta al contenedor de la API
  private readonly BASE_URL = 'http://localhost:3000';



  constructor(private http: HttpClient) { }

  // Obtener productos según la categoría y la marca
  getProducts(category: string, brand: string): Observable<any[]> {
    let endpoint = '';

    // Define el endpoint según la categoría
    if (category === 'Palas de padel') {
      endpoint = `/padelrackets/brand/${brand}`;
    } else if (category === 'Zapatillas') {
      endpoint = `/padelballs/brand/${brand}`;
    } else {
      throw new Error(`Categoría no soportada: ${category}`);
    }

    return this.http.get<any[]>(`${this.BASE_URL}${endpoint}`);
  }
}
