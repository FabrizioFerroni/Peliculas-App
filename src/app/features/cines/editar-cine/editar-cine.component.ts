import { Component, Input } from '@angular/core';
import { CineGetDto, CinePostDto } from '../dto/cines.dto';
import { FormularioCinesComponent } from '../formulario-cines/formulario-cines.component';

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.scss',
})
export default class EditarCineComponent {
  @Input()
  id: string = '';

  cine: CineGetDto = {
    id: this.id,
    nombre: 'Sudcinemas VM',
    latitud: 40.67412869719397,
    longitud: -73.74508380889894,
  };

  guardarCambios(cine: CinePostDto) {
    console.log(cine);
  }
}
