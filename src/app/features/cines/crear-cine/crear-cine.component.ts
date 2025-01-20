import { Component } from '@angular/core';
import { FormularioCinesComponent } from '../formulario-cines/formulario-cines.component';
import { CinePostDto } from '../dto/cines.dto';

@Component({
  selector: 'app-crear-cine',
  standalone: true,
  imports: [FormularioCinesComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.scss',
})
export default class CrearCineComponent {
  guardarCambios(cine: CinePostDto) {
    console.log(cine);
  }
}
