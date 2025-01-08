import { Routes } from '@angular/router';
import { Rutas } from './shared/utils/rutas';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: Rutas.HOME,
    loadChildren: () => import('./features/home.routes'),
  },
  {
    path: Rutas.NOT_FOUND,
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];
