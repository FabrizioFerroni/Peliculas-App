import { Component, Input } from '@angular/core';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { ActoresGetDto, ActoresPostDto } from '../dto/actores.dto';

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [FormularioActoresComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.scss',
})
export default class EditarActorComponent {
  @Input()
  id: string = '';

  actor: ActoresGetDto = {
    id: this.id,
    nombre: 'Dwayne Johnson',
    fechaNacimiento: new Date(1972, 4, 2),
    foto: 'https://hips.hearstapps.com/hmg-prod/images/dwayne-johnson-attends-the-moana-2-uk-premiere-at-cineworld-news-photo-1732530250.jpg?resize=1200:*',
  };

  guardarCambios(actor: ActoresPostDto) {
    console.log('Se han guardado los cambios del actor', actor);
  }
}
