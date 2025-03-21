export interface Pageable<T> {
  content: T[];
  paginationDetails: PageableDetails;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
}

export interface PageableDetails {
  pageNumber: number;
  pageSize: number;
  offset: number;
  nextPage: number;
  previousPage: number;
}
