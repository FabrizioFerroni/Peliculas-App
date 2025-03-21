import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActorAutoCompleteDTO } from '../dto/actores.dto';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ActoresService } from '../service/actores.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-autocomplete-actores',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.scss',
})
export class AutocompleteActoresComponent implements OnInit {
  actoresService: ActoresService = inject(ActoresService);
  control = new FormControl();
  actores: ActorAutoCompleteDTO[] = [];

  filteredActors = this.actores;
  selectedActor: ActorAutoCompleteDTO | null = null;

  showDropdown = false;

  @Input({ required: true })
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      if (typeof value === 'string' && value) {
        this.actoresService.obtenerPorNombre(value).subscribe({
          next: (res: ActorAutoCompleteDTO[]) => {
            this.actores = res;
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
          },
        });
      }
    });
  }

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
