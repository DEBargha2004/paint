export function hasData (data) {
    console.log('hasData is called');
  if (!data) return false

  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i] !== 0) {
        console.log(data.data[i]);
      return true
    }
  }
}
