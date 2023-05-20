import React, { useEffect, useState, useRef, useContext } from 'react'
import Appstate from '../hooks/appstate'
import SidePartComponent from './SidePartComponent'

function SidePart () {
  const { canvasData } = useContext(Appstate)

  return (
    <div className='h-[93%] w-full flex flex-col items-center'>
      {canvasData[0].map((item, index) => {
        return (
          <SidePartComponent key={index} Index={index} />
        )
      })}
    </div>
  )
}

export default SidePart
