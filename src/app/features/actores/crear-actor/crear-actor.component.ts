import { Component, inject, OnInit } from '@angular/core';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { ActoresService } from '../service/actores.service';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { CreateEntitiesComponent } from '../../../shared/components/create-entities/create-entities.component';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-crear-actor',
  standalone: true,
  imports: [CreateEntitiesComponent],
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: ActoresService,
    },
  ],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.scss',
})
export default class CrearActorComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  routeActores: string = Rutas.ACTORES;
  formularioActores = FormularioActoresComponent;
  ngOnInit(): void {
    this.utilsService.setTitle('Crear Actor');
  }
}
