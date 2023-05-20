import React, { useContext } from 'react'
import Appstate from '../hooks/appstate'
import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import { brush } from '../assets/Tools'

function Brush () {
  const { selected, setSelected } = useContext(Appstate)
  return (
    <ToolBoxWrapper right>
      <div className={`h-full flex flex-col justify-between items-center`}>
        {brush.map((item, index) => (
          <div
            key={index}
            className={`mt-6 p-1 ${
              selected === item.id &&
              'rounded-md outline outline-1 outline-slate-400 bg-slate-100 flex flex-col items-center justify-between'
            }`}
            onClick={() => setSelected(item.id)}
          >
            <img
              src={item.url}
              className='h-12 mx-auto hover:bg-slate-100 p-2'
              alt=''
            />
            <img
              src='https://cdn-icons-png.flaticon.com/512/2985/2985150.png'
              className='h-5 mt-2 mx-auto px-4 py-1 hover:bg-slate-100'
              alt=''
            />
          </div>
        ))}
        <ToolBoxTitle>Brushes</ToolBoxTitle>
      </div>
    </ToolBoxWrapper>
  )
}

export default Brush
