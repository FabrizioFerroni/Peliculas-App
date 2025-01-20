import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Rutas } from '@app/shared/utils/rutas';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GeneroPostDto } from '../dto/generos.dto';

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [FormularioGeneroComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.scss',
})
export default class CrearGenerosComponent {
  private router: Router = inject(Router);

  guardarCambios(genero: GeneroPostDto): void {
    console.log(`Log create: ${genero}`);
    // Realizar las acciones de guardado y redireccionar al listado de generos
    //this.router.navigate([`/${Rutas.GENEROS}`]);
  }
}
