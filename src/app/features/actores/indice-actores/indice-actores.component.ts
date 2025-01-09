import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-indice-actores',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.scss',
})
export default class IndiceActoresComponent {
  readonly newActorRoute = Rutas.ACTOR_NUEVO;
}
