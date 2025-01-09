import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.scss',
})
export default class IndiceGenerosComponent {
  readonly newGeneroRoute = Rutas.GENERO_NUEVO;
}
