import { Component, inject, Input, OnInit } from '@angular/core';
import { PeliculasService } from '../service/peliculas.service';
import { PeliculaDetalleDto } from '../dto/pelicula.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '@app/shared/services/utils.service';
import { CargandoComponent } from '../../../shared/components/cargando/cargando.component';
import { ChipsPersonalizadosComponent } from '../../../shared/components/chips-personalizados/chips-personalizados.component';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ICoordenadas } from '@app/shared/components/mapa/interfaces/coordenada';
import { MapaComponent } from '../../../shared/components/mapa/mapa.component';
import { MinuteToHourPipe } from '@app/shared/pipes/minute-to-hour.pipe';

@Component({
  selector: 'app-pelicula-detalle',
  standalone: true,
  imports: [
    CargandoComponent,
    ChipsPersonalizadosComponent,
    DatePipe,
    MapaComponent,
    MinuteToHourPipe,
  ],
  templateUrl: './pelicula-detalle.component.html',
  styleUrl: './pelicula-detalle.component.scss',
})
export default class PeliculaDetalleComponent implements OnInit {
  @Input()
  slug: string = '';

  trailerUrl: SafeResourceUrl = '';

  pelicula: PeliculaDetalleDto | null = null;

  coordenadas: ICoordenadas[] = [];

  peliculaService = inject(PeliculasService);
  private readonly utilsService = inject(UtilsService);
  private readonly sanitizer = inject(DomSanitizer);
  ngOnInit(): void {
    this.peliculaService.obtenerPorSlug(this.slug).subscribe({
      next: (pelicula: PeliculaDetalleDto) => {
        console.log(pelicula.generos[0].slug);
        this.pelicula = pelicula;
        this.utilsService.setTitle(pelicula.titulo ? pelicula.titulo : '');
        this.trailerUrl = this.generateUrlYTEmbed(pelicula.trailer);
        this.coordenadas = pelicula.cines.map((cine) => {
          return {
            latitud: cine.latitud,
            longitud: cine.longitud,
            texto: cine.nombre,
          };
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  generateUrlYTEmbed(url: string): SafeResourceUrl | string {
    if (!url) return '';

    let videoId = url.split('v=')[1];
    const positionAmp = videoId.indexOf('&');
    if (positionAmp !== -1) videoId = videoId.substring(0, positionAmp);

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
}
