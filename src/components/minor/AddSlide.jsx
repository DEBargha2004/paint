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

  const handleUndo = () => {
    const currentIndex = canvasData[1]
    const lastItemOfUndo = undoStack[currentIndex].slice(-1)[0]
    if (lastItemOfUndo) {
      console.log(undoStack[0].length)
      setUndoStack(prev => {
        prev[currentIndex].pop()
        return [...prev]
      })
      console.log(undoStack[0].length)
      setRedoStack(prev => {
        prev[currentIndex].push(lastItemOfUndo)
        return [...prev]
      })
      setCanvasData(prevCanvasData => {
        let [dataSet, index] = prevCanvasData
        dataSet[index] = undoStack[currentIndex].slice(-1)[0]
        // console.log(undoStack[currentIndex].slice(-1)[0],undoStack)
        return [[...dataSet], index]
      })
      setHasUndoRedoPerformed(true)
    }
  }

  const handleRedo = () => {
    const currentIndex = canvasData[1]
    const lastItemOfRedo = redoStack[currentIndex].slice(-1)[0]
    console.log(lastItemOfRedo, redoStack[currentIndex])
    if (lastItemOfRedo) {
      setRedoStack(prev => {
        prev[currentIndex].pop()
        return [...prev]
      })
      setUndoStack(prev => {
        prev[currentIndex].push(lastItemOfRedo)
        return [...prev]
      })
      setCanvasData(prevCanvasData => {
        let [dataSet, index] = prevCanvasData
        dataSet[index] = lastItemOfRedo
        console.log(redoStack)
        return [[...dataSet], index]
      })
      setHasUndoRedoPerformed(true)
    }
  }
  return (
    <ToolBoxWrapper right>
      <div className='h-[100px] flex justify-center items-center'>
        <img
          src='	https://cdn-icons-png.flaticon.com/512/3502/3502539.png'
          alt=''
          className='h-10 transition-all hover:bg-slate-200 p-2 rounded-md cursor-pointer'
          onClick={handleUndo}
        />
        <img
          src='https://cdn-icons-png.flaticon.com/512/3502/3502518.png'
          alt=''
          className='h-10 mr-2 transition-all hover:bg-slate-200 p-2 rounded-md cursor-pointer'
          onClick={handleRedo}
        />

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
