export const print_MultilineText = (text, fontHeight, ctx, inputBoxInfo) => {
  const TextArray = text.split('\n')

  for (let i = 0; i < TextArray.length; i++) {
    ctx.fillText(
      TextArray[i],
      inputBoxInfo.x,
      inputBoxInfo.y + (i+1) * (3 / 2) * fontHeight
    )
  }
}
