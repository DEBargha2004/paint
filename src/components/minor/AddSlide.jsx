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
    setHasUndoRedoPerformed,
    setSelected,
    selected
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

  const handleClick = () => {
    setSelected(401)
  }

  return (
    <ToolBoxWrapper right>
      <div className='flex h-[100px] pt-3'>
        <div className='flex justify-center items-start'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/3601/3601998.png'
            alt=''
            className={`h-14 mr-2 p-3 transition-all rounded-md cursor-pointer ${
              selected === 401 && `bg-slate-200`
            }`}
            onClick={handleClick}
          />
        </div>
        <div className='flex justify-center items-start'>
          <img
            src='	https://cdn-icons-png.flaticon.com/512/7163/7163714.png'
            alt=''
            className='h-16 mr-2 p-1 transition-all hover:scale-110 rounded-md cursor-pointer'
            onClick={addNewSlide}
          />
        </div>
      </div>
      <ToolBoxTitle>Add New</ToolBoxTitle>
    </ToolBoxWrapper>
  )
}

export default AddSlide
