import { ActorAutoCompleteDTO } from '@app/features/actores/dto/actores.dto';
import { CineGetDto } from '@app/features/cines/dto/cines.dto';
import { GeneroGetDto } from '@app/features/generos/dto/generos.dto';

export interface PeliculaGetDto {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  trailer: string;
  fechaLanzamiento: Date | null;
  poster: string | null;
  duracion: number;
  anioLanzamiento: string;
  enCines: boolean;
  proximosEstrenos: boolean;
  director: string;
}

export interface PeliculaDetalleDto {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  trailer: string;
  fechaLanzamiento: Date | null;
  poster: string | null;
  duracion: number;
  anioLanzamiento: string;
  enCines: boolean;
  proximosEstrenos: boolean;
  director: string;
  generos: GeneroGetDto[];
  cines: CineGetDto[];
  actores: ActorAutoCompleteDTO[];
}

export interface PeliculaPostDto {
  titulo: string;
  descripcion: string;
  fechaLanzamiento: Date;
  poster: File | null;
  enCines: boolean;
  proximosEstrenos: boolean;
  trailer: string;
  duracion: number;
  anioLanzamiento: string;
  generosIds: string[];
  cinesIds: string[];
  actores: ActorAutoCompleteDTO[];
  director: string;
}

export interface PeliculaGetPostDto {
  generos: GeneroGetDto[];
  cines: CineGetDto[];
}

export interface PeliculaDetallesDto {
  pelicula: PeliculaGetDto;
  generos: GeneroGetDto[];
  cines: CineGetDto[];
  actores: ActorAutoCompleteDTO[];
}

export interface LandingPageDto {
  enCines: PeliculaGetDto[];
  proximosEstrenos: PeliculaGetDto[];
}

export interface PeliculaGetPutDto {
  pelicula: PeliculaGetDto;
  generosSeleccionados: GeneroGetDto[];
  generosNoSeleccionados: GeneroGetDto[];
  cineSeleccionados: CineGetDto[];
  cineNoSeleccionados: CineGetDto[];
  actores: ActorAutoCompleteDTO[];
}

export interface PeliculaFilterDto {
  pagina?: number;
  recordsPorPagina?: number;
  titulo?: string;
  anioLanzamiento?: string;
  genero?: string;
  enCines?: boolean;
  proximosEstrenos?: boolean;
}
