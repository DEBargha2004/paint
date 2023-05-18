import React from 'react'
import SketchTools from './SketchTools'
import Brush from './Brush'
import Size from './Size'
import Color from './Color'

function Tools () {
  return (
    <div className='w-full p-2 flex'>
      <SketchTools />
      <Brush />
      <Size />
      <Color />
    </div>
  )
}

export default Tools
