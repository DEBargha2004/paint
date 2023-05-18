import { useState } from 'react'

const Canvas = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [[lastX, lastY], setLast] = useState([0, 0])
  const handleMouseDown = e => {
    setIsClicked(true)
    setLast([e.offsetX, e.offsetY])
  }
  const handleMouseUp = () => {
    setIsClicked(false)
  }
  const handleMouseOut = () => {
    setIsClicked(false)
  }
  const handleMouseEnter = () => {
    // setIsClicked(true)
  }
  const handleMouseMove = e => {
    if (!isClicked) return
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    console.log(e)
    const { offsetX, offsetY } = e.nativeEvent

    ctx.lineWidth = 10
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'red'

    console.log(e)

    setLast([offsetX, offsetY])
  }
  return (
    <div className='w-full h-[500px] overflow-y-scroll border-2 border-red flex justify-center p-10'>
      <canvas
        id='canvasRef'
        className='border-[1px] border-[#00000021] w-full h-[800px] shadow-md shadow-[#0000004b]'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
      />
    </div>
  )
}
export default Canvas
