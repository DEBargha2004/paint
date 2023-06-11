import DomToImage from 'dom-to-image'

export const print_MultilineText = (
  InputBox,
  inputBoxInfo,
  setInputBoxInfo,
  canvas,
  ctx,
  saveCanvasData
) => {
  InputBox.current.style.border = 0
  InputBox.current.style.resize = 'none'

  DomToImage.toPng(document.getElementById('textbox'))
    .then(url => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        ctx.drawImage(image, inputBoxInfo.x + 0.5, inputBoxInfo.y + 0.5)
        saveCanvasData({ canvas, ctx })
      }
      setInputBoxInfo(prev => ({ ...prev, visible: false }))
    })
    .catch(err => {
      console.log(err)
    })
}
