import { Component, inject, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from '../peliculas/listado-peliculas/listado-peliculas.component';
import { IPelicula } from '@app/shared/types/peliculas.interface';
import { UtilsService } from '@app/shared/services/utils.service';
import { PeliculasService } from '../peliculas/service/peliculas.service';
import { LandingPageDto, PeliculaGetDto } from '../peliculas/dto/pelicula.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListadoPeliculasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnInit {
  rankingVoted: number = 0;
  private readonly utilsService = inject(UtilsService);
  peliculaService = inject(PeliculasService);
  ngOnInit(): void {
    this.utilsService.setTitle('');
    this.obtenerLanding();
  }

  peliculasEnCines!: PeliculaGetDto[];
  peliculasProximosEstrenos!: PeliculaGetDto[];
  cargando = true;

  peliculaBorradas() {
    this.obtenerLanding();
  }

  obtenerLanding() {
    this.peliculaService.obtenerLandindg().subscribe({
      next: ({ enCines, proximosEstrenos }: LandingPageDto) => {
        this.peliculasEnCines = enCines;
        this.peliculasProximosEstrenos = proximosEstrenos;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.cargando = false;
      },
    });
  }

  procesarVoto(voto: number): void {
    this.rankingVoted = voto;
  }
}
