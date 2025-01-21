// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


//Original: 
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter, Routes } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http'; // Nuevo enfoque
// import { AppComponent } from './app/app.component';
// import { HomeComponent } from './app/components/home/home.component';
// import { CategoryComponent } from './app/components/category/category.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'category/:subcategory', component: CategoryComponent },
//   { path: '**', redirectTo: '' },
// ];

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),
//   ],
// });


//Despues del servicio: 
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { CategoryComponent } from './app/components/category/category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:subcategory', component: CategoryComponent },
  { path: '**', redirectTo: '' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
});
