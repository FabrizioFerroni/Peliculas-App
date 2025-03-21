import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GeneroPostDto } from '../dto/generos.dto';
import { GenerosService } from '../service/generos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extraerErrores } from '@app/shared/functions/extraerErrores';
import { MostrarErroresComponent } from '@app/shared/components/mostrar-errores/mostrar-errores.component';
import { NotificationUtils } from '@app/shared/utils/show-toast';
import { ToastType } from 'ng-angular-popup';
import { UtilsService } from '@app/shared/services/utils.service';
import { CreateEntitiesComponent } from '../../../shared/components/create-entities/create-entities.component';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [CreateEntitiesComponent],
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: GenerosService,
    },
  ],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.scss',
})
export default class CrearGenerosComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  readonly routeGeneros: string = Rutas.GENEROS;

  formularioGeneros = FormularioGeneroComponent;
  ngOnInit() {
    this.utilsService.setTitle('Crear Género');
  }
}
