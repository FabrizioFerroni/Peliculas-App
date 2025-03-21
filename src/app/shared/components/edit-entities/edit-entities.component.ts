import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ComponentRef,
  inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { extraerErrores } from '@app/shared/functions/extraerErrores';
import { IServicioCrud } from '@app/shared/interfaces/IServicioCrud';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { NotificationUtils } from '@app/shared/utils/show-toast';
import { ToastType } from 'ng-angular-popup';
import { MostrarErroresComponent } from '../mostrar-errores/mostrar-errores.component';
import { CargandoComponent } from '../cargando/cargando.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-entities',
  standalone: true,
  imports: [MostrarErroresComponent, CargandoComponent, CommonModule],
  templateUrl: './edit-entities.component.html',
  styleUrl: './edit-entities.component.scss',
})
export class EditEntitiesComponent<TDTO, TPDTO> implements OnInit {
  @Input({ required: true })
  id: string = '';

  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  titleSing: string = '';

  @Input({ required: true })
  routeIndice: string = '';

  @Input({ required: true })
  form: any; //TODO: VER TIPADO

  errores: string[] = [];

  private readonly servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCrud<
    TDTO,
    TPDTO
  >;
  private router: Router = inject(Router);
  private readonly notif = inject(NotificationUtils);

  @ViewChild('contentForm', { read: ViewContainerRef })
  contentForm: ViewContainerRef = inject(ViewContainerRef);

  private componentRef!: ComponentRef<any>;

  loading: boolean = false;

  ngOnInit(): void {
    this.servicioCRUD.obtener(this.id).subscribe({
      next: (res: TDTO) => {
        this.cargarComponent(res);
      },
      error: (error) =>
        console.error(`Error al obtener ${this.titleSing}`, error),
    });
  }

  cargarComponent(dto: TDTO) {
    if (this.contentForm) {
      this.componentRef = this.contentForm.createComponent(this.form);
      this.componentRef.instance.dto = dto;
      this.componentRef.instance.posteoFormulario.subscribe((dto: TPDTO) =>
        this.guardarCambios(dto)
      );

      this.loading = false;
    }
  }

  guardarCambios(dto: TPDTO): void {
    this.servicioCRUD.editar(this.id, dto).subscribe({
      next: () => {
        this.notif.toastMsg(
          ToastType.SUCCESS,
          `${this.titleSing} actualizado con éxito`,
          'Éxito!',
          5000
        );
        this.router.navigate([`/${this.routeIndice}`]);
      },
      error: (error: HttpErrorResponse) => {
        const errores = extraerErrores(error);
        this.errores = errores;
      },
    });
  }
}
