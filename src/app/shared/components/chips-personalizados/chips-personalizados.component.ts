import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GeneroGetDto } from '@app/features/generos/dto/generos.dto';

@Component({
  selector: 'app-chips-personalizados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chips-personalizados.component.html',
  styleUrl: './chips-personalizados.component.scss',
})
export class ChipsPersonalizadosComponent {
  @Input({ required: true })
  data: GeneroGetDto[] = [];

  @Input({ required: true })
  ruta: string = '';
}
