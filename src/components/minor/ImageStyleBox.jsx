import { useContext, useEffect } from "react";
import Appstate from "../../hooks/appstate";
import TextStyleBoxWrapper from "./TextStyleBoxWrapper";
import { ImageDecoList } from "../../assets/Tools";
import ImageDeco from "./ImageDeco";

function ImageStyleBox() {
  const { selected, setImageDataInDOM } = useContext(Appstate);
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log(selected, e.key);
      if (selected === 102) {
        console.log(e.key);
        if (e.key === "B") {
          setImageDataInDOM((prev) => ({ ...prev, boundary: !prev.boundary }));
        }
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [selected, setImageDataInDOM]);
  return selected === 102 ? (
    <TextStyleBoxWrapper>
      {ImageDecoList.map((item, index) => {
        return <ImageDeco {...item} key={item.id} />;
      })}
    </TextStyleBoxWrapper>
  ) : null;
}

export default ImageStyleBox;
