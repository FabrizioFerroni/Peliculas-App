export interface CineGetDto {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
}

export interface CinePostDto {
  nombre: string;
  latitud: number;
  longitud: number;
}
