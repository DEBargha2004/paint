import React from 'react'
import Canvas from './Canvas'

function CanvasWrapper() {
  return (
    <div className='h-[800px] w-full p-10 flex justify-center items-center'>
        <Canvas />
    </div>
  )
}

export default CanvasWrapper