import { useContext } from "react";
import SidePart from "../minor/SidePart";
import Appstate from "../../hooks/appstate";
import CanvasWrapper from "../minor/CanvasWrapper";

function LowerBody() {
  const { canvasData } = useContext(Appstate);
  return (
    <div className="h-[800px] w-full p-10 pt-0 pl-0 flex justify-center items-center">
      <SidePart />
      <CanvasWrapper />
    </div>
  );
}

export default LowerBody;
