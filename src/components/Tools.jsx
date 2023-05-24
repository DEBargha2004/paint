import React from 'react'
import SketchTools from './SketchTools'
import Brush from './Brush'
import Size from './Size'
import Color from './Color'
import AddSlide from './AddSlide'

function Tools () {
  return (
    <div className='w-full p-2 flex sticky top-0 bg-white shadow-md shadow-[#00000015] z-10'>
      <AddSlide />
      <SketchTools />
      <Brush />
      <Size />
      <Color />
    </div>
  )
}

export default Tools
