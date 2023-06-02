import { useState, useContext, useEffect, useRef } from "react";
import Appstate from "../../hooks/appstate";
import { rgba } from "../../functions/rgba";
import chroma from "chroma-js";
import { position } from "../../functions/position";
import { print_MultilineText } from "../../functions/multilineText";
import { Alignment, fontStyles, lineHeight } from "../../assets/Tools";
import Draggable from "react-draggable";
import SelectedImageHover from "./SelectedImageHover";

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

  const [imageDatainDOM, setImageDataInDOM] = useState({
    initialX: null,
    initialY: null,
    height: 0,
    width: 0,
    top: null,
    left: null,
    showOverview: false,
    enableResizing: false,
    clicked: 0,
  });

  const InputBox = useRef(null);
  const isVisible = useRef(false);
  const resizing = useRef(false);

  let [dataSet, index] = canvasData;

  const handleMouseDown = (e) => {
    console.log("this is in handlemousedown of canvas");
    const { offsetX, offsetY, pageX, pageY } = e.nativeEvent;
    setIsMouseDown(true);
    setLast([offsetX, offsetY]);
    setResizingData((prev) => ({
      ...prev,
      initialX: pageX,
      initialY: pageY,
    }));
    if (selected === 102 && selectedImageData.image) {
      if (!imageDatainDOM.height && !imageDatainDOM.width) {
        setImageDataInDOM((prev) => ({
          ...prev,
          initialX: pageX,
          initialY: pageY,
          top: offsetY,
          left: offsetX,
          enableResizing: true,
        }));
      }
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
    resizing.current = false;
    if (selected === 102) {
      setImageDataInDOM((prev) => ({
        ...prev,
        enableResizing: false,
        showOverview: false,
      }));
    }
  };

  const handleDOMImageMouseUp = () => {
    if (selected === 102) {
      setImageDataInDOM((prev) => ({
        ...prev,
        enableResizing: false,
        showOverview: false,
      }));
    }
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
    const { offsetX, offsetY, pageX, pageY } = e.nativeEvent;
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
        ctx.strokeStyle = strokeColor.hex();
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

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
    if (selected === 102 && imageDatainDOM.showOverview) {
      setSelectedImageData((prev) => ({
        ...prev,
        x: offsetX + 5,
        y: offsetY + 5,
      }));
    }
    if (selected === 102 && imageDatainDOM.enableResizing) {
      if (imageDatainDOM.enableResizing) {
        let imageHeight = pageY - imageDatainDOM.initialY - 3;
        let imageWidth = pageX - imageDatainDOM.initialX - 3;

        imageHeight = imageHeight < 0 ? 0 : imageHeight;
        imageWidth = imageWidth < 0 ? 0 : imageWidth;
        setImageDataInDOM((prev) => ({
          ...prev,
          height: imageHeight,
          width: imageWidth,
        }));
      }
    }
  };

  const handleClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log("clicked in canvas", imageDatainDOM);
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

    if (selected === 102 && selectedImageData.image) {
      if (imageDatainDOM.clicked) {
        const imageElement = new Image();
        imageElement.src = selectedImageData.image;
        imageElement.onload = () =>
          ctx.drawImage(
            imageElement,
            imageDatainDOM.left,
            imageDatainDOM.top,
            imageDatainDOM.width,
            imageDatainDOM.height
          );
        setImageDataInDOM((prev) => ({
          ...prev,
          height: null,
          width: null,
          clicked: 0,
        }));
      } else {
        setImageDataInDOM((prev) => ({ ...prev, clicked: prev.clicked + 1 }));
      }
    }
  };

  // value addition of inputbox start

  const handleInputBoxChange = (e) => {
    setInputBoxInfo((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };
  //value addition of inputbox end

  // dragging of textarea start

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    const { offsetX, offsetY } = e;
    const { textboxWidth, textboxHeight } = inputBoxInfo;
    if (textboxHeight - offsetY > 20 && textboxWidth - offsetX > 20)
      setInputBoxInfo((prev) => ({ ...prev, x, y }));
  };

  // dragging of textarea end

  // handling of resizing process for textarea start

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

  const handleResizingMouseUp = () => {
    resizing.current = false;
  };

  // handling of resizing process for textarea end

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
    const documentMouseMoveHandler = (e) => {
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
    };
    const documentMouseUpHandler = () => {
      resizing.current = false;
      console.log(resizing);
    };
    document.addEventListener("mousemove", documentMouseMoveHandler);
    document.addEventListener("mouseup", () => documentMouseUpHandler);

    const handleResizeTextarea = () => {
      if (inputBoxInfo.visible && InputBox.current) {
        // to not set the height and width to 0 on
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

    return () => {
      document.removeEventListener("mousemove", documentMouseMoveHandler);
      document.removeEventListener("mouseup", documentMouseUpHandler);
    };
  }, [resizingData.initialX, resizingData.initialY, inputBoxInfo.visible]);

  useEffect(() => {
    setInputBoxInfo((prev) => ({ ...prev, visible: false }));
    setSelectedImageData((prev) => ({
      ...prev,
      image: null,
      x: null,
      y: null,
    }));
  }, [selected]);
  useEffect(() => {
    if (selectedImageData.image) {
      setImageDataInDOM((prev) => ({ ...prev, showOverview: true }));
    }
  }, [selectedImageData.image]);

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
              onMouseUp={handleResizingMouseUp}
            />
          </div>
        </Draggable>
      )}
      {selected === 102 && imageDatainDOM.showOverview ? (
        <SelectedImageHover {...selectedImageData} />
      ) : null}
      {imageDatainDOM.height && imageDatainDOM.width ? (
        <img
          id="domimage"
          src={selectedImageData.image}
          className="absolute bg-cover"
          style={{
            top: `${imageDatainDOM.top}px`,
            left: `${imageDatainDOM.left}px`,
            height: `${imageDatainDOM.height}px`,
            width: `${imageDatainDOM.width}px`,
          }}
          onMouseUp={handleDOMImageMouseUp}
          alt=""
        />
      ) : null}
    </div>
  );
};
export default Canvas;
