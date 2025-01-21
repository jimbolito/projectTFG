// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor

// @Component({
//   selector: 'app-category',
//   standalone: true,
//   templateUrl: './category.component.html',
//   styleUrls: ['./category.component.css'],
//   imports: [CommonModule], // Importa CommonModule para *ngIf, *ngFor
// })
// export class CategoryComponent implements OnInit {
//   categoryName: string | null = '';
//   products: any[] | null = null;

//   constructor(private route: ActivatedRoute, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.categoryName = this.route.snapshot.paramMap.get('subcategory');
//     if (this.categoryName) {
//       this.fetchProducts(this.categoryName);
//     }
//   }

//   fetchProducts(subcategory: string): void {
//     this.http
//       .get<any[]>(`http://localhost:3000/api/products?subcategory=${subcategory}`)
//       .subscribe((data) => (this.products = data));
//   }
// }


//modificado despues del servicio: 
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../../services/product.service';
// import { CommonModule } from '@angular/common'; // Importar CommonModule

// @Component({
//   selector: 'app-category',
//   standalone: true,
//   templateUrl: './category.component.html',
//   styleUrls: ['./category.component.css'],
//   imports: [CommonModule], // Agregar CommonModule aquí
// })
// export class CategoryComponent implements OnInit {
//   categoryName: string | null = ''; // Categoría seleccionada
//   subcategoryName: string | null = ''; // Subcategoría seleccionada
//   products: any[] = []; // Productos obtenidos desde la API
//   error: string | null = null; // Para manejar errores

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     // Captura la categoría y subcategoría desde la URL
//     this.subcategoryName = this.route.snapshot.paramMap.get('subcategory');
//     this.categoryName = this.route.snapshot.queryParamMap.get('category');

//     if (this.categoryName && this.subcategoryName) {
//       this.fetchProducts(this.categoryName, this.subcategoryName);
//     } else {
//       this.error = 'Faltan parámetros en la URL';
//     }
//   }

//   // Llama al servicio para obtener los productos
//   fetchProducts(category: string, brand: string): void {
//     this.productService.getProducts(category, brand).subscribe({
//       next: (data) => {
//         this.products = data;
//         this.error = null;
//       },
//       error: (err) => {
//         console.error(err);
//         this.error = 'Error al obtener los productos. Por favor, intente de nuevo.';
//       },
//     });
//   }
// }


//Solucion subscribirse a los cambios:

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [CommonModule],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryName: string | null = ''; // Categoría seleccionada
  subcategoryName: string | null = ''; // Subcategoría seleccionada
  products: any[] = []; // Productos obtenidos desde la API
  error: string | null = null; // Para manejar errores

  private routeSubscription: Subscription | null = null; // Para gestionar la suscripción

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en los parámetros de la ruta
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.subcategoryName = params['subcategory'];
      this.categoryName = this.route.snapshot.queryParamMap.get('category');

      if (this.categoryName && this.subcategoryName) {
        this.fetchProducts(this.categoryName, this.subcategoryName);
      } else {
        this.error = 'Faltan parámetros en la URL';
      }
    });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruye
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Llama al servicio para obtener los productos
  fetchProducts(category: string, brand: string): void {
    this.productService.getProducts(category, brand).subscribe({
      next: (data) => {
        this.products = data;
        this.error = null;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al obtener los productos. Por favor, intente de nuevo.';
      },
    });
  }
}
