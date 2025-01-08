import { Component, Input } from '@angular/core';
import { IPelicula } from '@app/shared/types/peliculas.interface';

@Component({
  selector: 'app-listado-genericos',
  standalone: true,
  imports: [],
  templateUrl: './listado-genericos.component.html',
  styleUrl: './listado-genericos.component.scss',
})
export class ListadoGenericosComponent {
  @Input({ required: true })
  listado!: IPelicula[];
}
