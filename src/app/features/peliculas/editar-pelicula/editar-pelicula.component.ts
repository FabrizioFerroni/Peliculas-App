import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.scss',
})
export default class EditarPeliculaComponent {
  @Input()
  id: string = '';
}
