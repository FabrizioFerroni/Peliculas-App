import { Component, inject, OnInit } from '@angular/core';
import {
  PeliculaGetDto,
  PeliculaGetPostDto,
  PeliculaPostDto,
} from '../dto/pelicula.dto';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { ISelectorMultiple } from '@app/shared/components/selector-multiple/interfaces/selector-multiple.dto';
import { ActorAutoCompleteDTO } from '@app/features/actores/dto/actores.dto';
import { UtilsService } from '@app/shared/services/utils.service';
import { PeliculasService } from '../service/peliculas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Rutas } from '@app/shared/utils/rutas';
import { Router } from '@angular/router';
import { extraerErrores } from '@app/shared/functions/extraerErrores';
import { MostrarErroresComponent } from '../../../shared/components/mostrar-errores/mostrar-errores.component';
import { CargandoComponent } from '../../../shared/components/cargando/cargando.component';
import { NotificationUtils } from '@app/shared/utils/show-toast';
import { ToastType } from 'ng-angular-popup';

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [
    FormularioPeliculasComponent,
    MostrarErroresComponent,
    CargandoComponent,
  ],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.scss',
})
export default class CrearPeliculaComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  generosSeleccionados: ISelectorMultiple[] = [];
  generosNoSeleccionados: ISelectorMultiple[] = [];
  cinesSeleccionados: ISelectorMultiple[] = [];
  cinesNoSeleccionados: ISelectorMultiple[] = [];
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];
  peliculasService: PeliculasService = inject(PeliculasService);
  private router: Router = inject(Router);
  private readonly notif = inject(NotificationUtils);
  errores: string[] = [];

  constructor() {
    this.peliculasService.obtenerGenerosCines().subscribe({
      next: ({ generos, cines }: PeliculaGetPostDto) => {
        this.generosNoSeleccionados = generos.map(({ id, nombre: valor }) => {
          return <ISelectorMultiple>{
            id,
            valor,
          };
        });

        this.cinesNoSeleccionados = cines.map(({ id, nombre: valor }) => {
          return <ISelectorMultiple>{
            id,
            valor,
          };
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error(`${err.message}`);
      },
    });
  }

  ngOnInit() {
    this.utilsService.setTitle('Crear Pelicula');
  }

  guardarCambios(pelicula: PeliculaPostDto): void {
    // Realizar las acciones de guardado y redireccionar al listado de generos
    this.peliculasService.crear(pelicula).subscribe({
      next: (res: PeliculaGetDto) => {
        this.notif.toastMsg(
          ToastType.SUCCESS,
          `Pelicula creada con éxito`,
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
    //this.router.navigate([`/${Rutas.GENEROS}`]);
  }
}
