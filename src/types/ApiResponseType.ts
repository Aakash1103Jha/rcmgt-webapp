export type ApiResponseType<T> = {
  data: T | null;
  error: string | null;
  message: string | null;
};
