import { Component, Input } from '@angular/core';
import { ISelectorMultiple } from './interfaces/selector-multiple.dto';

@Component({
  selector: 'app-selector-multiple',
  standalone: true,
  imports: [],
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.scss',
})
export class SelectorMultipleComponent {
  @Input({ required: true })
  seleccionados: ISelectorMultiple[] = [];

  @Input({ required: true })
  noSeleccionados: ISelectorMultiple[] = [];

  seleccionar(elemento: ISelectorMultiple, indice: number) {
    this.seleccionados.push(elemento);
    this.noSeleccionados.splice(indice, 1);
  }

  deseleccionar(elemento: ISelectorMultiple, indice: number) {
    this.noSeleccionados.push(elemento);
    this.seleccionados.splice(indice, 1);
  }

  seleccionarTodos() {
    this.seleccionados.push(...this.noSeleccionados);
    this.noSeleccionados.length = 0;
  }

  deseleccionarTodos() {
    this.noSeleccionados.push(...this.seleccionados);
    this.seleccionados.length = 0;
  }
}
