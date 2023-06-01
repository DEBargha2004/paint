import { useState, useContext, useEffect, useRef } from "react";
import Appstate from "../../hooks/appstate";
import { rgba } from "../../functions/rgba";
import chroma from "chroma-js";
import { position } from "../../functions/position";
import { print_MultilineText } from "../../functions/multilineText";
import { Alignment, fontStyles, lineHeight } from "../../assets/Tools";
import Draggable from "react-draggable";
import SelectedImageHover from "./selectedImageHover";

const Canvas = () => {
  const {
    selected,
    setSelected,
    selectedStyle,
    canvasData,
    setCanvasData,
    setUndoStack,
    inputBoxInfo,
    setInputBoxInfo,
    selectedImageData,
    setSelectedImageData,
  } = useContext(Appstate);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [[lastX, lastY], setLast] = useState([0, 0]);
  const [resizingData, setResizingData] = useState({
    initialX: null,
    initialY: null,
  });

  const resizingDataRef = useRef({
    initialX: null,
    initialY: null,
  });

  const [showImageInDOM, setShowImageInDOM] = useState(false);
  const [resizeImageInDOM, setResizeImageInDOM] = useState(false);
  const [imageDataInDOM, setImageDataInDOM] = useState({
    height: 0,
    width: 0,
    x: null,
    y: null,
  });

  const InputBox = useRef(null);
  const isVisible = useRef(false);
  const resizing = useRef(false);
  let [dataSet, index] = canvasData;
  const handleMouseDown = (e) => {
    console.log(e);
    const { offsetX, offsetY, pageX, pageY } = e.nativeEvent;
    setIsMouseDown(true);
    setLast([offsetX, offsetY]);
    setResizingData((prev) => ({
      ...prev,
      initialX: pageX,
      initialY: pageY,
    }));
    setImageDataInDOM((prev) => ({ ...prev, x: offsetX, y: offsetY }));
    if (selected === 102 && selectedImageData.image) {
      setShowImageInDOM(true);
      setResizeImageInDOM(true);
      resizing.current = true;
    }
  };
  const handleMouseUp = (e) => {
    setIsMouseDown(false);
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    // setUndoStack(prev => [...prev,imageData])
    setCanvasData((prev) => {
      let [dataSet, index] = prev;
      dataSet[index] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return [dataSet, index];
    });
    console.log(e);
    setSelected(null);
    resizing.current = false;
  };
  const handleMouseOut = () => {
    setIsMouseDown(false);
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

    if (isMouseDown) {
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
        const strokeColor = selectedColor.brighten(1);
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
    if (selected === 102 && selectedImageData.image) {
      setSelectedImageData((prev) => ({
        ...prev,
        x: offsetX + 10,
        y: offsetY + 10,
      }));
    }
  };

  const handleClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log("clicked in canvas");
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


  // useEffect(() => {
  //   const documentMouseMoveHandler = (e) => {
  //     if (resizing.current) {
  //       const changeInX = e.pageX - resizingDataRef.current.initialX;
  //       const changeInY = e.pageY - resizingDataRef.current.initialY;
  //       const netWidth = inputBoxInfo.textboxWidth + changeInX;
  //       const netHeight = inputBoxInfo.textboxHeight + changeInY;
  //       setInputBoxInfo((prev) => ({
  //         ...prev,
  //         textboxWidth: netWidth,
  //         textboxHeight: netHeight,
  //       }));
  //     }
  //     if (resizing.current) {
  //       const changeInX = e.pageX - resizingData.initialX;
  //       const changeInY = e.pageY - resizingData.initialY;
  //       const netWidth = imageDataInDOM.width + changeInX;
  //       const netHeight = imageDataInDOM.height + changeInY;
  //       setImageDataInDOM((prev) => ({
  //         ...prev,
  //         height: netHeight,
  //         width: netWidth,
  //       }));
  //     }
  //   };
  //   const documentMouseUpHandler = () => {
  //     resizing.current = false;
  //   };
  //   document.addEventListener("mousemove", documentMouseMoveHandler);
  //   document.addEventListener("mouseup", () => documentMouseUpHandler);

  //   const handleResizeTextarea = () => {
  //     if (inputBoxInfo.visible && InputBox.current) {
  //       // to not set the height and width to 0 on
  //       console.log(InputBox.current);
  //       setInputBoxInfo((prev) => ({
  //         // closing the textarea
  //         ...prev,
  //         textboxWidth: InputBox.current.offsetWidth,
  //         textboxHeight: InputBox.current.offsetHeight,
  //       }));
  //     }
  //   };
  //   const textbox = document.querySelector("textarea");
  //   inputBoxInfo.visible && console.log("input box is now visible");
  //   inputBoxInfo.visible
  //     ? new ResizeObserver(handleResizeTextarea).observe(textbox)
  //     : null;

  //   return () => {
  //     document.removeEventListener("mousemove", documentMouseMoveHandler);
  //     document.removeEventListener("mouseup", documentMouseUpHandler);
  //   };
  // }, [
  //   resizingData.initialX,
  //   resizingData.initialY,
  //   inputBoxInfo.visible,
  //   resizeImageInDOM,
  // ]);

  
  useEffect(() => {
    setInputBoxInfo((prev) => ({ ...prev, visible: false }));
  }, [selected]);

  // useEffect(() => {
  //   const canvas = document.querySelector("canvas");
  //   const ctx = canvas.getContext("2d", { willReadFrequently: true });
  //   ctx.clearRect(0,0,canvas.width,canvas.height)
  //   const x = 300;
  //   const y = 300;
  //   const soft_density = 500;
  //   const hard_density = 450;
  //   const soft_densityAreaRadius = 15;
  //   const hard_densityAreaRadius = 11;
  //   const softCircleRadius = 2.5;
  //   const hardCircleRadius = 1.6;
  //   for (let i = 0; i < soft_density; i++) {
  //     const centerX = x + position(Math.random() * soft_densityAreaRadius);
  //     const centerY = y + position(Math.random() * soft_densityAreaRadius);
  //     ctx.beginPath();
  //     // ctx.arc(centerX, centerY, softCircleRadius, 0, 2 * Math.PI);
  //     ctx.fillRect(centerX,centerY,softCircleRadius,softCircleRadius)
  //     ctx.closePath();
  //     const color = chroma(rgba(selectedStyle.color)).alpha(0.5)
  //     ctx.fillStyle = color;
  //     ctx.fill();
  //   }
  //   for (let i = 0; i < hard_density; i++) {
  //     const centerX = x + position(Math.random() * soft_densityAreaRadius);
  //     const centerY = y + position(Math.random() * hard_densityAreaRadius);
  //     ctx.beginPath();
  //     // ctx.arc(centerX, centerY, hardCircleRadius, 0, 2 * Math.PI);
  //     ctx.fillRect(centerX,centerY,hardCircleRadius,hardCircleRadius)
  //     ctx.closePath();
  //     const color = chroma(rgba(selectedStyle.color)).brighten(0.1)
  //     ctx.fillStyle = color;
  //     ctx.fill();
  //   }
  //   for (let i = 0; i < 150; i++) {
  //     const centerX = x + position(Math.random() * soft_densityAreaRadius);
  //     const centerY = y + position(Math.random() * soft_densityAreaRadius);
  //     ctx.beginPath();
  //     // ctx.arc(centerX, centerY, hardCircleRadius, 0, 2 * Math.PI);
  //     ctx.fillRect(centerX,centerY,hardCircleRadius,hardCircleRadius)
  //     ctx.closePath();
  //     const color = chroma(rgba(selectedStyle.color)).brighten(0.1)
  //     ctx.fillStyle = color;
  //     ctx.fill();
  //   }
  // }, [selectedStyle.color]);

  return (
    <div
      className={`relative overflow-hidden`}
      style={{ width: `${window.innerWidth - 400}px`, height: `700px` }}
    >
      <canvas
        className={`shadow-md shadow-[#0000004b] }`}
        height={700}
        width={window.innerWidth - 400}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
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
      {selected === 102 && selectedImageData.image && (
        <SelectedImageHover {...selectedImageData} />
      )}
      {showImageInDOM && (
        <img
          src={selectedImageData.image}
          alt=""
          className="absolute"
          style={{
            height: `${imageDataInDOM.height}px`,
            width: `${imageDataInDOM.width}px`,
            top: `${imageDataInDOM.y}px`,
            left: `${imageDataInDOM.x}px`,
            backgroundSize: "cover",
          }}
        />
      )}
    </div>
  );
};
export default Canvas;
