import { ActorAutoCompleteDTO } from '@app/features/actores/dto/actores.dto';

export interface PeliculaGetDto {
  id: string;
  titulo: string;
  descripcion: string;
  fechaLanzamiento: Date | null;
  duracion: number;
  anio: string;
  poster: string | null;
  generos?: string[];
  enCines: boolean;
  proximosEstrenos: boolean;
  trailer: string;
  actores?: string[];
  director: string;
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
  anio: string;
  generos: string[];
  cines: string[];
  actores: ActorAutoCompleteDTO[];
  director: string;
}
