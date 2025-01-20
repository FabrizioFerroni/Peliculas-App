import { Component, inject, Input, OnInit } from '@angular/core';
import { GeneroGetDto, GeneroPostDto } from '../dto/generos.dto';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-genero',
  standalone: true,
  imports: [FormularioGeneroComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.scss',
})
export default class EditarGeneroComponent implements OnInit {
  @Input()
  id: string = '';

  private router: Router = inject(Router);

  genero: GeneroGetDto = {
    id: this.id,
    nombre: 'Acción',
  };

  ngOnInit(): void {
    console.log(`Genero init: ${JSON.stringify(this.genero)}`);
  }

  guardarCambios(genero: GeneroPostDto): void {
    // Realizar las acciones de guardado y redireccionar al listado de generos
    console.log(genero);
    //this.generoService.actualizarGenero(genero).subscribe(() => {
    //  this.router.navigate([`/${Rutas.GENEROS}`]);
    //}
    //this.router.navigate([`/${Rutas.GENEROS}`]);
  }
}
