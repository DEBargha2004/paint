import { useContext } from 'react'
import Appstate from '../../hooks/appstate'

function Navbar () {
  const {
    undoStack,
    redoStack,
    canvasData,
    setHasUndoRedoPerformed,
    setUndoStack,
    setRedoStack,
    setCanvasData
  } = useContext(Appstate)
  let [dataSet, index] = canvasData
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
    <div className='flex p-2 z-10 bg-white box-border'>
      <img
        src='https://cdn-icons-png.flaticon.com/512/3502/3502539.png'
        alt=''
        className={`h-7 p-1 transition-all mr-2 rounded-md cursor-pointer ${
          undoStack[index]
            ? undoStack[index].length > 1
              ? `opacity-100 hover:bg-slate-200`
              : `opacity-20 cursor-not-allowed`
            : `opacity-20 cursor-not-allowed`
        }`}
        onClick={handleUndo}
      />
      <img
        src='https://cdn-icons-png.flaticon.com/512/3502/3502518.png'
        alt=''
        className={`h-7 p-1 mr-2 transition-all rounded-md cursor-pointer ${
          redoStack[index]
            ? redoStack[index].length > 1
              ? `opacity-100 hover:bg-slate-200`
              : `opacity-20 cursor-not-allowed`
            : `opacity-20 cursor-not-allowed`
        }`}
        onClick={handleRedo}
      />
    </div>
  )
}

export default Navbar
