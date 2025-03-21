import { Component, inject, OnInit } from '@angular/core';
import { Rutas } from '@app/shared/utils/rutas';
import { GenerosService } from '../service/generos.service';
import { CommonModule } from '@angular/common';
import { UtilsService } from '@app/shared/services/utils.service';
import { ViewsEntitiesComponent } from '../../../shared/components/views-entities/views-entities.component';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { IColumns } from '@app/shared/types/columnsVisibles.interface';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [CommonModule, ViewsEntitiesComponent],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.scss',
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: GenerosService,
    },
  ],
})
export default class IndiceGenerosComponent implements OnInit {
  readonly newGeneroRoute = Rutas.GENERO_NUEVO;
  private readonly utilsService = inject(UtilsService);
  columnasAMostrar: IColumns[] = [{ nombre: 'Nombre', propiedad: 'nombre' }];

  ngOnInit(): void {
    this.utilsService.setTitle('Géneros');
  }
}
