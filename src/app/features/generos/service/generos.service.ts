import { Injectable } from '@angular/core';
import { GeneroGetDto, GeneroPostDto } from '../dto/generos.dto';
import { BaseHttpService } from '@app/shared/services/base-http.service';
import { Observable } from 'rxjs';
import { PaginacionDto } from '@app/shared/components/modelos/paginacion.dtos';
import { construirQueryParams } from '@app/shared/functions/construirQueryParams';
import { HttpResponse } from '@angular/common/http';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { IServicioCrud } from '@app/shared/interfaces/IServicioCrud';

@Injectable()
export class GenerosService
  extends BaseHttpService
  implements IServicioCrud<GeneroGetDto, GeneroPostDto>
{
  obtenerTodos(
    paginado: PaginacionDto
  ): Observable<HttpResponse<Pageable<GeneroGetDto[]>>> {
    let params = construirQueryParams(paginado);
    return this.http.get<Pageable<GeneroGetDto[]>>(`${this.apiUrl}/generos`, {
      params,
      observe: 'response',
    });
  }

  obtener(id: string): Observable<GeneroGetDto> {
    return this.http.get<GeneroGetDto>(`${this.apiUrl}/generos/${id}`);
  }

  obtenerTodosSP(): Observable<GeneroGetDto[]> {
    return this.http.get<GeneroGetDto[]>(`${this.apiUrl}/generos/todos`);
  }

  crear(genero: GeneroPostDto): Observable<GeneroGetDto> {
    return this.http.post<GeneroGetDto>(`${this.apiUrl}/generos`, genero);
  }

  editar(id: string, genero: GeneroPostDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/generos/${id}`, genero);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/generos/${id}`);
  }
}
