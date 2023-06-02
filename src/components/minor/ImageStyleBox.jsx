import { useContext } from "react";
import Appstate from "../../hooks/appstate";
import TextStyleBoxWrapper from "./TextStyleBoxWrapper";
import { ImageDecoList } from "../../assets/Tools";
import ImageDeco from "./ImageDeco";

function ImageStyleBox() {
  const { selected } = useContext(Appstate);
  return selected === 102 ? (
    <TextStyleBoxWrapper>
      {ImageDecoList.map((item, index) => {
        return <ImageDeco {...item} key={item.id} />;
      })}
    </TextStyleBoxWrapper>
  ) : null;
}

export default ImageStyleBox;
