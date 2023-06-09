import DomToImage from 'dom-to-image'

export const print_MultilineText = (
  InputBox,
  inputBoxInfo,
  setInputBoxInfo,
  canvas,
  ctx,
  saveCanvasData
) => {
  InputBox.current ? (InputBox.current.style.border = 0) : null
  InputBox.current ? (InputBox.current.style.resize = 'none') : null

  DomToImage.toPng(document.getElementById('textbox'))
    .then(url => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        ctx.drawImage(image, inputBoxInfo.x, inputBoxInfo.y)
        saveCanvasData({ canvas, ctx })
      }
      setInputBoxInfo(prev => ({ ...prev, visible: false }))
    })
    .catch(err => {
    })
}
