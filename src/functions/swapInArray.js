export const swapInArray = (array, p1, p2) => {
  let elem1 = array[p1]
  let elem2 = array[p2]

  array[p1] = elem2
  array[p2] = elem1
  return array
}
