import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import { useContext, useState } from 'react'
import Appstate from '../hooks/appstate'
import { size } from '../assets/Tools'

function Size () {
  const { selected, setSelected, setSelectedStyle, selectedStyle } =
    useContext(Appstate)
  const handleSizeChange = e => {
    setSelectedStyle(prev => ({ ...prev, size: e.target.value }))
  }
  return (
    <ToolBoxWrapper right>
      <div className='h-full flex flex-col justify-between items-center px-3 relative'>
        <div
          className={`mt-6 p-1 hover:bg-slate-100 ${
            selected === size[0].id &&
            'rounded-md outline outline-1 outline-slate-400 bg-slate-100 flex flex-col justify-center items-center'
          }`}
          onClick={() => {
            setSelected(size[0].id)
          }}
        >
          <img src={size[0].url} alt='' className='h-10' />
          <img
            src='https://cdn-icons-png.flaticon.com/512/2985/2985150.png'
            className='h-4 mt-2 mx-auto'
            alt=''
          />
        </div>
        <ToolBoxTitle>Size</ToolBoxTitle>
        {selected === size[0].id ? (
          <div className='absolute bottom-[-20px] text-black w-fit p-4 rounded-lg  bg-white border-[1px] border-[#00000036]'>
            <input
              type='range'
              max={100}
              min={1}
              value={selectedStyle.size}
              onChange={handleSizeChange}
            />
            <div className='w-full flex justify-between items-center'>
              <div className='h-6 px-1 rounded-md flex justify-center items-center bg-blue-700 text-white'>
                1
              </div>
              <div className=' h-6 px-1 rounded-md flex justify-center items-center bg-blue-700 text-white'>
                {selectedStyle.size}
              </div>
              <div className=' h-6 px-1 rounded-md flex justify-center items-center bg-blue-700 text-white'>
                100
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </ToolBoxWrapper>
  )
}

export default Size
