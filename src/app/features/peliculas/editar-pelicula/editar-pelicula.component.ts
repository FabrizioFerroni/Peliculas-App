import { Component, Input } from '@angular/core';
import { ActorAutoCompleteDTO } from '@app/features/actores/dto/actores.dto';
import { ISelectorMultiple } from '@app/shared/components/selector-multiple/interfaces/selector-multiple.dto';
import { PeliculaGetDto, PeliculaPostDto } from '../dto/pelicula.dto';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.scss',
})
export default class EditarPeliculaComponent {
  @Input()
  id: string = '';

  pelicula: PeliculaGetDto = {
    id: '1',
    titulo: 'Spider-Man',
    trailer: 'ABC',
    fechaLanzamiento: new Date('2018-07-25'),
    poster:
      'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832',
    descripcion:
      'Lorem ipsum dolor sit amet consectetur adip sequ consequ ante et dolore magna aliqu',
    duracion: 0,
    anio: '2008',
    enCines: true,
    proximosEstrenos: false,
    director: 'James Cameron',
  };

  generosSeleccionados: ISelectorMultiple[] = [{ id: '2', valor: 'Acción' }];

  generosNoSeleccionados: ISelectorMultiple[] = [
    { id: '1', valor: 'Drama' },
    { id: '3', valor: 'Comedia' },
  ];

  cinesSeleccionados: ISelectorMultiple[] = [{ id: '2', valor: 'Blue Mall' }];

  cinesNoSeleccionados: ISelectorMultiple[] = [
    { id: '1', valor: 'Agora Mall' },
    { id: '3', valor: 'Acropolis' },
  ];

  actoresSeleccionados: ActorAutoCompleteDTO[] = [
    {
      id: '2',
      nombre: 'Tom Hanks',
      personaje: 'Forrest Gump',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/220px-Tom_Hanks_TIFF_2019.jpg',
    },
  ];

  guardarCambios(pelicula: PeliculaPostDto) {
    console.log('editando película', pelicula);
  }
}
