import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [],
  templateUrl: './cargando.component.html',
  styleUrl: './cargando.component.scss',
})
export class CargandoComponent {
  @Input() width: number = 100;
  @Input() height: number = 100;
}
