export interface ApiResult<T> {
  first: number;
  items: number;
  last?: number;
  next: number;
  pages: number;
  prev?: number;
  data?: T[];
}
