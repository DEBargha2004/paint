export const compareImage = (image1, image2) => {
  //compareImage(currentCanvasData, savedCanvasData)
  if (!image2) {
    for (let i = 0; i < image1.data.length; i++) {
      if (image1.data[i]) return false
    }
    return true
  }
  const [
    { height: h1, width: w1, data: d1 },
    { height: h2, width: w2, data: d2 }
  ] = [image1, image2]

  if (h1 !== h2 || w1 !== w2) {
    return false
  }

  for (let i = 0; i < d1.length; i++) {
    if (d1[i] !== d2[i]) return false
  }

  return true
}
