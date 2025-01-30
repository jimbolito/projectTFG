import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  categories = [
    {
      name: 'Palas de padel',
      subcategories: ['Adidas', 'Babolat', 'Bullpadel', 'BlackCrown', 'Dunlop', 'Enebe', 'Puma', 'Vibora', 'Wilson'],
      open: false,
    },
    {
      name: 'Zapatillas',
      subcategories: ['Adidas', 'Babolat', 'Bullpadel', 'Joma', 'Wilson', 'Puma'],
      open: false,
    },
    {
      name: 'Ropa',
      subcategories: ['Adidas', 'Babolat', 'Bullpadel', 'Nox', 'Puma', 'Munich', 'Lok'],
      open: false,
    },
    {
      name: 'Pelotas',
      subcategories: ['Adidas', 'Bullpadel', 'Head', 'Wilson', 'StarVie', ''],
      open: false,
    },
    {
      name: 'Accesorios',
      subcategories: ['Adidas', 'Babolat', 'Bullpadel', 'Wilson', 'Nox'],
      open: false,
    }
  ];

  toggleSubmenu(categoryName: string): void {
    this.categories = this.categories.map((cat) =>
      cat.name === categoryName ? { ...cat, open: !cat.open } : { ...cat, open: false }
    );
  }

  slugify(text: string | undefined): string {
    if (!text) {
      return ''; // Devuelve una cadena vacía si el texto es undefined o null
    }
    return text.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
  }


  // toggleSubmenu(categoryName: string): void {
  //   this.categories = this.categories.map((category) =>
  //     category.name === categoryName
  //       ? { ...category, open: !category.open } // Abrir/cerrar el menú seleccionado
  //       : { ...category, open: false } // Cerrar otros submenús
  //   );
  // }
}
