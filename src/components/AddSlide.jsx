import { useContext } from 'react'
import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import Appstate from '../hooks/appstate'

function AddSlide () {
  const { setCanvasData } = useContext(Appstate)
  function addNewSlide(){
    setCanvasData(prev => {
        let [dataSet,index] = prev
        dataSet.push(null)
        return ([dataSet,index])
    })
  }
  return (
    <ToolBoxWrapper right>
      <div className='h-[calc(100%-24px)] w-full flex justify-center items-center'>
        <div className='h-[60%] w-[50%] text-2xl text-slate-500 flex justify-center items-center shadow-sm shadow-[#0000004f] cursor-pointer transition-all active:scale-90' onClick={addNewSlide}>
          +
        </div>
      </div>
      <ToolBoxTitle>Add New</ToolBoxTitle>
    </ToolBoxWrapper>
  )
}

export default AddSlide
