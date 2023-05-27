import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { Select, MenuItem } from '@mui/material'
import { fontStyles, lineHeight } from '../../assets/Tools'
import TextStyleBoxComponent from './TextStyleBoxComponent'

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
        />
        <TextStyleBoxComponent
          list={lineHeight}
          stateKey='lineHeightIndex'
          value={lineHeight[lineHeightIndex]}
        />
        {/* <FontFamily />
        <LineHeight /> */}
      </div>
    </div>
  ) : null
}

export default TextStyleBox
