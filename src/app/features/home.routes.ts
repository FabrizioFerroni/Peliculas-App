import { Routes } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';

export default [
  {
    path: Rutas.HOME,
    loadComponent: () => import('./home/home.component'),
  },
] as Routes;
