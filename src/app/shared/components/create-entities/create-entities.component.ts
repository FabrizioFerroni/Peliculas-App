import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  inject,
  Input,
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-entities',
  standalone: true,
  imports: [MostrarErroresComponent, CommonModule],
  templateUrl: './create-entities.component.html',
  styleUrl: './create-entities.component.scss',
})
export class CreateEntitiesComponent<TDTO, TPDTO> implements AfterViewInit {
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

  ngAfterViewInit(): void {
    this.componentRef = this.contentForm.createComponent(this.form);
    this.componentRef.instance.posteoFormulario.subscribe((dto: TPDTO) =>
      this.guardarCambios(dto)
    );
  }

  guardarCambios(dto: TPDTO): void {
    this.servicioCRUD.crear(dto).subscribe({
      next: () => {
        this.notif.toastMsg(
          ToastType.SUCCESS,
          `${this.titleSing} creado con éxito`,
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
