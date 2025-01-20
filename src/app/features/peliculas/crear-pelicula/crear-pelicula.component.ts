import { Component } from '@angular/core';
import { PeliculaPostDto } from '../dto/pelicula.dto';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { ISelectorMultiple } from '@app/shared/components/selector-multiple/interfaces/selector-multiple.dto';
import { ActorAutoCompleteDTO } from '@app/features/actores/dto/actores.dto';

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.scss',
})
export default class CrearPeliculaComponent {
  generosSeleccionados: ISelectorMultiple[] = [];

  generosNoSeleccionados: ISelectorMultiple[] = [
    { id: 'ae8c3c90-51e2-4e0b-8420-7dd5627e241b', valor: 'Acción' },
    { id: '77396998-36da-4266-976e-26830d48248a', valor: 'Drama' },
    { id: '5e1980a9-bcac-4344-bf35-9a8b344aedea', valor: 'Comedia' },
    { id: 'be8fb6b4-6685-443e-a566-efd54abce753', valor: 'Aventura' },
    { id: 'd2357e30-9706-47ba-907a-c9766ed1df7c', valor: 'Terror' },
  ];

  cinesSeleccionados: ISelectorMultiple[] = [];

  cinesNoSeleccionados: ISelectorMultiple[] = [
    { id: 'ae8c3c90-51e2-4e0b-8420-7dd5627e241b', valor: 'Cinepolis' },
    { id: '77396998-36da-4266-976e-26830d48248a', valor: 'Cinemark' },
    { id: '5e1980a9-bcac-4344-bf35-9a8b344aedea', valor: 'AMC Theatres' },
    { id: 'be8fb6b4-6685-443e-a566-efd54abce753', valor: 'Regal Cinemas' },
    { id: 'd2357e30-9706-47ba-907a-c9766ed1df7c', valor: 'Alamo Drafthouse' },
  ];

  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  ngOnInit() {}

  guardarCambios(pelicula: PeliculaPostDto): void {
    // Realizar las acciones de guardado y redireccionar al listado de generos
    console.log(pelicula);
    //this.router.navigate([`/${Rutas.GENEROS}`]);
  }
}
