import { Component, inject, OnInit } from '@angular/core';
import { Rutas } from '@app/shared/utils/rutas';
import { UtilsService } from '@app/shared/services/utils.service';
import { AuthService } from '../service/auth.service';
import { UsuarioDto } from '../dto/auth-dto';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { PaginadoComponent } from '@app/shared/components/paginado/paginado.component';
import { CommonModule } from '@angular/common';
import { ListadoGenericosComponent } from '../../../shared/components/listado-genericos/listado-genericos.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    PaginadoComponent,
    CommonModule,
    ListadoGenericosComponent,
    RouterLink,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  providers: [AuthService],
})
export default class UsuariosComponent implements OnInit {
  readonly newUsuarioRoute = Rutas.USUARIO_NUEVO;
  readonly editUsuarioRouteARR: string[] = Rutas.USUARIO_EDITAR.split('/:');
  readonly editUsuarioRoute: string = this.editUsuarioRouteARR[0];
  private readonly utilsService = inject(UtilsService);
  private readonly authService = inject(AuthService);

  usuarios: UsuarioDto[] = [];

  // Variables para paginado
  cantidadTotalRegistros: number = 0;
  search?: string = '';
  page: number = 1;
  size: number = 10;
  order: string = 'Email';
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
  ngOnInit(): void {
    this.utilsService.setTitle('Usuarios');
    this.obtenerTodos();
  }

  obtenerTodos(): void {
    this.isLoading = true;
    this.authService
      .obtenerUsuarioPaginado({
        pagina: this.page,
        registrosPorPagina: this.size,
        ordenar: this.order,
        ascending: this.asc,
        search: this.search,
      })
      .subscribe({
        next: ({ body }: HttpResponse<Pageable<UsuarioDto[]>>) => {
          this.usuarios = body?.content as UsuarioDto[] | [];
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

  hacerAdmin(email: string): void {
    swal
      .fire({
        title: '¿Estas seguro que quieres agregarle el rol?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5c62ec',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agregalo!',
        cancelButtonText: 'Cancelar',
        customClass: {
          cancelButton: 'outnone',
          confirmButton: 'outnone',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.authService.hacerAdmin(email).subscribe({
            next: () => {
              swal.fire({
                title: 'Éxito!',
                text: `El usuario ${email} ahora es admin`,
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

  eliminarRol(email: string): void {
    swal
      .fire({
        title: '¿Estas seguro que quieres quitarle el rol?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5c62ec',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quitale!',
        cancelButtonText: 'Cancelar',
        customClass: {
          cancelButton: 'outnone',
          confirmButton: 'outnone',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.authService.removerAdmin(email).subscribe({
            next: () => {
              swal.fire({
                title: 'Éxito!',
                text: `El usuario ${email} ya no es admin`,
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
