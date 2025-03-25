import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnInit {
  ngOnInit(): void {
    this.ratingAnterior = this.ratingSeleccionado;
  }

  @Input({ required: true, transform: (valor: number) => Array(valor).fill(0) })
  maximoRating: number[] = [0];
  @Input() ratingSeleccionado: number = 0;
  ratingAnterior: number = 0;
  @Output() ratingCambiado = new EventEmitter<number>();

  manejarMouseEnter(index: number): void {
    this.ratingSeleccionado = index + 1;
  }

  manejarMouseLeave(): void {
    if (this.ratingAnterior !== 0) {
      this.ratingSeleccionado = this.ratingAnterior;
    } else {
      this.ratingSeleccionado = 0;
    }
  }

  manejarClick(index: number): void {
    this.ratingSeleccionado = index + 1;
    this.ratingAnterior = this.ratingSeleccionado;
    this.ratingCambiado.emit(this.ratingSeleccionado);
  }
}
