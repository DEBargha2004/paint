import { Alignment, lineHeight } from "../assets/Tools";
const xalignPos = (alignment,inputBoxWidth) =>{
  if(alignment === 'left'){
    return 0
  }else if(alignment === 'center'){
    return inputBoxWidth/2
  }else if(alignment === 'right'){
    return inputBoxWidth
  }
}
export const print_MultilineText = (
  fontHeight,
  ctx,
  inputBoxInfo,
  fontSize,
  InputBox
) => {
  let sumOfLineHeight = 0;
  const currentLineHeight = lineHeight[inputBoxInfo.lineHeightIndex] * fontSize;
  const TextArray = inputBoxInfo.value.split("\n");
  for (let i = 0; i < TextArray.length; i++) {
    const currentTextDimensions = ctx.measureText(TextArray[i]);
    const currentTextHeight =
      currentTextDimensions.actualBoundingBoxAscent +
      Math.abs(currentTextDimensions.actualBoundingBoxDescent);
      const textPaddingY = (currentLineHeight-currentTextHeight)/2
    
      console.log(InputBox.current.offsetWidth);
    
      ctx.fillText(
      TextArray[i],
      inputBoxInfo.x + xalignPos(Alignment[inputBoxInfo.alignmentIndex].align,InputBox.current.offsetWidth),
      inputBoxInfo.y +textPaddingY+ sumOfLineHeight
    );
    sumOfLineHeight += currentLineHeight;
  }
};
