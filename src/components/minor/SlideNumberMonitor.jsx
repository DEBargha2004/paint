import { useContext } from "react";
import Appstate from "../../hooks/appstate";

function SlideNumberMonitor() {
  const {
    canvasData: [dataSet, index],
  } = useContext(Appstate);
  return (
    <div className="w-full text-lg text-slate-500 text-left pl-5 pb-4 sticky top-0 z-20">
      Slide {index + 1} / {dataSet.length}
    </div>
  );
}

export default SlideNumberMonitor;
