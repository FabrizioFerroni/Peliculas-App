import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ListadoGenericosComponent } from '@app/shared/components/listado-genericos/listado-genericos.component';
import { PeliculaGetDto } from '../dto/pelicula.dto';
import { Rutas } from '@app/shared/utils/rutas';
import { RouterLink } from '@angular/router';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { PeliculasService } from '../service/peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  standalone: true,
  imports: [ListadoGenericosComponent, RouterLink],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.scss',
})
export class ListadoPeliculasComponent implements OnInit {
  @Input({ required: true })
  peliculas!: PeliculaGetDto[];
  rutaSplit: string[] = Rutas.PELICULA_EDITAR.split('/:');
  editRoute: string = this.rutaSplit[0];
  rutaSplit2: string[] = Rutas.PELICULA_VER_SLUG.split('/:');
  detalleRoute: string = this.rutaSplit2[0];
  peliculaService: PeliculasService = inject(PeliculasService);
  @Output()
  borrado = new EventEmitter<void>();

  ngOnInit(): void {}

  eliminar(id: string): void {
    swal
      .fire({
        title: '¿Estas seguro que quieres eliminar esto?',
        text: 'No podras restaurarlo despues de la eliminación',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5c62ec',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borralo!',
        cancelButtonText: 'Cancelar',
        customClass: {
          cancelButton: 'outnone',
          confirmButton: 'outnone',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.peliculaService.borrar(id).subscribe({
            next: () => {
              swal.fire({
                title: 'Eliminado!',
                text: `Pelicula eliminada con éxito!`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#5c62ec',
                customClass: {
                  confirmButton: 'outnone',
                },
              });
              this.borrado.emit();
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error:', error);
              swal.fire({
                title: 'Hubo un error!',
                text: error.error.mensaje,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#5c62ec',
                customClass: {
                  confirmButton: 'outnone',
                },
              });
            },
          });
        }
      });
  }

  remover(pelicula: PeliculaGetDto) {
    const indice = this.peliculas.findIndex(
      (peliculaActual: PeliculaGetDto) =>
        peliculaActual.titulo === pelicula.titulo
    );
    this.peliculas.splice(indice, 1);
  }
}
