import { useState, useContext, useEffect } from 'react'
import Appstate from '../hooks/appstate'

const Canvas = () => {
  const { selected, selectedStyle, canvasData, setCanvasData, setUndoStack } =
    useContext(Appstate)
  const [isClicked, setIsClicked] = useState(false)
  const [[lastX, lastY], setLast] = useState([0, 0])
  let [dataSet, index] = canvasData
  const handleMouseDown = e => {
    setIsClicked(true)
    setLast([e.offsetX, e.offsetY])
  }
  const handleMouseUp = () => {
    setIsClicked(false)
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    // setUndoStack(prev => [...prev,imageData])
    setCanvasData(prev => {
      let [dataSet, index] = prev
      dataSet[index] = ctx.getImageData(0, 0, canvas.width, canvas.height)
      return [dataSet, index]
    })
  }
  const handleMouseOut = () => {
    setIsClicked(false)
  }
  const handleMouseEnter = () => {
    // setIsClicked(true)
  }
  const handleMouseMove = e => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const { offsetX, offsetY } = e.nativeEvent
    ctx.lineWidth = selectedStyle.size
    ctx.lineCap = 'round'

    if (isClicked) {
      if (selected === 101) {
        ctx.strokeStyle = `rgba(${selectedStyle.color.r},${selectedStyle.color.g},${selectedStyle.color.b},${selectedStyle.color.a})`

        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()

        setLast([offsetX, offsetY])
      } else if (selected === 103) {
        ctx.strokeStyle = 'white'

        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()

        setLast([offsetX, offsetY])
      }
    }
  }

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    dataSet[index]
      ? ctx.putImageData(dataSet[index], 0, 0)
      : ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [index, canvasData[0].length])

  return (
    <canvas
      className='shadow-md shadow-[#0000004b]'
      height={700}
      width={window.innerWidth - 400}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseOut}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    />
  )
}
export default Canvas
