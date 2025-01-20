import { Component, Input } from '@angular/core';
import { ListadoGenericosComponent } from '@app/shared/components/listado-genericos/listado-genericos.component';
import { IPelicula } from '@app/shared/types/peliculas.interface';

@Component({
  selector: 'app-listado-peliculas',
  standalone: true,
  imports: [ListadoGenericosComponent],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.scss',
})
export class ListadoPeliculasComponent {
  @Input({ required: true })
  peliculas!: IPelicula[];

  remover(pelicula: IPelicula) {
    const indice = this.peliculas.findIndex(
      (peliculaActual: IPelicula) => peliculaActual.titulo === pelicula.titulo
    );
    this.peliculas.splice(indice, 1);
  }
}
