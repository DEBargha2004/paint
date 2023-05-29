import { useContext } from "react";
import Appstate from "../../hooks/appstate";
import { Alignment } from "../../assets/Tools";

function Aligner({ url, align, alignmentId }) {
  const {
    inputBoxInfo: { alignmentIndex },
    setInputBoxInfo,
  } = useContext(Appstate);
  return (
    <div
      className={`${
        alignmentIndex === alignmentId
          ? "bg-[#005eff5f]"
          : "hover:bg-[#005eff34]"
      } transition-all flex h-10 p-2 rounded-md mr-4`}
      onClick={() =>
        setInputBoxInfo((prev) => ({ ...prev, alignmentIndex: alignmentId }))
      }
    >
      <img src={url} alt="" />
    </div>
  );
}

export default Aligner;
