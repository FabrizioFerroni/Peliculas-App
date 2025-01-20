import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActorAutoCompleteDTO } from '../dto/actores.dto';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-autocomplete-actores',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.scss',
})
export class AutocompleteActoresComponent {
  control = new FormControl();
  actores: ActorAutoCompleteDTO[] = [
    {
      id: '1',
      nombre: 'Actor 1',
      personaje: '',
      foto: 'https://images.unsplash.com/photo-1468857006728-bba1dba0eb7f?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      nombre: 'Actor 2',
      personaje: '',
      foto: 'https://images.unsplash.com/photo-1468857006728-bba1dba0eb7f?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3',
      nombre: 'Actor 3',
      personaje: '',
      foto: 'https://images.unsplash.com/photo-1468857006728-bba1dba0eb7f?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  filteredActors = this.actores;
  selectedActor: ActorAutoCompleteDTO | null = null;

  showDropdown = false;

  @Input({ required: true })
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  // test

  onInputChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredActors = this.actores.filter((actor) =>
      actor.nombre.toLowerCase().includes(input)
    );
  }

  actorSeleccionado(actor: ActorAutoCompleteDTO): void {
    if (!this.actoresSeleccionados.includes(actor)) {
      this.actoresSeleccionados.push(actor);
    }
    this.showDropdown = false;
  }

  eliminar(id: string): void {
    const removed = this.actoresSeleccionados.findIndex(
      (a: ActorAutoCompleteDTO) => a.id === id
    );
    this.actoresSeleccionados.splice(removed, 1);
  }

  hideDropdown(): void {
    setTimeout(() => (this.showDropdown = false), 200);
  }

  finalizarArrastre(event: CdkDragDrop<ActorAutoCompleteDTO[]>): void {
    const previousIndex = this.actoresSeleccionados.findIndex(
      (a) => a === event.item.data
    );
    const [removed] = this.actoresSeleccionados.splice(previousIndex, 1);
    this.actoresSeleccionados.splice(event.currentIndex, 0, removed);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
