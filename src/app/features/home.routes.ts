import { Routes } from '@angular/router';
import { esAdminGuard } from '@app/shared/guards/es-admin.guard';
import { Rutas } from '@app/shared/utils/rutas';

export default [
  {
    path: Rutas.HOME,
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: Rutas.GENEROS,
    loadComponent: () =>
      import('./generos/indice-generos/indice-generos.component'),
    canActivate: [esAdminGuard],
  },
  {
    path: Rutas.GENERO_NUEVO,
    loadComponent: () =>
      import('./generos/crear-generos/crear-generos.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.GENERO_EDITAR,
    loadComponent: () =>
      import('./generos/editar-genero/editar-genero.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.ACTORES,
    loadComponent: () =>
      import('./actores/indice-actores/indice-actores.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.ACTOR_NUEVO,
    loadComponent: () => import('./actores/crear-actor/crear-actor.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.ACTOR_EDITAR,
    loadComponent: () =>
      import('./actores/editar-actor/editar-actor.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.CINES,
    loadComponent: () => import('./cines/indice-cines/indice-cines.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.CINE_NUEVO,
    loadComponent: () => import('./cines/crear-cine/crear-cine.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.CINE_EDITAR,
    loadComponent: () => import('./cines/editar-cine/editar-cine.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.PELICULA_FILTROS,
    loadComponent: () =>
      import('./peliculas/filtro-peliculas/filtro-peliculas.component'),
  },

  {
    path: Rutas.PELICULA_NUEVO,
    loadComponent: () =>
      import('./peliculas/crear-pelicula/crear-pelicula.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.PELICULA_EDITAR,
    loadComponent: () =>
      import('./peliculas/editar-pelicula/editar-pelicula.component'),
    canActivate: [esAdminGuard],
  },

  {
    path: Rutas.PELICULA_VER_SLUG,
    loadComponent: () =>
      import('./peliculas/pelicula-detalle/pelicula-detalle.component'),
  },

  {
    path: Rutas.LOGIN,
    loadComponent: () => import('./auth/login/login.component'),
  },

  {
    path: Rutas.REGISTER,
    loadComponent: () => import('./auth/register/register.component'),
  },

  {
    path: Rutas.USUARIOS,
    loadComponent: () => import('./auth/usuarios/usuarios.component'),
    canActivate: [esAdminGuard],
  },
] as Routes;
