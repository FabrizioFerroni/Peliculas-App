import { Component, inject } from '@angular/core';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { Router } from '@angular/router';
import { ActoresPostDto } from '../dto/actores.dto';

@Component({
  selector: 'app-crear-actor',
  standalone: true,
  imports: [FormularioActoresComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.scss',
})
export default class CrearActorComponent {
  private router: Router = inject(Router);

  guardarCambios(actor: ActoresPostDto): void {
    // Realizar las acciones de guardado y redireccionar al listado de generos
    console.log(actor);
    //this.router.navigate([`/${Rutas.GENEROS}`]);
  }
}
