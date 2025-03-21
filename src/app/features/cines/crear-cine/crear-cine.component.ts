import { Component, inject, OnInit } from '@angular/core';
import { FormularioCinesComponent } from '../formulario-cines/formulario-cines.component';
import { CinePostDto } from '../dto/cines.dto';
import { UtilsService } from '@app/shared/services/utils.service';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { CineService } from '../service/cine.service';
import { CreateEntitiesComponent } from '../../../shared/components/create-entities/create-entities.component';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-crear-cine',
  standalone: true,
  imports: [CreateEntitiesComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.scss',
  providers: [
    {
      provide: SERVICIO_CRUD_TOKEN,
      useClass: CineService,
    },
  ],
})
export default class CrearCineComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  readonly routeCines = Rutas.CINES;

  formularioCines = FormularioCinesComponent;

  ngOnInit(): void {
    this.utilsService.setTitle('Crear Cine');
  }

  guardarCambios(cine: CinePostDto) {
    console.log(cine);
  }
}
