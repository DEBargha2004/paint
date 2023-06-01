export const position = val => {
  console.log(val);
  const bool = Boolean(Math.floor(Math.random() * 2))
  if (bool) {
    return val
  } else {
    return -val
  }
}
