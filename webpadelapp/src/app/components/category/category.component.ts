

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
  ) { }

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
  // fetchProducts(category: string, brand: string): void {
  //   this.productService.getProducts(category, brand).subscribe({
  //     next: (data) => {
  //       this.products = data;
  //       this.error = null;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.error = 'Error al obtener los productos. Por favor, intente de nuevo.';
  //     },
  //   });
  // }



    // Llama al servicio para obtener los productos
  fetchProducts(category: string, brand: string): void {
    this.productService.getProducts(category, brand).subscribe({
      next: (data) => {
        this.products = data;
        console.log("productos a continuacion de data");
        console.log(data);
        this.error = null;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al obtener los productos. Por favor, intente de nuevo.';
      },
    });
  }
}
