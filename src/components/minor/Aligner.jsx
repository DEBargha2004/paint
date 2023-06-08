import { useContext } from "react";
import Appstate from "../../hooks/appstate";

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
      } transition-all flex h-10 p-2 rounded-md mx-2`}
      onClick={() =>
        setInputBoxInfo((prev) => ({ ...prev, alignmentIndex: alignmentId }))
      }
    >
      <img src={url} alt="" />
    </div>
  );
}

export default Aligner;
