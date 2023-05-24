import React, { useContext, useState } from 'react'
import Appstate from '../hooks/appstate'
import { SketchPicker } from 'react-color'
import ToolBoxWrapper from './ToolBoxWrapper'
import { colors } from '../assets/Tools'
import chroma from 'chroma-js'
import { rgba } from '../functions/rgba'

function Color () {
  const { selectedStyle, setSelectedStyle } = useContext(Appstate)
  const [colorWheelClicked, setColorWheelClicked] = useState(false)
  const handleColorChange = color => {
    setSelectedStyle(prev => ({...prev,color:color.rgb}))
  }
  const handleClose = e => {
    if (e.target === e.currentTarget) setColorWheelClicked(false)
  }
  return (
    <ToolBoxWrapper>
      <div className='flex mt-6'>
        <div className='flex justify-center items-center'>
          <div
            className='h-10 aspect-square rounded-full mx-3'
            style={{
              backgroundColor: rgba(selectedStyle.color)
            }}
          />
        </div>
        <div className='grid grid-cols-10 gap-3'>
          {colors.map((color, index) => (
            <div
            key={index}
              className={`h-6 w-6 rounded-full outline outline-1 outline-offset-1 ${selectedStyle.color === color ? 'outline-gray-800' : 'outline-gray-300'}`}
              style={{
                backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`
              }}
              onClick={()=>setSelectedStyle(prev => ({...prev,color}))}
            />
          ))}
        </div>
        <div
          className='flex justify-center items-center'
          onClick={() => setColorWheelClicked(true)}
        >
          <img
            className='h-10 mx-3'
            src='https://cdn-icons-png.flaticon.com/512/3124/3124925.png'
            alt=''
          />
        </div>
      </div>
      {colorWheelClicked ? (
        <div
          className='absolute w-full h-[100vh] left-0 top-0 flex justify-center items-center z-10 bg-[#00000033]'
          onClick={handleClose}
        >
          <SketchPicker color={selectedStyle.color} onChange={handleColorChange} />
        </div>
      ) : null}
    </ToolBoxWrapper>
  )
}

export default Color
