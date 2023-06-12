import { useContext } from 'react'
import Appstate from '../../hooks/appstate'
import jsPDF from 'jspdf'
import {deepClone} from '../../functions/deepClone'

function Navbar () {
  const {
    undoStack,
    redoStack,
    canvasData,
    setHasUndoRedoPerformed,
    setUndoStack,
    setRedoStack,
    setCanvasData,
    canvasDimensions
  } = useContext(Appstate)
  let [dataSet, index] = canvasData
  const { height, width } = canvasDimensions
  const handleUndo = () => {
    const currentIndex = canvasData[1]
    const lastItemOfUndo = undoStack[currentIndex].slice(-1)[0]

    if (lastItemOfUndo) {
      setUndoStack(prev => {
        // prev = [...prev[currentIndex].slice(0,-1)]
        const clone = prev.map(stack => [...stack])
        clone[currentIndex] = clone[currentIndex].slice(0,-1)
        return [...clone]
      })
      setRedoStack(prev => {
        const clone = deepClone(prev)
        clone[currentIndex] = [...clone[currentIndex],lastItemOfUndo]
        return [...clone]
      })
      setCanvasData(prevCanvasData => {                           //removing
        let [dataSet, index] = prevCanvasData
        dataSet[index] = undoStack[currentIndex].slice(-2)[0]
        return [[...dataSet], index]
      })
      setHasUndoRedoPerformed(true)
    }
  }

  const handleRedo = () => {
    const currentIndex = canvasData[1]
    const lastItemOfRedo = redoStack[currentIndex].slice(-1)[0]
    if (lastItemOfRedo) {
      setRedoStack(prev => {
        const clone = prev.map(stack => [...stack])
        clone[currentIndex] = clone[currentIndex].slice(0,-1)
        return [...clone]
      })
      setUndoStack(prev => {
        const clone = deepClone(prev)
        clone[currentIndex] = [...clone[currentIndex],lastItemOfRedo]
        return [...clone]
      })
      setCanvasData(prevCanvasData => {                   // adding
        let [dataSet, index] = prevCanvasData
        dataSet[index] = lastItemOfRedo
        return [[...dataSet], index]
      })
      setHasUndoRedoPerformed(true)
    }
  }

  const handleDownload = () => {
    let [dataSet, index] = canvasData
    if (dataSet.length) {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [width, height]
      })
      dataSet.forEach((item, index) => {
        if (index !== 0) {
          doc.addPage()
        }
        const newCanvas = document.createElement('canvas')
        const newCtx = newCanvas.getContext('2d', { willReadFrequently: true })
        newCanvas.height = height
        newCanvas.width = width

        item && newCtx.putImageData(item, 0, 0)
        const imageUrl = newCanvas.toDataURL()

        doc.addImage(imageUrl, 'PNG', 0, 0, width, height)
      })

      doc.save('slides.pdf')
    }
  }

  return (
    <div className='flex p-2 z-10 bg-white box-border'>
      <img
        src='https://cdn-icons-png.flaticon.com/512/4573/4573479.png'
        className={`h-7 p-1 mr-2 transition-all rounded-md ${
          canvasData[0].length
            ? `cursor-pointer hover:bg-slate-200`
            : `cursor-not-allowed grayscale`
        }`}
        alt=''
        onClick={handleDownload}
      />
      <img
        src='https://cdn-icons-png.flaticon.com/512/3502/3502539.png'
        alt=''
        className={`h-7 p-1 transition-all mr-2 rounded-md ${
          undoStack[index]
            ? undoStack[index].length > 1
              ? `opacity-100 hover:bg-slate-200 cursor-pointer`
              : `opacity-20 cursor-not-allowed`
            : `opacity-20 cursor-not-allowed`
        }`}
        onClick={handleUndo}
      />
      <img
        src='https://cdn-icons-png.flaticon.com/512/3502/3502518.png'
        alt=''
        className={`h-7 p-1 mr-2 transition-all rounded-md ${
          redoStack[index]
            ? redoStack[index].length > 1
              ? `opacity-100 hover:bg-slate-200 cursor-pointer`
              : `opacity-20 cursor-not-allowed`
            : `opacity-20 cursor-not-allowed`
        }`}
        onClick={handleRedo}
      />
    </div>
  )
}

export default Navbar
