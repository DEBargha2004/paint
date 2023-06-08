import { useContext } from 'react'
import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import Appstate from '../../hooks/appstate'
import { addInUndoandRedo } from '../../functions/addInUndoandRedo'

function AddSlide () {
  const {
    setUndoStack,
    setRedoStack,
    canvasData,
    undoStack,
    redoStack,
    setCanvasData,
    setHasUndoRedoPerformed
  } = useContext(Appstate)
  function addNewSlide () {
    setCanvasData(prev => {
      let [dataSet, index] = prev
      dataSet.push(null)
      return [dataSet, index]
    })

    addInUndoandRedo({
      setRedoStack,
      setUndoStack,
      Index: canvasData.length ? canvasData.length : 0,
      action: 'add'
    })
  }


  return (
    <ToolBoxWrapper right>
      <div className='h-[100px] flex justify-center items-center'>
        <img
          src='	https://cdn-icons-png.flaticon.com/512/7163/7163714.png'
          alt=''
          className='h-16 mr-2 p-1 transition-all hover:scale-110 rounded-md cursor-pointer'
          onClick={addNewSlide}
        />
      </div>
      <ToolBoxTitle>Add New</ToolBoxTitle>
    </ToolBoxWrapper>
  )
}

export default AddSlide
