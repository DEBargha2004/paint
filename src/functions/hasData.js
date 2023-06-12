export function hasData (data) {
  if (!data) return false

  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i] !== 0) {
      return true
    }
  }
}
