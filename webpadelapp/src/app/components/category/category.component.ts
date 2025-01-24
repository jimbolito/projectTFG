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
  categoryName: string | null = '';
  subcategoryName: string | null = '';
  products: any[] = [];
  error: string | null = null;

  selectedProduct: any | null = null; // Producto seleccionado para el modal
  currentImageIndex: number = 0; // Índice actual de la imagen en el modal
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
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
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

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

  openModal(product: any): void {
    this.selectedProduct = product;
    this.currentImageIndex = 0; // Resetear al inicio de las imágenes
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  nextImage(): void {
    if (this.selectedProduct) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.selectedProduct.images.length;
    }
  }

  prevImage(): void {
    if (this.selectedProduct) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.selectedProduct.images.length) %
        this.selectedProduct.images.length;
    }
  }
}