import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ListadoPeliculasComponent } from '../listado-peliculas/listado-peliculas.component';
import { IFiltroPelicula } from './interface/filtro-pelicula';
import { CommonModule, Location } from '@angular/common';
import { Rutas } from '@app/shared/utils/rutas';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@app/shared/services/utils.service';
import { PeliculaGetDto } from '../dto/pelicula.dto';
import { GeneroGetDto } from '@app/features/generos/dto/generos.dto';
import { GenerosService } from '@app/features/generos/service/generos.service';
import { PeliculasService } from '../service/peliculas.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PaginacionDto } from '@app/shared/components/modelos/paginacion.dtos';
import { Pageable } from '@app/shared/components/modelos/pageable.dto';
import { CargandoComponent } from '../../../shared/components/cargando/cargando.component';
import { PaginadoComponent } from '../../../shared/components/paginado/paginado.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filtro-peliculas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ListadoPeliculasComponent,
    CargandoComponent,
    PaginadoComponent,
    CommonModule,
  ],
  providers: [GenerosService, PeliculasService],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.scss',
})
export default class FiltroPeliculasComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private location: Location = inject(Location);
  private readonly thisPage = Rutas.PELICULA_FILTROS;
  private activatedRoute = inject(ActivatedRoute);
  private readonly utilsService = inject(UtilsService);
  private readonly generosService = inject(GenerosService);
  private readonly peliculasService = inject(PeliculasService);

  form = this.fb.group({
    titulo: '',
    anioLanzamiento: '',
    genero: '',
    proximosEstrenos: false,
    enCines: false,
  });

  generos: GeneroGetDto[] = [];

  peliculas: PeliculaGetDto[] = [];

  paginacion: PaginacionDto = {
    pagina: 1,
    registrosPorPagina: 10,
  };

  /* cosas de paginacion */
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

  /* fin */

  ngOnInit(): void {
    this.generosService.obtenerTodosSP().subscribe({
      next: (generos: GeneroGetDto[]) => {
        this.generos = generos;

        this.leerValoresUrl();
        this.buscarPeliculas(this.form.value as IFiltroPelicula);

        this.form.valueChanges.pipe(debounceTime(300)).subscribe((filtro) => {
          console.log(filtro);
          this.buscarPeliculas(filtro as IFiltroPelicula);
          this.escribirParametrosDeBusqueda(filtro as IFiltroPelicula);
        });
      },
      error: (error: HttpErrorResponse) => console.error(error),
    });

    this.utilsService.setTitle('Buscar Películas');
  }

  limpiar() {
    this.form.patchValue({
      titulo: '',
      anioLanzamiento: '',
      genero: '',
      proximosEstrenos: false,
      enCines: false,
    });
  }

  buscarPeliculas(filtros: IFiltroPelicula) {
    filtros.pagina = this.paginacion.pagina;
    filtros.recordsPorPagina = this.paginacion.registrosPorPagina;

    this.isLoading = true;
    this.peliculasService.obtenerFiltrados(filtros).subscribe({
      next: ({ body }: HttpResponse<Pageable<PeliculaGetDto[]>>) => {
        this.peliculas = body?.content as unknown as PeliculaGetDto[] as
          | PeliculaGetDto[]
          | [];
        this.isFirst = body?.first!;
        this.isLast = body?.last!;
        this.totalPages = body?.totalPages as number;
        this.totalElements = body?.totalElements as number;
      },
      error: (error: HttpErrorResponse) => console.error(error),
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  escribirParametrosDeBusqueda(filtro: IFiltroPelicula) {
    let queryString = [];

    if (filtro.titulo) {
      queryString.push(`titulo=${encodeURIComponent(filtro.titulo)}`);
    }

    if (filtro.genero !== '') {
      queryString.push(`genero=${encodeURIComponent(filtro.genero)}`);
    }

    if (filtro.proximosEstrenos) {
      queryString.push(`proximosEstrenos=${filtro.proximosEstrenos}`);
    }

    if (filtro.anioLanzamiento !== '') {
      queryString.push(
        `anioLanzamiento=${encodeURIComponent(filtro.anioLanzamiento)}`
      );
    }

    if (filtro.enCines) {
      queryString.push(`enCines=${filtro.enCines}`);
    }

    this.location.replaceState(this.thisPage, queryString.join('&'));
  }

  leerValoresUrl() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const filtro = {
        titulo: '',
        anioLanzamiento: '',
        genero: '',
        proximosEstrenos: false,
        enCines: false,
      };

      if (params['titulo']) {
        filtro.titulo = decodeURIComponent(params['titulo']);
      }

      if (params['genero']) {
        filtro.genero = decodeURIComponent(params['genero']);
      }

      if (params['anioLanzamiento']) {
        filtro.anioLanzamiento = decodeURIComponent(params['anioLanzamiento']);
      }

      if (params['proximosEstrenos']) {
        filtro.proximosEstrenos = params['proximosEstrenos'] === 'true';
      }

      if (params['enCines']) {
        filtro.enCines = params['enCines'] === 'true';
      }

      this.form.patchValue(filtro);
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
    this.buscarPeliculas(this.form.value as IFiltroPelicula);
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
      this.buscarPeliculas(this.form.value as IFiltroPelicula);
    }
  }

  Last() {
    if (!this.isLast) {
      this.currentPage = this.totalPages;
      const totalPages = Math.ceil(this.totalElements / this.size);
      this.page = totalPages;

      this.buscarPeliculas(this.form.value as IFiltroPelicula);
    }
  }

  rewind() {
    if (this.currentPage > 1 && !this.isFirst) {
      this.currentPage--;
      this.page--;
      this.updatePageStatus();

      this.buscarPeliculas(this.form.value as IFiltroPelicula);
    }
  }

  forward() {
    if (this.currentPage < this.totalPages && !this.isLast) {
      this.currentPage++;
      this.page++;
      this.updatePageStatus();

      this.buscarPeliculas(this.form.value as IFiltroPelicula);
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

      this.buscarPeliculas(this.form.value as IFiltroPelicula);
    }
  }

  changeSize(event: Event): void {
    const size = (event.target as HTMLInputElement).value;

    this.currentPage = 1;
    this.size = size === 'total' ? this.totalElements : parseInt(size);

    this.isLoading = true;
    this.setPage(1);

    this.buscarPeliculas(this.form.value as IFiltroPelicula);
  }
}
