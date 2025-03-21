import { Injectable } from '@angular/core';
import { IServicioCrud } from '@app/shared/interfaces/IServicioCrud';
import { BaseHttpService } from '@app/shared/services/base-http.service';
import { CineGetDto, CinePostDto } from '../dto/cines.dto';
import { HttpResponse } from '@angular/common/http';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { PaginacionDto } from '@app/shared/components/modelos/paginacion.dtos';
import { Observable } from 'rxjs';
import { construirQueryParams } from '@app/shared/functions/construirQueryParams';

@Injectable({
  providedIn: 'root',
})
export class CineService
  extends BaseHttpService
  implements IServicioCrud<CineGetDto, CinePostDto>
{
  url: string = '';
  constructor() {
    super();
    this.url = `${this.apiUrl}/cines`;
  }
  obtenerTodos(
    paginado: PaginacionDto
  ): Observable<HttpResponse<Pageable<CineGetDto[]>>> {
    let params = construirQueryParams(paginado);
    return this.http.get<Pageable<CineGetDto[]>>(`${this.url}`, {
      params,
      observe: 'response',
    });
  }
  obtener(id: string): Observable<CineGetDto> {
    return this.http.get<CineGetDto>(`${this.url}/${id}`);
  }
  crear(body: CinePostDto): Observable<CineGetDto> {
    return this.http.post<CineGetDto>(`${this.url}`, body);
  }
  editar(id: string, body: CinePostDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, body);
  }
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
