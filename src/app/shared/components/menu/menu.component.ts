import { Component, inject, OnInit } from '@angular/core';
import { Rutas } from '@app/shared/utils/rutas';
import { environment } from '@src/environments/environment';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from '../../../features/auth/authorized/authorized.component';
import { AuthService } from '@app/features/auth/service/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, AuthorizedComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  showConfigs = false;
  isLoggedIn = false;
  readonly homeRoute = Rutas.HOME;
  readonly filterRoute = Rutas.PELICULA_FILTROS;
  readonly rutaLogin = Rutas.LOGIN;
  readonly rutaTablero = `${Rutas.APP}`;
  readonly titleSite = environment.name;
  readonly generosRoute = Rutas.GENEROS;
  readonly actoresRoute = Rutas.ACTORES;
  readonly cinesRoute = Rutas.CINES;
  readonly crearPeliculasRoute = Rutas.PELICULA_NUEVO;
  readonly usuariosRoute = Rutas.USUARIOS;
  authService = inject(AuthService);
  registerRoute: string = Rutas.REGISTER;
  loginRoute: string = Rutas.LOGIN;

  ngOnInit() {}
}
