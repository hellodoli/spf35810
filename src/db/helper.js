export function wrapDataSuccess(data) {
  return {
    data,
    isError: false,
    isSuccess: true,
  }
}

export function wrapDataFailed(data) {
  return {
    data,
    isError: true,
    isSuccess: false,
  }
}
