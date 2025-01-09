import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-indice-cines',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './indice-cines.component.html',
  styleUrl: './indice-cines.component.scss',
})
export default class IndiceCinesComponent {
  readonly newCineRoute = Rutas.CINE_NUEVO;
}
