export interface IPelicula {
  titulo: string;
  precio: number;
  fechaLanzamiento: Date;
  poster?: string;
  generos?: string;
  enCines?: boolean;
  proximosEstrenos?: boolean;
}
