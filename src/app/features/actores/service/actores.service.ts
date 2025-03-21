import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/shared/services/base-http.service';
import {
  ActorAutoCompleteDTO,
  ActoresGetDto,
  ActoresPostDto,
} from '../dto/actores.dto';
import { Observable } from 'rxjs';
import { PaginacionDto } from '@app/shared/components/modelos/paginacion.dtos';
import { construirQueryParams } from '@app/shared/functions/construirQueryParams';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { HttpResponse } from '@angular/common/http';
import { IServicioCrud } from '@app/shared/interfaces/IServicioCrud';

@Injectable({
  providedIn: 'root',
})
export class ActoresService
  extends BaseHttpService
  implements IServicioCrud<ActoresGetDto, ActoresPostDto>
{
  url: string = '';
  constructor() {
    super();
    this.url = `${this.apiUrl}/actores`;
  }

  obtenerTodos(
    paginado: PaginacionDto
  ): Observable<HttpResponse<Pageable<ActoresGetDto[]>>> {
    let params = construirQueryParams(paginado);
    return this.http.get<Pageable<ActoresGetDto[]>>(`${this.url}`, {
      params,
      observe: 'response',
    });
  }

  obtener(id: string): Observable<ActoresGetDto> {
    return this.http.get<ActoresGetDto>(`${this.url}/${id}`);
  }

  obtenerPorNombre(nombre: string): Observable<ActorAutoCompleteDTO[]> {
    return this.http.get<ActorAutoCompleteDTO[]>(`${this.url}/n/${nombre}`);
  }

  crear(actor: ActoresPostDto): Observable<ActoresPostDto> {
    const body: FormData = this.construirFormData(actor);
    return this.http.post<ActoresPostDto>(`${this.url}`, body);
  }

  private construirFormData(actor: ActoresPostDto): FormData {
    const formData = new FormData();

    formData.append('nombre', actor.nombre);
    formData.append(
      'fechaNacimiento',
      actor.fechaNacimiento.toISOString().split('T')[0]
    );
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }

    return formData;
  }

  editar(id: string, actor: ActoresPostDto): Observable<void> {
    const body: FormData = this.construirFormData(actor);
    return this.http.put<void>(`${this.url}/${id}`, body);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
