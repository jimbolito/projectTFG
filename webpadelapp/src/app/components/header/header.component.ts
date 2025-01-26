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
      subcategories: ['Adidas', 'Babolat', 'Bullpadel', 'BlackCrown', ,'Dunlop', 'Enebe','Puma', 'Vibora', 'Wilson'],
      open: false,
    },
    {
      name: 'Zapatillas',
      subcategories: ['Adidas',  'Babolat', 'Bullpadel', 'BlackCrown', ,'Dunlop', 'Enebe','Puma', 'Vibora', 'Wilson'],
      open: false,
    },
    {
      name: 'Ropa',
      subcategories: ['Adidas',  'Babolat', 'Bullpadel', 'BlackCrown', ,'Dunlop', 'Enebe','Puma', 'Vibora', 'Wilson'],
      open: false,
    },
    {
      name: 'Pelotas',
      subcategories: ['Adidas',  'Babolat', 'Bullpadel', 'BlackCrown', ,'Dunlop', 'Enebe','Puma', 'Vibora', 'Wilson'],
      open: false,
    },
    {
      name: 'Accesorios',
      subcategories: ['Adidas',  'Babolat', 'Bullpadel', 'BlackCrown', ,'Dunlop', 'Enebe','Puma', 'Vibora', 'Wilson'],
      open: false,
    }
  ];

  toggleSubmenu(categoryName: string): void {
    this.categories = this.categories.map((cat) =>
      cat.name === categoryName ? { ...cat, open: !cat.open } : { ...cat, open: false }
    );
  }

  // toggleSubmenu(categoryName: string): void {
  //   this.categories = this.categories.map((category) =>
  //     category.name === categoryName
  //       ? { ...category, open: !category.open } // Abrir/cerrar el menú seleccionado
  //       : { ...category, open: false } // Cerrar otros submenús
  //   );
  // }
}
