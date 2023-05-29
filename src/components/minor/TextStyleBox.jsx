import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { Alignment, fontStyles, lineHeight } from '../../assets/Tools'
import TextStyleBoxComponent from './TextStyleBoxComponent'
import Aligner from './Aligner'

function TextStyleBox () {
  const {
    selected,
    inputBoxInfo: { fontFamilyIndex, lineHeightIndex },
    setInputBoxInfo
  } = useContext(Appstate)

  return selected === 104 ? (
    <div className='flex justify-end items-center z-20'>
      <div
        style={{
          width: window.innerWidth - 400,
          marginRight: '39px'
        }}
        className='absolute h-fit flex bottom-[-50px] justify-start items-center p-3 bg-gray-50 rounded-lg shadow-lg shadow-[#0000003f] z-20'
      >
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
          min_width = {30}
        />
        {
          Alignment.map((item,index)=>(
            <Aligner key={index} {...item} />
          ))
        }
      </div>
    </div>
  ) : null
}

export default TextStyleBox
