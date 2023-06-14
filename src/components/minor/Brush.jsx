import React, { useContext, useEffect, useRef, useState } from "react";
import Appstate from "../../hooks/appstate";
import ToolBoxWrapper from "./ToolBoxWrapper";
import ToolBoxTitle from "./ToolBoxTitle";
import { brush, brushList } from "../../assets/Tools";

function Brush() {
  const { selected, setSelected } = useContext(Appstate);
  const [showList, setShowList] = useState(false);
  const brushRef = useRef(null);
  useEffect(() => {
    const handleClickedOutside = (e) => {
      if (!brushRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("click", handleClickedOutside);
  }, []);
  return (
    <ToolBoxWrapper right>
      <div className={`h-full flex flex-col justify-between items-center`}>
        {brush.map((item, index) => (
          <div
            ref={brushRef}
            key={index}
            className={`relative w-fit mt-6 p-1 ${
              (selected === 2011 || selected === 2014) &&
              "rounded-md outline outline-1 outline-slate-400 bg-slate-100 flex flex-col items-center justify-between"
            }`}
          >
            <img
              src={item.url}
              className="h-12 mx-auto hover:bg-slate-100 p-2"
              alt=""
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
              className="h-5 mt-2 mx-auto px-4 py-1 hover:bg-slate-100"
              alt=""
              onClick={() => {
                setShowList((prev) => !prev);
              }}
            />
            {showList ? (
              <div className="absolute top-[108px] z-50 shadow-sm shadow-[#00000069] bg-white rounded-lg">
                {brushList.map((item, index) => (
                  <div
                    key={index}
                    className={`w-[150px] py-2 hover:bg-gray-200 cursor-pointer uppercase text-slate-500 font-medium flex justify-center items-center ${
                      selected === item.id ? `bg-gray-200` : ``
                    }`}
                    onClick={() => {
                      setSelected(item.id);
                      setShowList(false);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <ToolBoxTitle>Brushes</ToolBoxTitle>
      </div>
    </ToolBoxWrapper>
  );
}

export default Brush;
