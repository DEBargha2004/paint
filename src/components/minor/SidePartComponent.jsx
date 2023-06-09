import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { motion } from 'framer-motion'
import { Draggable } from 'react-beautiful-dnd'
import { addInUndoandRedo } from '../../functions/addInUndoandRedo'
import jsPDF from 'jspdf'

function SidePartComponent ({ Index }) {
  const { canvasData, setCanvasData, setUndoStack, setRedoStack,canvasDimensions } =
    useContext(Appstate)
  const [isHovering, setIsHovering] = useState(false)
  const [width, setWidth] = useState(0)
  const sideCanvas = useRef(null)
  const deleteIcon = useRef(null)
  const addSlideBefore = useRef(null)
  const downloadSlide = useRef(null)
  const {height:canvasHeight,width:canvasWidth} = canvasDimensions

  const changeSlide = e => {
    if (
      e.target !== deleteIcon.current &&
      e.target !== addSlideBefore.current &&
      e.target !== downloadSlide.current
    ) {
      setCanvasData(prev => {
        let [dataSet, index] = prev
        index = Index
        return [dataSet, index]
      })
    }
  }
  const handleDelete = () => {
    setCanvasData(prev => {
      let [dataSet, index] = prev
      dataSet.splice(Index, 1)
      if (index !== 0) {
        index--
      }
      return [dataSet, index]
    })

    addInUndoandRedo({setRedoStack,setUndoStack,Index,action:'delete'})
  }
  const handleAddSlideBefore = () => {
    setCanvasData(prev => {
      let [dataSet, index] = prev
      dataSet.splice(index, 0, null)
      index = index + 1
      return [dataSet, index]
    })
    addInUndoandRedo({setRedoStack,setUndoStack,Index,action:'add'})
  }
  const downloadClickedSlide = () => {
    const doc = new jsPDF({
      orientation:'landscape',
      unit:'px',
      format:[canvasWidth,canvasHeight]
    })

    const [dataSet] = canvasData

    const newCanvas = document.createElement('canvas')
    newCanvas.width = canvasWidth
    newCanvas.height = canvasHeight
    const newCtx = newCanvas.getContext('2d',{willReadFrequently:true})

    const imageData = dataSet[Index]
    imageData && newCtx.putImageData(imageData,0,0)
    const imageUrl = newCanvas.toDataURL()
     
    doc.addImage(imageUrl,'PNG',0,0,canvasWidth,canvasHeight)
    doc.save('slide.pdf')
  }
  useEffect(() => {
    setWidth(sideCanvas.current.clientWidth)
  }, [])

  useEffect(() => {
    const newCanvas = document.createElement('canvas')
    newCanvas.height = 700
    newCanvas.width = window.innerWidth - 400
    const newCtx = newCanvas.getContext('2d')
    canvasData[0][Index] && newCtx.putImageData(canvasData[0][Index], 0, 0)
    const image = new Image()
    image.src = newCanvas.toDataURL()
    sideCanvas.current.style.backgroundImage = `url(${image.src})`
  }, [canvasData, width])
  return (
    <Draggable draggableId={`Index${Index}`} index={Index}>
      {(provided, snapshot) => (
        <div
          className={`w-[80%] relative mb-2 shrink-0`}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className={`w-full z-10 shadow-md shadow-[#0000003b] ${
              snapshot.isDragging ? `bg-slate-50 scale-110` : `bg-white`
            } bg-cover  cursor-pointer relative rounded-lg overflow-hidden transition-all`}
            ref={sideCanvas}
            onClick={changeSlide}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              height: `${(700 / (window.innerWidth - 400)) * width}px`
            }}
          >
            {isHovering ? (
              <div className='absolute w-full flex justify-between items-center p-2 text-slate-500 bg-[#0000000e]'>
                <p>Slide {Index + 1}</p>
                <div className='w-1/4 flex justify-between'>
                <img
                    ref={downloadSlide}
                    src='https://cdn-icons-png.flaticon.com/512/54/54993.png'
                    alt=''
                    className='h-4 transition-all hover:scale-[1.15] active:scale-75'
                    onClick={downloadClickedSlide}
                  />
                  <img
                    ref={addSlideBefore}
                    src='https://cdn-icons-png.flaticon.com/512/9238/9238876.png'
                    alt=''
                    className='h-4 transition-all hover:scale-[1.15] active:scale-75'
                    onClick={handleAddSlideBefore}
                  />
                  <img
                    ref={deleteIcon}
                    src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png'
                    className='h-4 transition-all hover:scale-[1.15] active:scale-75'
                    alt=''
                    onClick={handleDelete}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div
            className={` absolute top-0 left-0 -z-10 w-full h-full  transition-all ${
              canvasData[1] === Index &&
              'border-l-4 -translate-x-1 border-fuchsia-600 rounded-xl'
            }`}
          />
        </div>
      )}
    </Draggable>
  )
}

export default SidePartComponent
