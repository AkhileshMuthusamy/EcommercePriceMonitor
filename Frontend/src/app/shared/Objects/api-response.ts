export interface APIResponse<T> {
  data: T;
  error: boolean;
  message: string;
}
