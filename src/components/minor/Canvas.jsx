import { useState, useContext, useEffect, useRef } from "react";
import Appstate from "../../hooks/appstate";
import { rgba } from "../../functions/rgba";
import chroma from "chroma-js";
import { position } from "../../functions/position";
import { textSize } from "../../functions/textSize";
import { print_MultilineText } from "../../functions/multilineText";
import { Alignment, fontStyles, lineHeight } from "../../assets/Tools";
import Draggable from "react-draggable";

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
  const [resizingData, setResizingData] = useState({
    initialX: null,
    initialY: null,
  });

  const resizingDataRef = useRef({
    initialX: null,
    initialY: null,
  });

  const InputBox = useRef(null);
  const isVisible = useRef(false);
  const resizing = useRef(false);
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
        const strokeColor = selectedColor.brighten(3);
        const density = 10;
        ctx.strokeStyle = strokeColor.hex();
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        // for (let i = 0; i < density; i++) {
        //   const rectColor = selectedColor
        //     .brighten(1)
        //     .alpha((density / i) * 100);
        //   ctx.fillStyle = rectColor.hex();
        //   const rectX =
        //     offsetX + position((Math.random() * selectedStyle.size) / 2);
        //   const rectY =
        //     offsetY + position((Math.random() * selectedStyle.size) / 2);
        //   const rectLen = density / 4;
        //   const rectWid = density / 4;
        //   ctx.fillRect(rectX, rectY, rectWid, rectLen);
        // }

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
      ctx.font = `${inputBoxInfo.bold ? "bold" : ""} ${
        inputBoxInfo.italic ? "italic" : ""
      } ${fontSize}px ${fontStyles[inputBoxInfo.fontFamilyIndex]} `;
      ctx.fillStyle = rgba(selectedStyle.color);
      const textDimensions = ctx.measureText(text);
      const textHeight =
        textDimensions.actualBoundingBoxAscent +
        textDimensions.actualBoundingBoxDescent;
      ctx.textBaseline = "alphabetic";
      ctx.lineCap = "square";
      ctx.textAlign = Alignment[inputBoxInfo.alignmentIndex].align;
      console.log(offsetX, offsetY);
      setInputBoxInfo((prev) => ({
        ...prev,
        visible: !prev.visible,
        x: offsetX,
        y: offsetY,
      }));
      isVisible.current = !isVisible.current;
      inputBoxInfo.visible ? InputBox.current.focus() : null;
      inputBoxInfo.value &&
        
        print_MultilineText(
          textHeight,
          ctx,
          inputBoxInfo,
          selectedStyle,
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
    }));
  };
  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    const { offsetX, offsetY } = e;
    const { textboxWidth, textboxHeight } = inputBoxInfo;
    console.log(textboxHeight - offsetY, textboxWidth - offsetX);
    if (textboxHeight - offsetY > 20 && textboxWidth - offsetX > 20)
      setInputBoxInfo((prev) => ({ ...prev, x, y }));
  };
  const handleResizingMouseDown = (e) => {
    resizing.current = true;
    setResizingData((prev) => ({
      ...prev,
      initialX: e.nativeEvent.pageX,
      initialY: e.nativeEvent.pageY,
    }));
    resizingDataRef.current.initialX = e.pageX;
    resizingDataRef.current.initialY = e.pageY;
  };

  useEffect(() => {
    if (inputBoxInfo.value && InputBox.current) {
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
    document.addEventListener("mousemove", (e) => {
      if (resizing.current) {
        const changeInX = e.pageX - resizingDataRef.current.initialX;
        const changeInY = e.pageY - resizingDataRef.current.initialY;
        const netWidth = inputBoxInfo.textboxWidth + changeInX;
        const netHeight = inputBoxInfo.textboxHeight + changeInY;
        setInputBoxInfo((prev) => ({
          ...prev,
          textboxWidth: netWidth,
          textboxHeight: netHeight,
        }));
      }
    });
    document.addEventListener("mouseup", () => {
      resizing.current = false;
    });
    const handleResizeTextarea = () => {
      if (inputBoxInfo.visible && InputBox.current) {
        // to not set the height and width to 0 on
        console.log(InputBox.current);
        setInputBoxInfo((prev) => ({
          // closing the textarea
          ...prev,
          textboxWidth: InputBox.current.offsetWidth,
          textboxHeight: InputBox.current.offsetHeight,
        }));
      }
    };
    const textbox = document.querySelector("textarea");
    inputBoxInfo.visible && console.log("input box is now visible");
    inputBoxInfo.visible
      ? new ResizeObserver(handleResizeTextarea).observe(textbox)
      : null;
  }, [resizingData.initialX, resizingData.initialY, inputBoxInfo.visible]);
  useEffect(() => {
    setInputBoxInfo((prev) => ({ ...prev, visible: false }));
  }, [selected]);
  return (
    <div
      className={`relative overflow-hidden`}
      style={{ width: `${window.innerWidth - 400}px`, height: `700px` }}
    >
      <canvas
        className={`shadow-md shadow-[#0000004b] }`}
        height={700}
        width={window.innerWidth - 400}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseEnter}
        onMouseMove={(e) => {
          handleMouseMove(e);
        }}
        onClick={handleClick}
      />
      {inputBoxInfo.visible && (
        <Draggable
          position={{ x: inputBoxInfo.x, y: inputBoxInfo.y }}
          onDrag={handleDrag}
          cancel={`${inputBoxInfo.drag ? `#resizer` : `#resizer,#textbox`}`}
        >
          <div
            className="absolute top-0 left-0"
            style={{
              height: `${inputBoxInfo.textboxHeight}px`,
              width: `${inputBoxInfo.textboxWidth}px`,
            }}
          >
            <textarea
              id="textbox"
              className={`absolute bg-transparent border-[0.5px] top-0 left-0 border-[black] border-dotted outline-none overflow-hidden underline-offset-8 ${
                inputBoxInfo.bold && "font-bold"
              } ${inputBoxInfo.italic && "italic"}`}
              value={inputBoxInfo.value}
              style={{
                display:
                  selected === 104 && inputBoxInfo.visible ? "block" : "none",
                width: `${inputBoxInfo.textboxWidth || 300}px`,
                height: `${inputBoxInfo.textboxHeight || 100}px`,
                textDecoration: `${inputBoxInfo.underline ? "underline" : ""} ${
                  inputBoxInfo.strikethrough ? "line-through" : ""
                }`,
                fontSize: `${selectedStyle.size}px`,
                resize: "both",
                color: rgba(selectedStyle.color),
                fontFamily: fontStyles[inputBoxInfo.fontFamilyIndex],
                lineHeight: lineHeight[inputBoxInfo.lineHeightIndex],
                textAlign: Alignment[inputBoxInfo.alignmentIndex].align,
              }}
              ref={InputBox}
              onChange={handleInputBoxChange}
            />
            <div
              id="resizer"
              className={`absolute w-5 h-5 right-0 bottom-0 cursor-nwse-resize ${
                inputBoxInfo.visible ? "block" : "hidden"
              }`}
              onMouseDown={handleResizingMouseDown}
            />
          </div>
        </Draggable>
      )}
    </div>
  );
};
export default Canvas;
