import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.scss',
})
export default class EditarActorComponent {
  @Input()
  id: string = '';
}
