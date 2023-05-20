import React, { useState, useContext } from 'react'
import Appstate from '../hooks/appstate'
import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import { sketchToolsUrl } from '../assets/Tools.js'

function SketchTools () {
  const { selected, setSelected } = useContext(Appstate)
  return (
    <ToolBoxWrapper right>
      <div className='h-full flex flex-col items-center justify-between'>
        <div className='grid grid-cols-3 w-fit h-[100px] transition-all p-2 gap-2'>
          {sketchToolsUrl.map((item, index) => (
            <div
              key={index}
              className={`p-2 px-[10px] flex justify-center items-center ${
                item.id === selected
                  ? 'rounded-md outline outline-1 outline-slate-400 bg-slate-100'
                  : ''
              } hover:bg-slate-100`}
              onClick={() => setSelected(item.id)}
            >
              <img src={item.url} className='h-6' />
            </div>
          ))}
        </div>
        <ToolBoxTitle>Tools</ToolBoxTitle>
      </div>
    </ToolBoxWrapper>
  )
}

export default SketchTools
