export const debounce = (fn: (p: unknown) => void, delay: number) => {
  let timer: number | NodeJS.Timeout // 维护一个 timer
  return function (...args: unknown[]) {
    const a = args
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(a)
    }, delay)
  }
}
