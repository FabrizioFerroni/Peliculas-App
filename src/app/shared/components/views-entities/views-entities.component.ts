import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListadoGenericosComponent } from '../listado-genericos/listado-genericos.component';
import { PaginadoComponent } from '../paginado/paginado.component';
import { CommonModule } from '@angular/common';
import { SERVICIO_CRUD_TOKEN } from '@app/shared/providers/provider';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Pageable } from '../modelos/pageable.dto';
import swal from 'sweetalert2';
import { ViewsPipe } from '@app/shared/pipes/views.pipe';
import { IColumns } from '@app/shared/types/columnsVisibles.interface';
import { IServicioCrud } from '@app/shared/interfaces/IServicioCrud';

interface Entity {
  id: string;
  nombre: string;
  foto?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-views-entities',
  standalone: true,
  imports: [
    RouterLink,
    ListadoGenericosComponent,
    PaginadoComponent,
    CommonModule,
    ViewsPipe,
  ],
  templateUrl: './views-entities.component.html',
  styleUrl: './views-entities.component.scss',
})
export class ViewsEntitiesComponent<TDTO, TPDTO extends Entity>
  implements AfterViewInit
{
  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  titleSing: string = '';

  @Input({ required: true })
  newRoute: string = '';

  @Input({ required: true })
  editRoute: string = '';

  @Input({ required: true })
  columnasAMostrar: IColumns[] = [];

  data: Entity[] = [];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCrud<TDTO, TPDTO>;

  // Variables para paginado
  cantidadTotalRegistros: number = 0;
  search?: string = '';
  page: number = 1;
  size: number = 10;
  order: string = 'Nombre';
  asc: boolean = true;
  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;
  pageSizes: number[] = [1, 5, 10, 15, 25, 50];
  currentPage: number = 1;
  maxVisiblePages: number = 5;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  isLoading: boolean = true;
  tieneFoto: boolean = false;

  constructor() {
    this.obtenerTodos();
  }

  obtenerTodos(): void {
    this.servicioCRUD
      .obtenerTodos({
        pagina: this.page,
        registrosPorPagina: this.size,
        ordenar: this.order,
        ascending: this.asc,
        search: this.search,
      })
      .subscribe({
        next: ({ body }: HttpResponse<Pageable<TDTO[]>>) => {
          this.data = body?.content as TDTO[] as Entity[] | [];
          this.isFirst = body?.first!;
          this.isLast = body?.last!;
          this.totalPages = body?.totalPages as number;
          this.totalElements = body?.totalElements as number;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
        },
        complete: () => (this.isLoading = false),
      });
  }

  ngAfterViewInit() {
    this.tieneFoto = this.columnasAMostrar.some(
      (columna: IColumns) => columna.propiedad === 'foto'
    );
  }
  eliminar(id: string): void {
    swal
      .fire({
        title: '¿Estas seguro que quieres eliminar esto?',
        text: 'No podras restaurarlo despues de la eliminación',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5c62ec',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borralo!',
        cancelButtonText: 'Cancelar',
        customClass: {
          cancelButton: 'outnone',
          confirmButton: 'outnone',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.servicioCRUD.eliminar(id).subscribe({
            next: () => {
              swal.fire({
                title: 'Eliminado!',
                text: `${this.titleSing} eliminado con éxito!`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#5c62ec',
                customClass: {
                  confirmButton: 'outnone',
                },
              });
              this.obtenerTodos();
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error:', error);
              swal.fire({
                title: 'Hubo un error!',
                text: error.error.mensaje,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#5c62ec',
                customClass: {
                  confirmButton: 'outnone',
                },
              });
            },
          });
        }
      });
  }

  // paginado
  // Nueva parte de paginado y buscado
  getCurrentPageSize(): number {
    return this.size === this.totalElements ? this.totalElements : this.size;
  }

  sort(order: string = 'Nombre'): void {
    this.asc = !this.asc;
    this.order = order;
    this.obtenerTodos();
  }

  get visiblePagesBefore(): number[] {
    const currentPageIndex = this.currentPage - 1;
    const totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );

    const leftIndex = Math.max(0, currentPageIndex - this.maxVisiblePages);
    const visiblePages = totalPagesArray.slice(leftIndex, currentPageIndex);

    if (leftIndex > 0) {
      visiblePages.unshift(0);
    }

    return visiblePages;
  }

  get visiblePagesAfter(): number[] {
    const currentPageIndex = this.currentPage - 1;
    const totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );

    const rightIndex = Math.min(
      this.totalPages,
      currentPageIndex + this.maxVisiblePages
    );
    const visiblePages = totalPagesArray.slice(currentPageIndex, rightIndex);

    if (rightIndex < this.totalPages) {
      visiblePages.push(0);
    }

    return visiblePages;
  }

  First() {
    if (!this.isFirst) {
      this.currentPage = 1;
      this.page = 1;
      this.updatePageStatus();
      this.obtenerTodos();
    }
  }

  Last() {
    if (!this.isLast) {
      this.currentPage = this.totalPages;
      const totalPages = Math.ceil(this.totalElements / this.size);
      this.page = totalPages;

      this.obtenerTodos();
    }
  }

  rewind() {
    if (this.currentPage > 1 && !this.isFirst) {
      this.currentPage--;
      this.page--;
      this.updatePageStatus();

      this.obtenerTodos();
    }
  }

  forward() {
    if (this.currentPage < this.totalPages && !this.isLast) {
      this.currentPage++;
      this.page++;
      this.updatePageStatus();

      this.obtenerTodos();
    }
  }

  private updatePageStatus() {
    this.isFirstPage = this.currentPage === 1;
    this.isLastPage = this.currentPage === this.totalPages;
  }

  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.page = pageNumber;
      this.updatePageStatus();

      this.obtenerTodos();
    }
  }

  changeSize(event: Event): void {
    const size = (event.target as HTMLInputElement).value;

    this.currentPage = 1;
    this.size = size === 'total' ? this.totalElements : parseInt(size);

    this.isLoading = true;
    this.setPage(1);

    this.obtenerTodos();
  }

  handleSearch(): void {
    this.page = 1;
    this.search = '';

    this.obtenerTodos();
    this.updatePageStatus();
  }

  onSearch(event: Event): void {
    const search = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.search = search;

    this.obtenerTodos();
    this.updatePageStatus();
  }
}
