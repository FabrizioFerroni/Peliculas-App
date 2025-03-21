import { Component, inject, Input, OnInit } from '@angular/core';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { ActoresGetDto, ActoresPostDto } from '../dto/actores.dto';
import { UtilsService } from '@app/shared/services/utils.service';
import { ActoresService } from '../service/actores.service';
import { Router } from '@angular/router';
import { ToastType } from 'ng-angular-popup';
import { Rutas } from '@app/shared/utils/rutas';
import { NotificationUtils } from '@app/shared/utils/show-toast';
import { extraerErrores } from '@app/shared/functions/extraerErrores';
import { HttpErrorResponse } from '@angular/common/http';
import { MostrarErroresComponent } from '@app/shared/components/mostrar-errores/mostrar-errores.component';
import { CargandoComponent } from '@app/shared/components/cargando/cargando.component';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { EditEntitiesComponent } from '@app/shared/components/edit-entities/edit-entities.component';

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [EditEntitiesComponent],
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: ActoresService,
    },
  ],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.scss',
})
export default class EditarActorComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  routeActores: string = Rutas.ACTORES;
  formularioActores = FormularioActoresComponent;
  @Input()
  id: string = '';

  ngOnInit(): void {
    this.utilsService.setTitle('Editar Actor');
  }
}
