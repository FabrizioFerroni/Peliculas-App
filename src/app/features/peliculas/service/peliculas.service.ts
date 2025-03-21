import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/shared/services/base-http.service';
import { Observable } from 'rxjs';
import {
  LandingPageDto,
  PeliculaDetalleDto,
  PeliculaGetDto,
  PeliculaGetPostDto,
  PeliculaGetPutDto,
  PeliculaPostDto,
} from '../dto/pelicula.dto';
import { construirQueryParams } from '@app/shared/functions/construirQueryParams';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { IFiltroPelicula } from '../filtro-peliculas/interface/filtro-pelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService extends BaseHttpService {
  url: string = '';
  constructor() {
    super();
    this.url = `${this.apiUrl}/peliculas`;
  }

  obtenerGenerosCines(): Observable<PeliculaGetPostDto> {
    return this.http.get<PeliculaGetPostDto>(`${this.url}/nuevo/cine-generos`);
  }

  obtenerFiltrados(
    filtros: IFiltroPelicula
  ): Observable<HttpResponse<Pageable<PeliculaGetDto[]>>> {
    let params = new HttpParams({
      fromObject: Object.entries(filtros)
        .filter(([_, v]) => v !== undefined && v !== null)
        .reduce((acc, [key, value]) => {
          acc[key] = value!.toString();
          return acc;
        }, {} as { [param: string]: string }),
    });

    return this.http.get<Pageable<PeliculaGetDto[]>>(`${this.url}/filtrar`, {
      params,
      observe: 'response',
    });
  }

  obtenerLandindg(): Observable<LandingPageDto> {
    return this.http.get<LandingPageDto>(`${this.url}/landing`);
  }

  obtenerPorSlug(slug: string): Observable<PeliculaDetalleDto> {
    return this.http.get<PeliculaDetalleDto>(`${this.url}/${slug}`);
  }

  crear(data: PeliculaPostDto): Observable<PeliculaGetDto> {
    const body = this.construirFormData(data);
    return this.http.post<PeliculaGetDto>(this.url, body);
  }

  obtenerPorId(id: string): Observable<PeliculaGetPutDto> {
    return this.http.get<PeliculaGetPutDto>(`${this.url}/p/${id}`);
  }

  actualizar(id: string, data: PeliculaPostDto): Observable<void> {
    const body = this.construirFormData(data);
    return this.http.put<void>(`${this.url}/${id}`, body);
  }

  borrar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  private construirFormData(data: PeliculaPostDto): FormData {
    const formData = new FormData();

    formData.append('titulo', data.titulo);
    formData.append('descripcion', data.descripcion);
    formData.append(
      'fechaLanzamiento',
      data.fechaLanzamiento.toISOString().split('T')[0]
    );

    if (data.poster) {
      formData.append('poster', data.poster);
    }

    formData.append('duracion', data.duracion.toString());
    formData.append('enCines', data.enCines.toString());
    formData.append('proximosEstrenos', data.proximosEstrenos.toString());

    if (data.trailer) {
      formData.append('trailer', data.trailer);
    }

    formData.append('anioLanzamiento', data.anioLanzamiento);
    formData.append('generosIds', JSON.stringify(data.generosIds));
    formData.append('cinesIds', JSON.stringify(data.cinesIds));
    formData.append('actores', JSON.stringify(data.actores));
    formData.append('director', data.director);

    return formData;
  }
}
