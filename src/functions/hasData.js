export function hasData (data) {
  if (!data) return false

  let data_count = 0

  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i] !== 0) {
      data_count += 1
      if(data_count > 1){
        return true
      }
    }
  }
}
