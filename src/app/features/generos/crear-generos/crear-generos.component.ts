import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.scss',
})
export default class CrearGenerosComponent {
  router: Router = inject(Router);

  guardarCambios(): void {
    // Realizar las acciones de guardado y redireccionar al listado de generos
    this.router.navigate([`/${Rutas.GENEROS}`]);
  }
}
