import { Component, inject, Input, OnInit } from '@angular/core';
import { ActorAutoCompleteDTO } from '@app/features/actores/dto/actores.dto';
import { ISelectorMultiple } from '@app/shared/components/selector-multiple/interfaces/selector-multiple.dto';
import {
  PeliculaGetDto,
  PeliculaGetPutDto,
  PeliculaPostDto,
} from '../dto/pelicula.dto';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { PeliculasService } from '../service/peliculas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extraerErrores } from '@app/shared/functions/extraerErrores';
import { Router } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';
import { ToastType } from 'ng-angular-popup';
import { NotificationUtils } from '@app/shared/utils/show-toast';
import { CargandoComponent } from '@app/shared/components/cargando/cargando.component';
import { MostrarErroresComponent } from '@app/shared/components/mostrar-errores/mostrar-errores.component';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [
    FormularioPeliculasComponent,
    CargandoComponent,
    MostrarErroresComponent,
  ],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.scss',
})
export default class EditarPeliculaComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  peliculaService = inject(PeliculasService);
  private readonly notif = inject(NotificationUtils);
  @Input()
  id: string = '';

  peliculaDto!: PeliculaGetDto;

  generosSeleccionados: ISelectorMultiple[] = [];

  generosNoSeleccionados: ISelectorMultiple[] = [];

  cinesSeleccionados: ISelectorMultiple[] = [];

  cinesNoSeleccionados: ISelectorMultiple[] = [];

  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  private router: Router = inject(Router);
  errores: string[] = [];

  ngOnInit(): void {
    this.utilsService.setTitle('Editar Película');
    this.peliculaService.obtenerPorId(this.id).subscribe({
      next: ({
        pelicula,
        generosSeleccionados,
        generosNoSeleccionados,
        cineSeleccionados,
        cineNoSeleccionados,
        actores,
      }: PeliculaGetPutDto) => {
        this.peliculaDto = pelicula;
        this.actoresSeleccionados = actores;
        this.generosNoSeleccionados = generosNoSeleccionados.map((g) => {
          return <ISelectorMultiple>{
            id: g.id,
            valor: g.nombre,
          };
        });

        this.generosSeleccionados = generosSeleccionados.map((g) => {
          return <ISelectorMultiple>{
            id: g.id,
            valor: g.nombre,
          };
        });

        this.cinesNoSeleccionados = cineNoSeleccionados.map((c) => {
          return <ISelectorMultiple>{
            id: c.id,
            valor: c.nombre,
          };
        });
        this.cinesSeleccionados = cineSeleccionados.map((c) => {
          return <ISelectorMultiple>{
            id: c.id,
            valor: c.nombre,
          };
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  guardarCambios(pelicula: PeliculaPostDto) {
    this.peliculaService.actualizar(this.id, pelicula).subscribe({
      next: (res: void) => {
        this.notif.toastMsg(
          ToastType.SUCCESS,
          `Pelicula actualizada con éxito`,
          'Éxito!',
          5000
        );
        this.router.navigate([`/${Rutas.HOME}`]);
      },
      error: (err: HttpErrorResponse) => {
        const errores = extraerErrores(err);
        this.errores = errores;
        console.error(`${err.message}`);
      },
    });
  }
}
