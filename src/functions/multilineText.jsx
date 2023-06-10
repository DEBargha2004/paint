import DomToImage from 'dom-to-image'
import { Alignment, lineHeight,fontStyles } from '../assets/Tools'
import { rgba } from './rgba'
const xalignPos = (alignment, inputBoxWidth) => {
  if (alignment === 'left') {
    return 0
  } else if (alignment === 'center') {
    return inputBoxWidth / 2
  } else if (alignment === 'right') {
    return inputBoxWidth
  }
}
const xalignStrokePos = (alignment, InputBoxWidth, lineLength) => {
  if (alignment === 'left') {
    return 0
  } else if (alignment === 'center') {
    return (InputBoxWidth - lineLength) / 2
  } else if (alignment === 'right') {
    return InputBoxWidth - lineLength
  }
}
const createLineStrike = ({ ctx, verticalPos, horizontalPos, width }) => {
  ctx.beginPath()
  ctx.moveTo(horizontalPos, verticalPos)
  ctx.lineTo(horizontalPos + width, verticalPos)
  ctx.stroke()
}
export const print_MultilineText = (InputBox, inputBoxInfo, canvas, ctx,setVisibility) => {
  // let sumOfLineHeight = 0;
  // const currentLineHeight =
  //   lineHeight[inputBoxInfo.lineHeightIndex] * selectedStyle.size;
  // const TextArray = inputBoxInfo.value.split("\n");
  // for (let i = 0; i < TextArray.length; i++) {
  //   const currentTextDimensions = ctx.measureText(TextArray[i]);
  //   const currentTextHeight =
  //     currentTextDimensions.actualBoundingBoxAscent +
  //     Math.abs(currentTextDimensions.actualBoundingBoxDescent);
  //   const textPaddingY = (currentLineHeight - currentTextHeight) / 2;
  //   const textAscent = currentTextDimensions.actualBoundingBoxAscent;
  //   const lineWidth = 0.1 * selectedStyle.size;
  //   const lineLength = currentTextDimensions.width;

  //   ctx.fillText(
  //     TextArray[i],
  //     inputBoxInfo.x +
  //       xalignPos(
  //         Alignment[inputBoxInfo.alignmentIndex].align,
  //         InputBox.current.offsetWidth
  //       ),
  //     inputBoxInfo.y + textPaddingY + sumOfLineHeight + textAscent
  //   );

  //   ctx.lineWidth = lineWidth;
  //   ctx.strokeStyle = rgba(selectedStyle.color);
  //   //line-through
  //   console.log(
  //     currentTextDimensions.actualBoundingBoxDescent,
  //     currentTextDimensions.actualBoundingBoxAscent
  //   );
  //   inputBoxInfo.strikethrough &&
  //     createLineStrike({
  //       ctx,
  //       verticalPos:
  //         textAscent * 0.6 + sumOfLineHeight + inputBoxInfo.y + textPaddingY,
  //       horizontalPos:
  //         inputBoxInfo.x +
  //         xalignStrokePos(
  //           Alignment[inputBoxInfo.alignmentIndex].align,
  //           InputBox.current.offsetWidth,
  //           lineLength
  //         ),
  //       width: lineLength,
  //     });

  //   //underline

  //   inputBoxInfo.underline &&
  //     createLineStrike({
  //       ctx,
  //       verticalPos:
  //         textAscent * 1.3 + sumOfLineHeight + inputBoxInfo.y + textPaddingY,
  //       horizontalPos:
  //         inputBoxInfo.x +
  //         xalignStrokePos(
  //           Alignment[inputBoxInfo.alignmentIndex].align,
  //           InputBox.current.offsetWidth,
  //           lineLength
  //         ),
  //       width: lineLength,
  //     });
  //   sumOfLineHeight += currentLineHeight;
  // }

  console.log('multiline text')



  DomToImage.toPng(document.getElementById('textbox')).then(url => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      console.log(url);
      document.body.appendChild(image)
      ctx.drawImage(image, inputBoxInfo.x, inputBoxInfo.y)
      setVisibility(false)
    }
  }).catch(err => {
    console.log(err);
  })
}
