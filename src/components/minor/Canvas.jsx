import { useState, useContext, useEffect, useRef } from "react";
import Appstate from "../../hooks/appstate";
import { rgba } from "../../functions/rgba";
import chroma from "chroma-js";
import { position } from "../../functions/position";
import { textSize } from "../../functions/textSize";
import { print_MultilineText } from "../../functions/multilineText";
import { Alignment, fontStyles, lineHeight } from "../../assets/Tools";

const Canvas = () => {
  const {
    selected,
    selectedStyle,
    canvasData,
    setCanvasData,
    setUndoStack,
    inputBoxInfo,
    setInputBoxInfo,
  } = useContext(Appstate);
  const [isClicked, setIsClicked] = useState(false);
  const [[lastX, lastY], setLast] = useState([0, 0]);

  const InputBox = useRef(null);
  let [dataSet, index] = canvasData;
  const handleMouseDown = (e) => {
    setIsClicked(true);
    setLast([e.offsetX, e.offsetY]);
  };
  const handleMouseUp = () => {
    setIsClicked(false);
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    // setUndoStack(prev => [...prev,imageData])
    setCanvasData((prev) => {
      let [dataSet, index] = prev;
      dataSet[index] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return [dataSet, index];
    });
  };
  const handleMouseOut = () => {
    setIsClicked(false);
  };
  const handleMouseEnter = () => {
    // setIsClicked(true)
  };
  const handleMouseMove = (e) => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineWidth = selectedStyle.size;
    ctx.lineCap = "round";

    if (isClicked) {
      if (selected === 101) {
        ctx.strokeStyle = rgba(selectedStyle.color);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        setLast([offsetX, offsetY]);
      } else if (selected === 103) {
        ctx.strokeStyle = "white";

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        setLast([offsetX, offsetY]);
      } else if (selected === "201a") {
        const selectedColor = chroma(rgba(selectedStyle.color));
        const strokeColor = selectedColor.brighten(4).alpha(0.2);
        const density = 10;
        ctx.strokeStyle = strokeColor.hex();
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        for (let i = 0; i < density; i++) {
          console.log(i);
          const rectColor = selectedColor
            .brighten(1)
            .alpha((density / i) * 100);
          ctx.fillStyle = rectColor.hex();
          const rectX =
            offsetX + position((Math.random() * selectedStyle.size) / 2);
          const rectY =
            offsetY + position((Math.random() * selectedStyle.size) / 2);
          const rectLen = density / 4;
          const rectWid = density / 4;
          ctx.fillRect(rectX, rectY, rectWid, rectLen);
        }

        setLast([offsetX, offsetY]);
      } else if (selected === "201d") {
        // spray
        const density = 15;
        ctx.fillStyle = rgba(selectedStyle.color);

        for (let i = 0; i < density; i++) {
          const rectX =
            offsetX + position((Math.random() * selectedStyle.size) / 2);
          const rectY =
            offsetY + position((Math.random() * selectedStyle.size) / 2);
          const rectLen = 1.4;
          const rectWid = 1.4;
          ctx.fillRect(rectX, rectY, rectWid, rectLen);
        }

        setLast([offsetX, offsetY]);
      }
    }
  };

  const handleClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const text = inputBoxInfo.value;
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (selected === 104) {
      const fontSize = Number(selectedStyle.size);
      ctx.font = `${fontSize}px ${
        fontStyles[inputBoxInfo.fontFamilyIndex]
      }`;
      ctx.fillStyle = rgba(selectedStyle.color);
      const textDimensions = ctx.measureText(text);
      const textHeight =
        textDimensions.actualBoundingBoxAscent +
        textDimensions.actualBoundingBoxDescent;
      const textPosX = offsetX;
      const textPosY = inputBoxInfo.y + (3 / 2) * textHeight; //
      const textTextPosY = inputBoxInfo.value;
      ctx.textBaseline = 'top'
      ctx.textAlign = Alignment[inputBoxInfo.alignmentIndex].align
      setInputBoxInfo((prev) => ({
        ...prev,
        visible: !prev.visible,
        x: offsetX,
        y: offsetY,

      }));
      InputBox.current.focus();
      inputBoxInfo.value &&
        // ctx.fillText(text, inputBoxInfo.x, textPosY, inputBoxInfo.textboxWidth)
        print_MultilineText(
          textHeight,
          ctx,
          inputBoxInfo,
          selectedStyle.size,
          InputBox
        );
      setInputBoxInfo((prev) => ({ ...prev, value: "" }));
    } else {
      setInputBoxInfo((prev) => ({ ...prev, visible: false }));
    }
    setCanvasData((prev) => {
      let [dataSet, index] = prev;
      dataSet[index] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return [dataSet, index];
    });
  };
  const handleInputBoxChange = (e) => {
    // textSize(e.target.value, selectedStyle.size)
    setInputBoxInfo((prev) => ({
      ...prev,
      value: e.target.value,
      textboxWidth: e.target.clientWidth,
    }));
  };
  useEffect(() => {
    if (inputBoxInfo.value) {
      InputBox.current.style.height = `${InputBox.current.scrollHeight}px`;
    }
  }, [
    inputBoxInfo.fontFamilyIndex,
    inputBoxInfo.lineHeightIndex,
    selectedStyle.size,
    inputBoxInfo.value,
  ]);
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    dataSet[index]
      ? ctx.putImageData(dataSet[index], 0, 0)
      : ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [index, dataSet.length]); // when selected slide changes index changes
  // when slide is deleted index is not changed
  // so thats why when dataSet.length changes it
  // again gets triggered
  useEffect(() => {
    const width = inputBoxInfo.value
      ? textSize(inputBoxInfo.value, selectedStyle.size)
      : selectedStyle.size;
    setInputBoxInfo((prev) => ({ ...prev, width }));
  }, [selectedStyle.size]);

  return (
    <div
      className={`relative overflow-hidden`}
      style={{ width: `${window.innerWidth - 400}px`, height: `700px` }}
    >
      <canvas
        className="shadow-md shadow-[#0000004b]"
        height={700}
        width={window.innerWidth - 400}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      <textarea
        className="absolute bg-transparent border-[0.5px] outline-none border-dashed border-[black] overflow-hidden"
        value={inputBoxInfo.value}
        style={{
          top: inputBoxInfo.y,
          left: inputBoxInfo.x,
          fontSize: `${selectedStyle.size}px`,
          resize: "both",
          display: selected === 104 && inputBoxInfo.visible ? "block" : "none",
          color: rgba(selectedStyle.color),
          fontFamily: fontStyles[inputBoxInfo.fontFamilyIndex],
          lineHeight: lineHeight[inputBoxInfo.lineHeightIndex],
          textAlign:Alignment[inputBoxInfo.alignmentIndex].align
        }}
        ref={InputBox}
        onChange={handleInputBoxChange}
      />
    </div>
  );
};
export default Canvas;
