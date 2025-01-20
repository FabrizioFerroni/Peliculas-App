export interface ActoresGetDto {
  id: string;
  nombre: string;
  fechaNacimiento: Date | null;
  foto?: string | null;
}

export interface ActoresPostDto {
  nombre: string;
  fechaNacimiento: Date;
  foto?: File | null;
}

export interface ActorAutoCompleteDTO {
  id: string;
  nombre: string;
  personaje: string;
  foto: string;
}
