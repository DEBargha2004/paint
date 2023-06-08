import { useContext } from "react";
import Appstate from "../../hooks/appstate";

function TextDeco({ url, decoration, decorationId }) {
  const {
    inputBoxInfo,
    setInputBoxInfo,
  } = useContext(Appstate);
  return (
    <div
      className={`${
        inputBoxInfo[decoration]
          ? "bg-[#005eff5f]"
          : "hover:bg-[#005eff34]"
      } transition-all flex h-10 p-2 rounded-md mx-2`}
      onClick={() =>
        setInputBoxInfo((prev) => ({ ...prev, [decoration] : !prev[decoration]}))
      }
    >
      <img src={url} alt="" />
    </div>
  );
}

export default TextDeco;
