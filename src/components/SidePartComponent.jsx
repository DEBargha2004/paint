import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../hooks/appstate'

function SidePartComponent ({ Index }) {
  const { canvasData, setCanvasData } = useContext(Appstate)
  const [width, setWidth] = useState(0)
  const sideCanvas = useRef(null)

  const changeSlide = () => {
    setCanvasData(prev => {
      let [dataSet, index] = prev
      index = Index
      return [dataSet, index]
    })
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
    console.log(image.width,image.height,window.innerHeight);
    sideCanvas.current.style.backgroundImage = `url(${image.src})`
  }, [canvasData, width])
  return (
    <div
      className='w-[80%] shadow-md shadow-[#0000003b] bg-contain bg-no-repeat cursor-pointer'
      style={{ height: `${(700 / (window.innerWidth - 400)) * width}px` }}
      ref={sideCanvas}
      onClick={changeSlide}
    />
  )
}

export default SidePartComponent
