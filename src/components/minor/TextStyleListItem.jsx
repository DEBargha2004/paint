import React, { useContext, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { fontStyles } from '../../assets/Tools'

function TextStyleListItem ({ stateKey, index, value, setIsOpen }) {
  const {
    inputBoxInfo: { fontFamilyIndex, lineHeightIndex },
    setInputBoxInfo
  } = useContext(Appstate)
  const [selected, setSelected] = useState({
    fontFamilyIndex: fontFamilyIndex === index,
    lineHeightIndex: lineHeightIndex === index
  })
  const handleChangeFontStyle = () => {
    setInputBoxInfo(prev => ({
      ...prev,
      [stateKey]: index
    }))
  }
  return (
    <div
      className={`relative ${
        selected[stateKey] ? 'bg-gray-100' : 'bg-white'
      } hover:bg-gray-100 cursor-pointer rounded-md my-1 min-w-[100px]`}
      style={{
        fontFamily: stateKey === 'fontFamilyIndex' ? fontStyles[index] : 'Arial'
      }}
      onClick={() => {
        handleChangeFontStyle(stateKey, index)
        setIsOpen(prev => !prev)
      }}
      onMouseEnter={()=>setInputBoxInfo(prev => ({...prev,[`temp_${stateKey}`] : index}))}
    >
      <div
        className={`${
          selected[stateKey]
            ? 'bg-purple-500 w-1 h-full my-auto rounded-md'
            : 'none'
        } absolute left-0 top-0`}
      />
      <p className='p-2'>
        {value == Number(value) ? value : value.split(',')[0]}
      </p>
    </div>
  )
}

export default TextStyleListItem
