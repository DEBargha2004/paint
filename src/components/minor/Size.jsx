import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { size } from '../../assets/Tools'

function Size () {
  const { selected, setSelectedStyle, selectedStyle } = useContext(Appstate)
  const [showList, setShowList] = useState(false)
  const [max, setMax] = useState(1)
  const sizeRef = useRef(null)
  const handleSizeChange = e => {
    setSelectedStyle(prev => ({ ...prev, size: e.target.value }))
  }
  useEffect(() => {
    if (!selected) return

    const maxRange = () => {
      if (selected === 2011) {
        return 4
      } else if (selected === '201b') {
        return 8
      } else if (selected === '201c') {
        return 1
      } else if (selected === 101) {
        return 16
      } else if (selected === 103 || selected === 104) {
        return 100
      } else if (selected === 2014) {
        return 100
      } else if (selected === 105) {
        return 1
      }
    }
    setMax(maxRange)
  }, [selected])
  useEffect(() => {
    const handleListClose = e => {
      if (!sizeRef.current.contains(e.target)) {
        setShowList(false)
      }
    }
    document.addEventListener('click', handleListClose)
  }, [])
  return (
    <ToolBoxWrapper right>
      <div
        ref={sizeRef}
        className={`h-full flex flex-col justify-between items-center px-3 relative ${
          (selected === 105 || selected === 102 || !selected) &&
          `cursor-not-allowed opacity-40`
        }`}
      >
        <div
          className={`mt-6 p-1 ${
            !(selected === 102 || selected === 105 || !selected) &&
            `hover:bg-slate-100`
          } ${
            showList &&
            'rounded-md outline outline-1 outline-slate-400 bg-slate-100 flex flex-col justify-center items-center'
          }`}
          onClick={() => {
            setShowList(prev => {
              if (!(selected === 102 || selected === 105 || !selected)) return !prev
            })
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
        {showList && (selected !== 105 || selected !== 102) ? (
          <div className='absolute z-10 bottom-[-10px] text-black w-fit p-4 rounded-lg bg-white border-[1px] border-[#00000036]'>
            <input
              type='range'
              max={max}
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
                {max}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </ToolBoxWrapper>
  )
}

export default Size
