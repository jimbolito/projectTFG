// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
//   imports: [CommonModule, RouterModule], // Importa los módulos necesarios
// })
// export class HeaderComponent {
//   categories = [
//     {
//       name: 'Palas de padel',
//       subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
//       open: false,
//     },
//     {
//       name: 'Zapatillas',
//       subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
//       open: false,
//     },
//     {
//       name: 'Ropa',
//       subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
//       open: false,
//     },
//     {
//       name: 'Pelotas',
//       subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
//       open: false,
//     },
//     {
//       name: 'Accesorios',
//       subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
//       open: false,
//     },

//   ];

//   toggleSubmenu(categoryName: string): void {
//     this.categories = this.categories.map((cat) =>
//       cat.name === categoryName ? { ...cat, open: !cat.open } : { ...cat, open: false }
//     );
//   }
// }


//Despues del servicio:

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
      subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
      open: false,
    },
    {
      name: 'Zapatillas',
      subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
      open: false,
    },
    {
      name: 'Ropa',
      subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
      open: false,
    },
    {
      name: 'Pelotas',
      subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
      open: false,
    },
    {
      name: 'Accesorios',
      subcategories: ['Adidas', 'Bullpadel', 'Babolat', 'Puma'],
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
