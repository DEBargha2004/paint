import DomToImage from 'dom-to-image'
import html2canvas from 'html2canvas'
import { lineHeight } from '../assets/Tools'
export const print_MultilineText = (
  fontHeight,
  ctx,
  inputBoxInfo,
  fontSize,
  InputBox
) => {
  console.log(
    fontHeight,
    fontSize,
    lineHeight[inputBoxInfo.lineHeightIndex] * fontSize
  )
  const TextArray = inputBoxInfo.value.split('\n')
  for (let i = 0; i < TextArray.length; i++) {
    console.log(
      inputBoxInfo.y,
      inputBoxInfo.y +
        (i + 1) *
          (fontHeight + lineHeight[inputBoxInfo.lineHeightIndex] * fontSize)
    )
    ctx.fillText(
      TextArray[i],
      inputBoxInfo.x,
      inputBoxInfo.y +
        (i + 1) *
          (fontHeight + lineHeight[inputBoxInfo.lineHeightIndex] * fontSize)
    )
  }

  // DomToImage.toPng(document.querySelector('html'))
  //   .then(url => console.log(url))
  //   .catch(e => console.log(e))

  // html2canvas(InputBox.current)
  //   .then(e => console.log(e.toDataURL('image/png')))
  //   .catch(e => console.log(e))
}
