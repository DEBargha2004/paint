import { useContext } from 'react'
import Canvas from './Canvas'
import Appstate from '../hooks/appstate'

function CanvasWrapper () {
  const { canvasData } = useContext(Appstate)
  return (
    <div className='rounded-lg h-fit w-fit overflow-hidden shrink-0 shadow-lg shadow-[#0000002a]'>
      <div className='w-full flex p-2 justify-center text-lg text-slate-500 bg-[#00000018]'>
        Slide {canvasData[1] + 1}
      </div>
      <Canvas />
    </div>
  )
}

export default CanvasWrapper
