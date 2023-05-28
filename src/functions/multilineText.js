import { lineHeight } from "../assets/Tools";
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
  );
  let sumOfTextHeight = 0;
  const currentLineHeight = lineHeight[inputBoxInfo.lineHeightIndex] * fontSize;
  const TextArray = inputBoxInfo.value.split("\n");
  for (let i = 0; i < TextArray.length; i++) {
    const currentTextDimensions = ctx.measureText(TextArray[i]);
    const currentTextHeight =
      currentTextDimensions.actualBoundingBoxAscent +
      currentTextDimensions.actualBoundingBoxDescent;
    sumOfTextHeight += currentTextHeight;
    console.log(
      i * (lineHeight[inputBoxInfo.lineHeightIndex] * fontSize),
      sumOfTextHeight
    );
    ctx.fillText(
      TextArray[i],
      inputBoxInfo.x,
      inputBoxInfo.y + (i + 1) * 0.64 * currentLineHeight
    );
  }
};
