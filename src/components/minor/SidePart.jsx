import { useEffect, useState, useRef, useContext } from "react";
import Appstate from "../../hooks/appstate";
import SidePartComponent from "./SidePartComponent";
import SlideNumberMonitor from "./SlideNumberMonitor";

function SidePart() {
  const { canvasData, setCanvasData } = useContext(Appstate);
  const [{ s1, s2 }, setSlideSwap] = useState({ s1: null, s2: null });
  const handleDragOver = (e) => {
    // console.log('dragging over',e)
  };
  const handleDrop = (e) => {
    console.log(e);
  };
  const handleSwap = () => {
    if (s1 && s2) {
      let [slides] = canvasData;
      if (s1 <= slides.length && s2 <= slides.length) {
        setCanvasData((prev) => {
          let [slides, index] = prev;
          let slide1 = slides[s1-1];
          let slide2 = slides[s2-1];
          slides[s1-1] = slide2;
          slides[s2-1] = slide1;
          return [slides, index];
        });
      }
    }
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="h-[93%] mt-10 w-full flex flex-col items-center overflow-y-scroll"
    >
      {/* <SlideNumberMonitor /> */}
      <div className="flex justify-around items-center w-[90%] pb-5 mb-4 sticky top-0 z-20 bg-white">
        <input
          type="number"
          name=""
          id=""
          min="0"
          max={canvasData[0].length}
          className="outline-none border-2 border-slate-400 rounded-full text-slate-400 w-20 h-8 text-center"
          onChange={(e) => {
            setSlideSwap((prev) => ({ ...prev, s1: e.target.value }));
          }}
        />
        <input
          type="number"
          name=""
          id=""
          min="0"
          max={canvasData[0].length}
          className="outline-none border-2 border-slate-400 rounded-full text-slate-400 w-20 h-8 text-center"
          onChange={(e) => {
            setSlideSwap((prev) => ({ ...prev, s2: e.target.value }));
          }}
        />
        <button
          className="transition-all bg-slate-300 hover:bg-gray-500 px-3 py-[6px] hover:text-white active:scale-90 rounded-full"
          onClick={handleSwap}
        >
          Swap
        </button>
      </div>
      {canvasData[0].map((item, index) => {
        return <SidePartComponent key={index} Index={index} />;
      })}
    </div>
  );
}

export default SidePart;
