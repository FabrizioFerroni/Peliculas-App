import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.scss',
})
export default class EditarCineComponent {
  @Input()
  id: string = '';
}
