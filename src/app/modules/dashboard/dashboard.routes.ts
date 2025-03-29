import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export default [
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: '**',
    redirectTo: 'home',
  },
] as Routes;
