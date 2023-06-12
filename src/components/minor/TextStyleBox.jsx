import { useContext, useEffect } from 'react'
import Appstate from '../../hooks/appstate'
import {
  Alignment,
  fontStyles,
  lineHeight,
  textDecoration
} from '../../assets/Tools'
import TextStyleBoxComponent from './TextStyleBoxComponent'
import Aligner from './Aligner'
import TextDeco from './TextDeco'
import TextStyleBoxWrapper from './TextStyleBoxWrapper'

function TextStyleBox () {
  const {
    selected,
    inputBoxInfo: { fontFamilyIndex, lineHeightIndex },
    setInputBoxInfo
  } = useContext(Appstate)

  const handleKeyPress = e => {
    if (selected === 104) {
      const key = e.key
      // if (key === 'L') {
      //   setInputBoxInfo(prev => ({ ...prev, alignmentIndex: 0 }))
      // } else if (key === 'C') {
      //   setInputBoxInfo(prev => ({ ...prev, alignmentIndex: 1 }))
      // } else if (key === 'R') {
      //   setInputBoxInfo(prev => ({ ...prev, alignmentIndex: 2 }))
      // }else if(key === 'B'){
      //   setInputBoxInfo(prev => ({...prev,bold : !prev.bold}))
      // }else if(key === 'I'){
      //   setInputBoxInfo(prev => ({...prev,italic : !prev.italic}))
      // }else if(key === 'U'){
      //   setInputBoxInfo(prev => ({...prev,underline : !prev.underline}))
      // }else if(key === 'S'){
      //   setInputBoxInfo(prev => ({...prev,strikethrough : !prev.strikethrough}))
      // }else if(key === 'D'){
      //   setInputBoxInfo(prev => ({...prev,drag : !prev.drag}))
      // }
    }
  }
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [selected])

  return selected === 104 ? (
    <TextStyleBoxWrapper>
      <TextStyleBoxComponent
        list={fontStyles}
        stateKey='fontFamilyIndex'
        value={fontStyles[fontFamilyIndex].split(',')[0]}
        min_width={190}
      />
      <TextStyleBoxComponent
        list={lineHeight}
        stateKey='lineHeightIndex'
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
  ) : null
}

export default TextStyleBox
