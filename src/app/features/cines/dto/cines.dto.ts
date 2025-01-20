export interface CineGetDto {
  id: string;
  nombre: string;
  latitud?: number | null;
  longitud?: number | null;
}

export interface CinePostDto {
  nombre: string;
  latitud: number;
  longitud: number;
}
