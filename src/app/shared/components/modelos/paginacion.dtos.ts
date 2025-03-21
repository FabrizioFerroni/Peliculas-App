export interface PaginacionDto {
  pagina: number;
  registrosPorPagina: number;
  search?: string | null;
  ascending?: boolean | null;
  ordenar?: string | null;
}
