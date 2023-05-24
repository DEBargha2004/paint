export const textSize = (text, fontSize) => {
  const offScreenElement = document.createElement('span')
  text = text.replace(/\n/g,'<br/>')
  offScreenElement.innerHTML = text
  offScreenElement.style.fontSize = `${fontSize}px`
  offScreenElement.style.position = 'absolute'
  offScreenElement.style.opacity = 0

  document.body.appendChild(offScreenElement)
  const textWidth = offScreenElement.clientWidth
  const textHeight = offScreenElement.clientHeight
  document.body.removeChild(offScreenElement)
  return textWidth
}
