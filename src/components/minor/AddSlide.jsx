import { useContext } from 'react'
import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import Appstate from '../../hooks/appstate'
import { addInUndoandRedo } from '../../functions/addInUndoandRedo'

function AddSlide () {
  const { setCanvasData, setRedoStack, setUndoStack, canvasData } =
    useContext(Appstate)
  function addNewSlide () {
    setCanvasData(prev => {
      let [dataSet, index] = prev
      dataSet.push(null)
      return [dataSet, index]
    })

    addInUndoandRedo({
      setRedoStack,
      setUndoStack,
      Index: canvasData.length ? canvasData.length + 1 : 0,
      action:'add'
    })
  }
  return (
    <ToolBoxWrapper right>
      <div className='h-[100px] w-full flex justify-center items-center'>
        <div
          className='h-[70%] w-[50%] text-2xl text-slate-500 flex justify-center items-center shadow-sm shadow-[#0000004f] cursor-pointer transition-all active:scale-90'
          onClick={addNewSlide}
        >
          +
        </div>
      </div>
      <ToolBoxTitle>Add New</ToolBoxTitle>
    </ToolBoxWrapper>
  )
}

export default AddSlide
