import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';
import { Rutas } from '@app/shared/utils/rutas';
import { ActoresGetDto } from '../dto/actores.dto';
import { ActoresService } from '../service/actores.service';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { ListadoGenericosComponent } from '@app/shared/components/listado-genericos/listado-genericos.component';
import { PaginadoComponent } from '@app/shared/components/paginado/paginado.component';
import { CommonModule } from '@angular/common';
import { ViewsEntitiesComponent } from '../../../shared/components/views-entities/views-entities.component';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { IColumns } from '@app/shared/types/columnsVisibles.interface';

@Component({
  selector: 'app-indice-actores',
  standalone: true,
  imports: [CommonModule, ViewsEntitiesComponent],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.scss',
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: ActoresService,
    },
  ],
})
export default class IndiceActoresComponent implements OnInit {
  readonly newActorRoute = Rutas.ACTOR_NUEVO;
  readonly editActorRoute = Rutas.ACTOR_EDITAR;
  private readonly utilsService = inject(UtilsService);

  columnasAMostrar: IColumns[] = [
    { nombre: 'Foto', propiedad: 'foto' },
    {
      nombre: 'Fecha de Nacimiento',
      propiedad: 'fechaNacimiento',
      pipe: 'date',
    },
    { nombre: 'Nombre', propiedad: 'nombre' },
  ];
  ngOnInit(): void {
    this.utilsService.setTitle('Actores');
  }
}
