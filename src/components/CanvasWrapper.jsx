import {useContext} from 'react'
import Canvas from './Canvas'
import SidePart from './SidePart'
import Appstate from '../hooks/appstate'

function CanvasWrapper() {
  const {canvasData} = useContext(Appstate)
  return (
    <>
    <div className='w-full flex  justify-center text-lg text-slate-500'>
      Slide{canvasData[1] + 1}
    </div>
    <div className='h-[800px] w-full p-10 pt-0 pl-0 flex justify-center items-center'>
        <SidePart />
        <Canvas />
    </div>
    </>
  )
}

export default CanvasWrapper