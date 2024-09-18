export interface ResponseHubsAsyncThunk<T> {
  data: T[]
  isError: boolean
  isSuccess: boolean
}

export interface ResponseDataAsyncThunk<T> {
  data: T
  isError: boolean
  isSuccess: boolean
}
