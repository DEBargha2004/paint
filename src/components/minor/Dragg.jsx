import React, { useRef, useState } from 'react'

function Dragg ({ children, dragevent, position, cancel, }) {
  const dragRef = useRef(null)
  const [dragEvents, setDragEvents] = useState({
    mousePress: false,
    mouseLeft: false,
    pageX: null,
    pageY: null,
    changeX: null,
    changeY: null,
    left: null,
    top: null,
    drag: true
  })
  const handlemousedown = e => {
    cancel.forEach((item, index) => {
      const resizerInCurrentTarget = item ?  e.currentTarget.querySelector(item) : item
      const target = e.target
      if (target === resizerInCurrentTarget) {
        setDragEvents(prev => ({ ...prev, drag: false }))
      }
    })

    setDragEvents(prev => ({
      ...prev,
      mousePress: true,
      mouseLeft: false,
      pageX: e.pageX,
      pageY: e.pageY
    }))
  }
  const handleMouseMove = e => {
    if (dragEvents.mousePress && !dragEvents.mouseLeft && dragEvents.drag) {
      const { pageX, pageY } = e
      console.log(pageX,pageY);

      const changeX = pageX - dragEvents.pageX
      const changeY = pageY - dragEvents.pageY

      const top = dragRef.current.offsetTop
      const left = dragRef.current.offsetLeft

      console.log(dragevent);

      setDragEvents(prev => ({
        ...prev,
        pageX,
        pageY,
        changeX,
        changeY,
        left,
        top
      }))

      dragevent({
        changeX,
        changeY,
        pageX,
        pageY,
        top,
        left
      })
    }
  }

  return (
    <div
      ref={dragRef}
      onMouseDown={handlemousedown}
      onMouseEnter={() => setDragEvents(prev => ({ ...prev, drag: true }))}
      onMouseUp={() => {
        setDragEvents(prev => ({ ...prev, mousePress: false, drag: true }))
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() =>
        setDragEvents(prev => ({ ...prev, mouseLeft: true, drag: false }))
      }
      onDragStart={e => e.preventDefault()}
      style={{
        height: children.props.style.height,
        width: children.props.style.width,
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`
      }}
    >
      {children}
    </div>
  )
}

export default Dragg
