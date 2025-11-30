export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  sort: SortInfo;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Page<T> {
  content: T[];
  pageable?: PageableInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort?: SortInfo;
  numberOfElements?: number;
  size: number;
  number: number;
  empty: boolean;
}