export const position = val => {
  const bool = Boolean(Math.floor(Math.random() * 2))
  if (bool) {
    return val
  } else {
    return -val
  }
}
