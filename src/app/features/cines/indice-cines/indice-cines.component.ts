import { Component, inject, OnInit } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { UtilsService } from '@app/shared/services/utils.service';
import { Rutas } from '@app/shared/utils/rutas';
import { CineService } from '../service/cine.service';
import { ViewsEntitiesComponent } from '../../../shared/components/views-entities/views-entities.component';
import { IColumns } from '@app/shared/types/columnsVisibles.interface';

@Component({
  selector: 'app-indice-cines',
  standalone: true,
  imports: [ViewsEntitiesComponent],
  templateUrl: './indice-cines.component.html',
  styleUrl: './indice-cines.component.scss',
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: CineService,
    },
  ],
})
export default class IndiceCinesComponent implements OnInit {
  readonly newCineRoute = Rutas.CINE_NUEVO;
  private readonly utilsService = inject(UtilsService);
  columnasAMostrar: IColumns[] = [
    { nombre: 'Nombre', propiedad: 'nombre' },
    { nombre: 'Ubicación', propiedad: 'ubicacion' },
  ];

  ngOnInit(): void {
    this.utilsService.setTitle('Cines');
  }
}
