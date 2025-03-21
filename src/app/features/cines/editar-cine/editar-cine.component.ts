import { Component, inject, Input, OnInit } from '@angular/core';
import { CineGetDto, CinePostDto } from '../dto/cines.dto';
import { FormularioCinesComponent } from '../formulario-cines/formulario-cines.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { Rutas } from '@app/shared/utils/rutas';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { CineService } from '../service/cine.service';
import { EditEntitiesComponent } from '@app/shared/components/edit-entities/edit-entities.component';

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [EditEntitiesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.scss',
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: CineService,
    },
  ],
})
export default class EditarCineComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  readonly routeCines = Rutas.CINES;

  @Input()
  id: string = '';

  formularioCines = FormularioCinesComponent;

  ngOnInit(): void {
    this.utilsService.setTitle('Editar Cine');
  }
}
