import { Component, inject, Input, OnInit } from '@angular/core';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GenerosService } from '../service/generos.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { Rutas } from '@app/shared/utils/rutas';
import { EditEntitiesComponent } from '@app/shared/components/edit-entities/edit-entities.component';

@Component({
  selector: 'app-editar-genero',
  standalone: true,
  imports: [EditEntitiesComponent],
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: GenerosService,
    },
  ],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.scss',
})
export default class EditarGeneroComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  @Input()
  id: string = '';

  readonly routeGeneros: string = Rutas.GENEROS;

  formularioGeneros = FormularioGeneroComponent;

  ngOnInit(): void {
    this.utilsService.setTitle('Editar Género');
  }
}
