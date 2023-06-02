import { useContext, useRef } from "react";
import Appstate from "../../hooks/appstate";
import ToolBoxWrapper from "./ToolBoxWrapper";
import ToolBoxTitle from "./ToolBoxTitle";
import { sketchToolsUrl, addImage } from "../../assets/Tools.js";

function SketchTools() {
  const { selected, setSelected, setSelectedImageData } = useContext(Appstate);
  const imageInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setSelectedImageData((prev) => ({ ...prev, image: fileReader.result }));
      imageInputRef.current.value = null;
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <ToolBoxWrapper right>
      <div className="h-full flex flex-col items-center justify-between">
        <div className="grid grid-cols-3 w-fit h-[100px] transition-all p-2 gap-2">
          {sketchToolsUrl.map((item, index) => (
            <div
              key={index}
              className={`p-2 px-[10px] flex justify-center items-center ${
                item.id === selected
                  ? "rounded-md outline outline-1 outline-slate-400 bg-slate-100"
                  : ""
              } hover:bg-slate-100`}
              onClick={() => setSelected(item.id)}
            >
              <img src={item.url} className="h-6" />
            </div>
          ))}
          {addImage.map((item, index) => (
            <div
              key={index}
              className={`p-2 px-[10px] flex justify-center items-center ${
                item.id === selected
                  ? "rounded-md outline outline-1 outline-slate-400 bg-slate-100"
                  : ""
              } hover:bg-slate-100`}
              onClick={() => setSelected(item.id)}
            >
              <input
                ref={imageInputRef}
                type="file"
                hidden
                name=""
                id="select-img"
                onChange={handleImageChange}
              />
              <label htmlFor="select-img">
                <img src={item.url} className="h-6" />
              </label>
            </div>
          ))}
        </div>
        <ToolBoxTitle>Tools</ToolBoxTitle>
      </div>
    </ToolBoxWrapper>
  );
}

export default SketchTools;
