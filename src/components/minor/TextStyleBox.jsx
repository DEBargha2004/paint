import { useContext } from "react";
import Appstate from "../../hooks/appstate";
import {
  Alignment,
  fontStyles,
  lineHeight,
  textDecoration,
} from "../../assets/Tools";
import TextStyleBoxComponent from "./TextStyleBoxComponent";
import Aligner from "./Aligner";
import TextDeco from "./TextDeco";
import TextStyleBoxWrapper from "./TextStyleBoxWrapper";

function TextStyleBox() {
  const {
    selected,
    inputBoxInfo: { fontFamilyIndex, lineHeightIndex },
  } = useContext(Appstate);

  return selected === 104 ? (
    <TextStyleBoxWrapper>
      <TextStyleBoxComponent
        list={fontStyles}
        stateKey="fontFamilyIndex"
        value={fontStyles[fontFamilyIndex].split(",")[0]}
        min_width={190}
      />
      <TextStyleBoxComponent
        list={lineHeight}
        stateKey="lineHeightIndex"
        value={lineHeight[lineHeightIndex]}
        min_width={30}
      />
      {Alignment.map((item, index) => (
        <Aligner key={index} {...item} />
      ))}
      {textDecoration.map((item, index) => (
        <TextDeco key={index} {...item} />
      ))}
    </TextStyleBoxWrapper>
  ) : null;
}

export default TextStyleBox;
