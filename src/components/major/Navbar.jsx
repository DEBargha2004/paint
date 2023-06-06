import { useContext } from 'react'
import Appstate from '../../hooks/appstate'

function Navbar () {
  const {
    setUndoStack,
    setRedoStack,
    canvasData,
    undoStack,
    redoStack,
    setCanvasData,
    setHasUndoRedoPerformed
  } = useContext(Appstate)

  const handleUndo = () => {
    const currentIndex = canvasData[1]
    const lastItemOfUndo = undoStack[currentIndex].slice(-1)[0]
    if (lastItemOfUndo) {
      console.log(undoStack[0].length);
      setUndoStack(prev => {
        prev[currentIndex].pop()
        console.log('undoing...'); 
        return [...prev]
      })
      setRedoStack(prev => {
        prev[currentIndex].push(lastItemOfUndo)
        return [...prev]
      })
      console.log(undoStack[0].length)
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
    console.log(lastItemOfRedo,redoStack[currentIndex])
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
        console.log(redoStack);
        return [[...dataSet], index]
      })
      setHasUndoRedoPerformed(true)
    }
  }

  return (
    <div>
      <button
        className='p-2 border-[1px] border-[#00000050] m-2'
        onClick={handleUndo}
      >
        Undo
      </button>
      <button
        className='p-2 border-[1px] border-[#00000050] m-2'
        onClick={handleRedo}
      >
        Redo
      </button>
    </div>
  )
}

export default Navbar
