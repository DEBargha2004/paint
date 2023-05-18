import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import ToolBoxWrapper from './ToolBoxWrapper'
import { colors } from '../assets/Tools'
import chroma from 'chroma-js'

function Color () {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 })
  const handleColorChange = selectedColor => {
    setColor(selectedColor.rgb)
  }
  return (
    <ToolBoxWrapper>
      <div className='flex'>
        <div className='flex justify-center items-center'>
          <div
            className='h-7 aspect-square rounded-full mx-3'
            style={{ backgroundColor: 'black' }}
          />
        </div>
        <div className='grid grid-cols-10 gap-3'>
          {colors.map((color, index) => (
            <div
              className={`h-6 w-6 rounded-full outline outline-1 outline-offset-1 outline-gray-300`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className='flex justify-center items-center'>
          <img
            className='h-10 mx-3'
            src='https://cdn-icons-png.flaticon.com/512/3124/3124925.png'
            alt=''
          />
        </div>
      </div>
    </ToolBoxWrapper>
  )
}

export default Color
