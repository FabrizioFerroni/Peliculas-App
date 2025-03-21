import { HttpResponse } from '@angular/common/http';
import { Pageable } from '../components/modelos/pageable.dto';
import { PaginacionDto } from '../components/modelos/paginacion.dtos';
import { Observable } from 'rxjs';

export interface IServicioCrud<TDTO, TPDTO> {
  obtenerTodos(
    paginado: PaginacionDto
  ): Observable<HttpResponse<Pageable<TDTO[]>>>;
  obtener(id: string): Observable<TDTO>;
  crear(dto: TPDTO): Observable<TPDTO>;
  editar(id: string, dto: TPDTO): Observable<void>;
  eliminar(id: string): Observable<void>;
}
