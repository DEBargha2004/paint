import { lineHeight } from '../assets/Tools'
export const print_MultilineText = (
  fontHeight,
  ctx,
  inputBoxInfo,
  fontSize
) => {
  const TextArray = inputBoxInfo.value.split('\n')
  for (let i = 0; i < TextArray.length; i++) {
    ctx.fillText(
      TextArray[i],
      inputBoxInfo.x,
      inputBoxInfo.y +
        (i + 1) *
          (fontHeight + lineHeight[inputBoxInfo.lineHeightIndex] * fontSize)
    )
  }
}
