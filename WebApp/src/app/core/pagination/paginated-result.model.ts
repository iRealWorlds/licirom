export interface PaginatedResult<TModel> {
  items: TModel[];
  lastPage: number;
  pageSize: number;
  total: number;
}
