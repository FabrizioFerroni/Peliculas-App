import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-genero',
  standalone: true,
  imports: [],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.scss',
})
export default class EditarGeneroComponent implements OnInit {
  @Input()
  id: string = '';

  ngOnInit(): void {}
}
