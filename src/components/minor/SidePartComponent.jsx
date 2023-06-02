import { useContext, useEffect, useRef, useState } from "react";
import Appstate from "../../hooks/appstate";
import { motion } from "framer-motion";

function SidePartComponent({ Index }) {
  const { canvasData, setCanvasData } = useContext(Appstate);
  const [isHovering, setIsHovering] = useState(false);
  const [width, setWidth] = useState(0);
  const sideCanvas = useRef(null);
  const deleteIcon = useRef(null);

  const changeSlide = (e) => {
    if (e.target !== deleteIcon.current) {
      setCanvasData((prev) => {
        let [dataSet, index] = prev;
        index = Index;
        return [dataSet, index];
      });
    }
  };
  const handleDelete = () => {
    setCanvasData((prev) => {
      let [dataSet, index] = prev;
      dataSet.splice(Index, 1);
      if (index !== 0) {
        index--;
      }
      console.log("Index is", index);
      return [dataSet, index];
    });
  };
  useEffect(() => {
    setWidth(sideCanvas.current.clientWidth);
  }, []);

  useEffect(() => {
    const newCanvas = document.createElement("canvas");
    newCanvas.height = 700;
    newCanvas.width = window.innerWidth - 400;
    const newCtx = newCanvas.getContext("2d");
    canvasData[0][Index] && newCtx.putImageData(canvasData[0][Index], 0, 0);
    const image = new Image();
    image.src = newCanvas.toDataURL();
    sideCanvas.current.style.backgroundImage = `url(${image.src})`;
  }, [canvasData, width]);
  return (
    <div
      className="w-[80%] relative mb-2 shrink-0"
      style={{ height: `${(700 / (window.innerWidth - 400)) * width}px` }}
    >
      <motion.div
        layout
        className="w-full h-full z-10 shadow-md bg-white shadow-[#0000003b] bg-contain  cursor-pointer relative rounded-lg overflow-hidden"
        ref={sideCanvas}
        onClick={changeSlide}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering ? (
          <div className="absolute w-full flex justify-between items-center p-2 text-slate-500 bg-[#0000000e]">
            <p>Slide {Index + 1}</p>
            <img
              ref={deleteIcon}
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
              className="h-4"
              alt=""
              onClick={handleDelete}
            />
          </div>
        ) : null}
      </motion.div>
      <div
        className={` absolute top-0 left-0 -z-10 w-full h-full  transition-all ${
          canvasData[1] === Index && "border-l-4 -translate-x-1 border-fuchsia-600 rounded-xl"
        }`}
      />
    </div>
  );
}

export default SidePartComponent;
