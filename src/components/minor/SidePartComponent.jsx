import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'

function SidePartComponent ({ Index }) {
  const { canvasData, setCanvasData } = useContext(Appstate)
  const [isHovering, setIsHovering] = useState(false)
  const [width, setWidth] = useState(0)
  const sideCanvas = useRef(null)

  const changeSlide = () => {
    setCanvasData(prev => {
      let [dataSet, index] = prev
      index = Index
      return [dataSet, index]
    })
  }
  const handleDelete = () => {
    setCanvasData(prev => {
      let [dataSet, index] = prev
      dataSet.splice(Index, 1)
      return [dataSet, index]
    })
  }
  const handleDrag = e => {
    e.dataTransfer.setData("slide",Index)
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
    <div
      draggable
      onDrag={handleDrag}
      // onDragEnter={(e)=>console.log(e.target)}
      onDragLeave={e => console.log(e.target)}
      className='w-[80%] shadow-md shadow-[#0000003b] bg-contain bg-no-repeat cursor-pointer shrink-0 relative rounded-lg overflow-hidden mb-2'
      style={{ height: `${(700 / (window.innerWidth - 400)) * width}px` }}
      ref={sideCanvas}
      onClick={changeSlide}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <div className='absolute w-full flex justify-between items-center p-2 text-slate-500 bg-[#0000000e]'>
          <p>Slide {Index + 1}</p>
          <img
            src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png'
            className='h-4'
            alt=''
            onClick={handleDelete}
          />
        </div>
      ) : null}
    </div>
  )
}

export default SidePartComponent
