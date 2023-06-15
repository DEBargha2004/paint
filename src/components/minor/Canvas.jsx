import { useState, useContext, useEffect, useRef } from 'react'
import Appstate from '../../hooks/appstate'
import { rgba } from '../../functions/rgba'
import chroma from 'chroma-js'
import { position } from '../../functions/position'
import { print_MultilineText } from '../../functions/multilineText'
import { Alignment, fontStyles, lineHeight } from '../../assets/Tools'
import SelectedImageHover from './selectedImageHover'
import resizer from '../../assets/resizer.png'
import FloodFill from 'q-floodfill'
import { compareImage } from '../../functions/compareImage'
import Dragg from './Dragg'
import { isNumber } from '../../functions/isNumber'
import DomToImage from 'dom-to-image'
import { hasData } from '../../functions/hasData'
import { deepClone } from '../../functions/deepClone'

const Canvas = () => {
  const {
    selected,
    setSelected,
    selectedStyle,
    setSelectedStyle,
    canvasData,
    setCanvasData,
    setUndoStack,
    setRedoStack,
    redoStack,
    inputBoxInfo,
    setInputBoxInfo,
    selectedImageData,
    setSelectedImageData,
    imageDataInDOM,
    setImageDataInDOM,
    isSwapped,
    setIsSwapped,
    hasUndoRedoPerformed,
    setHasUndoRedoPerformed
  } = useContext(Appstate)

  const [isMouseDown, setIsMouseDown] = useState(false)
  const [[lastX, lastY], setLast] = useState([0, 0])
  const [resizingData, setResizingData] = useState({
    initialX: null,
    initialY: null
  })
  const [selection, setSelection] = useState({
    mousePress: false,
    initialize: false,
    initialY: null,
    initialX: null,
    finalY: null,
    finalX: null
  })

  const resizingDataRef = useRef({
    initialX: null,
    initialY: null
  })

  const InputBox = useRef(null)
  const isVisible = useRef(false)
  const resizing = useRef(false)
  const canvasRef = useRef(null)

  let [dataSet, index] = canvasData

  const handleMouseDown = e => {
    console.log('triggered in handleMouseDown')
    const { offsetX, offsetY, pageX, pageY } = e.nativeEvent
    setIsMouseDown(true)
    setLast([offsetX, offsetY])
    setResizingData(prev => ({
      ...prev,
      initialX: pageX,
      initialY: pageY
    }))
    if (selectedImageData.image) {
      if (!imageDataInDOM.height && !imageDataInDOM.width) {
        setImageDataInDOM(prev => ({
          ...prev,
          initialX: pageX,
          initialY: pageY,
          top: offsetY,
          left: offsetX,
          enableResizing: true
        }))
      }
    } else if (selected === 401) {
      setSelection(prev => ({
        ...prev,
        initialize: true,
        mousePress: true,
        initialX: offsetX,
        initialY: offsetY
      }))
    }
  }

  const handleMouseUp = e => {
    console.log('triggered in handleMouseUp')
    setIsMouseDown(false)
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (
      selected === 101 ||
      selected === 103 ||
      selected === 104 ||
      !selected ||
      selected === 2011 ||
      selected === 2014
    ) {
      console.log('mouse is up in handle mouseup meeting conditions')
      saveCanvasData({ canvas, ctx })
    }

    resizing.current = false
    if (selectedImageData.image) {
      setImageDataInDOM(prev => ({
        ...prev,
        enableResizing: false,
        showOverview: false,
        isOverViewing: false
      }))
    }
    if (selected === 401 && !selectedImageData.image) {
      const left =
        selection.initialX < selection.finalX
          ? selection.initialX
          : selection.finalX
      const top =
        selection.initialY < selection.finalY
          ? selection.initialY
          : selection.finalY

      const width = Math.abs(selection.initialX - selection.finalX)
      const height = Math.abs(selection.initialY - selection.finalY)

      const imageData = ctx.getImageData(left, top, width, height)

      const newCanvas = document.createElement('canvas')
      const newCtx = newCanvas.getContext('2d')
      newCanvas.width = width
      newCanvas.height = height
      newCtx.putImageData(imageData, 0, 0)
      const imageUrl = newCanvas.toDataURL()

      // ctx.fillStyle = 'white'
      // ctx.fillRect(left, top, width, height)

      setSelectedImageData(prev => ({
        ...prev,
        image: imageUrl,
        x: left,
        y: top,
        naturalWidth: width,
        natiralHeight: height
      }))
      setImageDataInDOM(prev => ({
        ...prev,
        height,
        width,
        left,
        top,
        getting_used: true
      }))
      setSelection(prev => ({ ...prev, mousePress: false }))
    }
  }

  const handleMouseMove = e => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const { offsetX, offsetY, pageX, pageY } = e.nativeEvent
    ctx.lineWidth = selectedStyle.size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (isMouseDown) {
      if (selected === 101) {
        ctx.strokeStyle = rgba(selectedStyle.color)

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
      } else if (selected === 2011) {
        const selectedColor = chroma(rgba(selectedStyle.color))
        const strokeColor = selectedColor.brighten(1)
        ctx.strokeStyle = strokeColor.hex()
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()

        setLast([offsetX, offsetY])
      } else if (selected === 2014) {
        // spray
        const density = 15
        ctx.fillStyle = rgba(selectedStyle.color)

        for (let i = 0; i < density; i++) {
          const rectX =
            offsetX + position((Math.random() * selectedStyle.size) / 2)
          const rectY =
            offsetY + position((Math.random() * selectedStyle.size) / 2)
          const rectLen = 1.4
          const rectWid = 1.4
          ctx.fillRect(rectX, rectY, rectWid, rectLen)
        }

        setLast([offsetX, offsetY])
      }
    }
    if (imageDataInDOM.showOverview) {
      const documentScrollTop = document.querySelector('html').scrollTop
      const { x, y } = document.querySelector('canvas').getBoundingClientRect()
      const mousePosY = pageY - documentScrollTop - y
      const mousePosX = pageX - x
      setSelectedImageData(prev => ({
        ...prev,
        x: mousePosX + 5,
        y: mousePosY + 5
      }))
    }
    if (imageDataInDOM.enableResizing) {
      let { imageHeight, imageWidth } = ImageResizeDimensions({
        pageX,
        pageY
      })

      const boundX = isBoundX(imageDataInDOM.left, imageDataInDOM.width, canvas)
      const boundY = isBoundY(imageDataInDOM.top, imageDataInDOM.height, canvas)

      if (imageDataInDOM.boundary) {
        imageWidth = boundX ? imageWidth : imageDataInDOM.width
        imageHeight = boundY ? imageHeight : imageDataInDOM.height
      }

      setImageDataInDOM(prev => ({
        ...prev,
        height: imageHeight,
        width: imageWidth,
        initialX: pageX,
        initialY: pageY
      }))
    }
    if (selection.mousePress) {
      setSelection(prev => ({ ...prev, finalX: offsetX, finalY: offsetY }))
    }
  }

  const handleClick = e => {
    console.log('triggered in handleClick')
    const { offsetX, offsetY } = e.nativeEvent
    const text = inputBoxInfo.value
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (selected === 104) {
      // inputbox
      if (!inputBoxInfo.visible) {
        setInputBoxInfo(prev => ({
          ...prev,
          visible: !prev.visible,
          x: offsetX,
          y: offsetY
        }))
      }

      isVisible.current &&
        print_MultilineText(
          InputBox,
          inputBoxInfo,
          setInputBoxInfo,
          canvas,
          ctx,
          saveCanvasData
        )
      isVisible.current = !isVisible.current
      setInputBoxInfo(prev => ({ ...prev, value: '' }))
    }

    if (selectedImageData.image) {
      // paste-image
      if (imageDataInDOM.clicked) {
        console.log('image is pasted')
        saveDOMImageInCanvas()
      } else {
        console.log('clicked is incremented')
        setImageDataInDOM(prev => ({ ...prev, clicked: prev.clicked + 1 }))
      }
    }
    if (selected === 105) {
      //color-bucket
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const floodfill = new FloodFill(imageData)

      console.log(selectedStyle.color)

      floodfill.fill(rgba(selectedStyle.color), offsetX, offsetY, 0)

      ctx.putImageData(floodfill.imageData, 0, 0)
      saveCanvasData({ canvas, ctx })
    }
    if (selected === 106) {
      //color-picker
      const imageData = ctx.getImageData(
        offsetX,
        offsetY,
        canvas.width,
        canvas.height
      )

      const [red, green, blue, alpha] = imageData.data
      setSelectedStyle(prev => ({
        ...prev,
        color: { r: red, g: green, b: blue, a: alpha / 255 }
      }))

      setSelected(null)
    }
  }

  const saveCanvasData = ({ canvas, ctx }) => {
    console.log('triggered in saveCanvasData')
    const currentCanvasData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    )
    const savedCanvasData = dataSet[index]
    if (!compareImage(currentCanvasData, savedCanvasData) || !dataSet[index]) {
      setCanvasData(prev => {
        let [dataSet, index] = prev
        const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        dataSet[index] = canvasData

        return [dataSet, index]
      })

      setUndoStack(prev => {
        !prev[index] ? (prev[index] = [null]) : null
        const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        prev = deepClone(prev)

        if (hasData(canvasData)) {
          prev[index].push(canvasData)
        }
        return [...prev]
      })

      !redoStack[index] ? (redoStack[index] = [null]) : null
    }
  }

  const handleMouseDownOverDOMImage = e => {
    const { pageX, pageY } = e
    setImageDataInDOM(prev => ({
      ...prev,
      enableDragging: true,
      initialDraggingX: pageX,
      initialDraggingY: pageY
    }))
    return false
  }

  const handleMouseUpOverDOMImage = () => {
    console.log('triggered in handleMouseUpOverDOMImage')
    // if (selected === 102) {
    setImageDataInDOM(prev => ({
      ...prev,
      enableResizing: false,
      showOverview: false,
      enableDragging: false,
      isOverViewing: false,
      clicked: 1
    }))
    // }
  }

  const handleMouseMoveOverDOMImage = e => {
    console.log('triggered in handleMouseMoveOverDOMImage')
    const { pageX, pageY } = e
    const canvas = document.querySelector('canvas')
    if (imageDataInDOM.enableResizing) {
      const { imageHeight, imageWidth } = ImageResizeDimensions({
        pageX,
        pageY
      })
      setImageDataInDOM(prev => ({
        ...prev,
        height: imageHeight,
        width: imageWidth,
        initialX: pageX,
        initialY: pageY
      }))
    }
    if (imageDataInDOM.enableDragging) {
      const { initialDraggingX, initialDraggingY, top, left } = imageDataInDOM
      const changeInX = pageX - initialDraggingX
      const changeInY = pageY - initialDraggingY

      let newOffsetX = left + changeInX
      let newOffsetY = top + changeInY

      const boundX = isBoundX(newOffsetX, imageDataInDOM.width, canvas)
      const boundY = isBoundY(newOffsetY, imageDataInDOM.height, canvas)

      if (imageDataInDOM.boundary) {
        newOffsetX = boundX ? newOffsetX : left
        newOffsetY = boundY ? newOffsetY : top
      }

      setImageDataInDOM(prev => ({
        ...prev,
        top: newOffsetY,
        left: newOffsetX,
        initialDraggingX: pageX,
        initialDraggingY: pageY
      }))
    }
  }

  const handleMouseLeave = () => {
    console.log('triggered in handleMouseLeave')
    setIsMouseDown(false)
    setImageDataInDOM(prev => ({ ...prev, enableDragging: false }))
  }

  const handleMouseEnter = () => {
    console.log('triggered in handleMouseEnter')
    if (selected === 102) {
      if (imageDataInDOM.isOverViewing) {
        setImageDataInDOM(prev => ({ ...prev, showOverview: true }))
      }
    }
  }

  const isBoundX = (topLeftX, targetWidth, canvas) => {
    if (topLeftX <= 0 || topLeftX + targetWidth >= canvas.width) {
      return false
    } else {
      return true
    }
  }
  const isBoundY = (topLeftY, targetHeight, canvas) => {
    if (topLeftY <= 0 || topLeftY + targetHeight >= canvas.height) {
      return false
    } else {
      return true
    }
  }

  const ImageResizeDimensions = ({ pageX, pageY }) => {
    const { height, width } = imageDataInDOM
    let changeInImageHeight = pageY - imageDataInDOM.initialY
    let changeInImageWidth = pageX - imageDataInDOM.initialX

    changeInImageHeight = !isNaN(height)
      ? height + changeInImageHeight
      : changeInImageHeight
    changeInImageWidth = !isNaN(width)
      ? width + changeInImageWidth
      : changeInImageWidth

    return { imageHeight: changeInImageHeight, imageWidth: changeInImageWidth }
  }

  const saveDOMImageInCanvas = () => {
    console.log('triggered in saveDOMImageInCanvas')
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const DOMimage = document.getElementById('domimage')
    DomToImage.toPng(DOMimage).then(url => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        selected === 401 ? pasteWhiteRegion() : null
        ctx.drawImage(
          image,
          imageDataInDOM.left,
          imageDataInDOM.top,
          imageDataInDOM.width,
          imageDataInDOM.height
        )
        setImageDataInDOM(prev => ({
          ...prev,
          height: null,
          width: null,
          clicked: 0
        }))
        setSelected(null)
        saveCanvasData({ canvas, ctx })
      }
    })
  }

  const pasteWhiteRegion = () => {
    const { finalX, finalY, initialX, initialY } = selection

    const top = finalY > initialY ? initialY : finalY
    const left = finalX > initialX ? initialX : finalX

    const width = Math.abs(finalX - initialX)
    const height = Math.abs(finalY - initialY)

    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(left, top, width, height)
  }

  //test start

  //test end
  // value addition of inputbox start

  const handleInputBoxChange = e => {
    setInputBoxInfo(prev => ({
      ...prev,
      value: InputBox.current.innerHTML
    }))
  }
  //value addition of inputbox end

  // dragging of textarea start

  const handleDragTextbox = e => {
    const { top, left, changeX, changeY } = e
    const { textboxWidth, textboxHeight } = inputBoxInfo
    const boundX = inputBoxInfo.boundary
      ? isBoundX(left + changeX, inputBoxInfo.textboxWidth, canvasRef.current)
      : true
    const boundY = inputBoxInfo.boundary
      ? isBoundY(top + changeY, inputBoxInfo.textboxHeight, canvasRef.current)
      : true
    // if (textboxHeight - offsetY > 20 && textboxWidth - offsetX > 20)
    if (inputBoxInfo.drag) {
      setInputBoxInfo(prev => ({
        ...prev,
        x: boundX ? left + changeX : left,
        y: boundY ? top + changeY : top
      }))
    }
  }

  // dragging of textarea end

  // handling of resizing process for textarea start

  const handleResizingMouseDown = e => {
    resizing.current = true
    setResizingData(prev => ({
      ...prev,
      initialX: e.nativeEvent.pageX,
      initialY: e.nativeEvent.pageY
    }))
    resizingDataRef.current.initialX = e.pageX
    resizingDataRef.current.initialY = e.pageY
  }

  const handleResizingMouseUp = () => {
    resizing.current = false
  }

  // handling of resizing process for textarea end

  const handleDragImage = e => {
    const { left, top, changeX, changeY } = e
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const boundX = imageDataInDOM.boundary
      ? isBoundX(left + changeX, imageDataInDOM.width, canvas)
      : true
    const boundY = imageDataInDOM.boundary
      ? isBoundY(top + changeY, imageDataInDOM.height, canvas)
      : true
    setImageDataInDOM(prev => ({
      ...prev,
      left: boundX ? left + changeX : left,
      top: boundY ? top + changeY : top
    }))
  }

  const handleMouseMoveInSelectionRegion = e => {
    console.log('triggered in handleMouseMoveInSelectionRegion')
    const { clientX, clientY } = e
    const { x, y } = canvasRef.current.getBoundingClientRect()

    const offsetX = clientX - x
    const offsetY = clientY - y
    setSelection(prev => ({ ...prev, finalX: offsetX, finalY: offsetY }))
  }

  useEffect(() => {
    if (inputBoxInfo.value && InputBox.current) {
      InputBox.current.style.height = `${InputBox.current.scrollHeight}px`
    }
  }, [
    inputBoxInfo.fontFamilyIndex,
    inputBoxInfo.lineHeightIndex,
    selectedStyle.size,
    inputBoxInfo.value
  ])
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    dataSet[index]
      ? ctx.putImageData(dataSet[index], 0, 0)
      : ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsSwapped(false)
    setHasUndoRedoPerformed(false)
  }, [index, dataSet.length, isSwapped, hasUndoRedoPerformed]) // when selected slide changes index changes
  // when slide is deleted index is not changed
  // so thats why when dataSet.length changes it
  // again gets triggered

  useEffect(() => {
    const documentMouseMoveHandler = e => {
      if (resizing.current) {
        const changeInX = e.pageX - resizingDataRef.current.initialX
        const changeInY = e.pageY - resizingDataRef.current.initialY
        const netWidth = inputBoxInfo.textboxWidth + changeInX
        const netHeight = inputBoxInfo.textboxHeight + changeInY
        const boundX = inputBoxInfo.boundary
          ? isBoundX(inputBoxInfo.x, netWidth, canvasRef.current)
          : true
        const boundY = inputBoxInfo.boundary
          ? isBoundY(inputBoxInfo.y, netHeight, canvasRef.current)
          : true
        setInputBoxInfo(prev => ({
          ...prev,
          textboxWidth: boundX ? netWidth : prev.textboxWidth,
          textboxHeight: boundY ? netHeight : prev.textboxHeight
        }))
      }
    }
    const documentMouseUpHandler = () => {
      resizing.current = false
    }
    document.addEventListener('mousemove', documentMouseMoveHandler)
    document.addEventListener('mouseup', () => documentMouseUpHandler)

    const handleResizeTextarea = () => {
      if (inputBoxInfo.visible && InputBox.current) {
        // to not set the height and width to 0 on
        setInputBoxInfo(prev => ({
          // closing the textarea
          ...prev,
          textboxWidth: InputBox.current.offsetWidth,
          textboxHeight: InputBox.current.offsetHeight
        }))
      }
    }
    const textbox = document.getElementById('textbox')
    inputBoxInfo.visible
      ? new ResizeObserver(handleResizeTextarea).observe(textbox)
      : null

    return () => {
      document.removeEventListener('mousemove', documentMouseMoveHandler)
      document.removeEventListener('mouseup', documentMouseUpHandler)
    }
  }, [resizingData.initialX, resizingData.initialY, inputBoxInfo.visible])

  useEffect(() => {
    setInputBoxInfo(prev => ({ ...prev, visible: false }))
    setSelectedImageData(prev => ({
      ...prev,
      image: null,
      x: null,
      y: null
    }))
    setImageDataInDOM(prev => ({
      ...prev,
      height: null,
      width: null,
      clicked: 0,
      getting_used: false,
      boundary: false,
      fit: false,
      flip_horizontal: false,
      flip_vertical: false
    }))
    setSelection(prev => ({
      ...prev,
      initialize: false,
      finalX: false,
      finalY: false,
      initialX: false,
      initialY: false
    }))
  }, [selected])
  useEffect(() => {
    if (selectedImageData.image) {
      setImageDataInDOM(prev => ({
        ...prev,
        showOverview: true,
        isOverViewing: true
      }))
    }
  }, [selectedImageData.image])
  useEffect(() => {
    const parentCanvas = canvasRef.current
    const resizer = document.querySelector('.resizer')
    const domimage = document.getElementById('domimage')
    const handleMouseupInWindow = e => {
      if (
        // if outside canvas
        imageDataInDOM.height &&
        imageDataInDOM.width &&
        e.target !== parentCanvas &&
        e.target !== resizer &&
        e.target !== domimage
      ) {
        console.log(
          'triggered in useEffect used for setting while outside canvas'
        )
        setImageDataInDOM(prev => ({
          ...prev,
          enableResizing: false,
          showOverview: false,
          isOverViewing: false,
          clicked: 1
        }))
      }
    }

    window.addEventListener('mouseup', handleMouseupInWindow)
    return () => window.removeEventListener('mouseup', handleMouseupInWindow)
  }, [imageDataInDOM, selectedImageData, selection])

  useEffect(() => {
    const parent = document.getElementById('canvasParent')

    const handleDoubleClick = () => {
      console.log('triggered in useEffect while double clicking')
      if (imageDataInDOM.height || imageDataInDOM.width) {
        saveDOMImageInCanvas()
      }
    }

    parent.addEventListener('dblclick', handleDoubleClick)
    return () => parent.removeEventListener('dblclick', handleDoubleClick)
  }, [imageDataInDOM])

  return (
    <div
      id='canvasParent'
      className={`relative overflow-hidden ${
        !imageDataInDOM.height &&
        !imageDataInDOM.width &&
        selectedImageData.image
          ? `cursor-crosshair`
          : imageDataInDOM.enableResizing && imageDataInDOM.isOverViewing
          ? `cursor-crosshair`
          : `cursor-auto`
      }`}
      style={{ width: `${window.innerWidth - 400}px`, height: `700px` }}
      onMouseLeave={e => {
        setImageDataInDOM(prev => ({
          ...prev,
          enableDragging: false,
          enableResizing: false,
          showOverview: false
        }))
        resizing.current = false
        selected === 401 ? handleMouseUp(e) : null
      }}
    >
      <canvas
        className={`shadow-md shadow-[#0000004b`}
        height={700}
        ref={canvasRef}
        width={window.innerWidth - 400}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
      />

      {inputBoxInfo.visible ? (
        <Dragg
          position={{ x: inputBoxInfo.x, y: inputBoxInfo.y }}
          dragevent={handleDragTextbox}
          cancel={[`#resizer`, inputBoxInfo.drag ? `` : `#textbox`]}
        >
          <div
            className='absolute top-0 left-0'
            style={{
              height: `${inputBoxInfo.textboxHeight}px`,
              width: `${inputBoxInfo.textboxWidth}px`
            }}
          >
            <div
              id='textbox'
              className={`absolute bg-transparent p-1 outline-dashed outline-black outline-1 top-0 left-0  border-dotted outline-none overflow-hidden underline-offset-8 ${
                inputBoxInfo.bold && 'font-bold'
              } ${inputBoxInfo.italic && 'italic'}`}
              style={{
                width: `${inputBoxInfo.textboxWidth || 300}px`,
                height: `${inputBoxInfo.textboxHeight || 100}px`,
                textDecoration: `${inputBoxInfo.underline ? 'underline' : ''} ${
                  inputBoxInfo.strikethrough ? 'line-through' : ''
                }`,
                fontSize: `${selectedStyle.size}px`,
                resize: 'both',
                color: rgba(selectedStyle.color),
                fontFamily: isNumber(inputBoxInfo.temp_fontFamilyIndex)
                  ? fontStyles[inputBoxInfo.temp_fontFamilyIndex]
                  : fontStyles[inputBoxInfo.fontFamilyIndex],
                lineHeight: isNumber(inputBoxInfo.temp_lineHeightIndex)
                  ? lineHeight[inputBoxInfo.temp_lineHeightIndex]
                  : lineHeight[inputBoxInfo.lineHeightIndex],
                textAlign: Alignment[inputBoxInfo.alignmentIndex].align
              }}
              ref={InputBox}
              spellCheck='false'
              contentEditable
              onInput={handleInputBoxChange}
            ></div>
            <div
              id='resizer'
              className={`absolute w-5 h-5 right-0 bottom-0 cursor-nwse-resize ${
                inputBoxInfo.visible ? 'block' : 'hidden'
              }`}
              onMouseDown={handleResizingMouseDown}
              onMouseUp={handleResizingMouseUp}
            />
          </div>
        </Dragg>
      ) : null}
      {selected === 102 && imageDataInDOM.showOverview ? (
        <SelectedImageHover {...selectedImageData} /> // overview image
      ) : null}
      {imageDataInDOM.height && imageDataInDOM.width ? (
        <Dragg
          position={{ x: imageDataInDOM.left, y: imageDataInDOM.top }}
          dragevent={handleDragImage}
          cancel={['.resizer']}
        >
          <div
            id='imagewrap'
            className='absolute z-0'
            style={{
              top: `0px`,
              left: `0px`,
              height: `${imageDataInDOM.height}px`,
              width: `${imageDataInDOM.width}px`,
              resize: 'both',
              outline: '1px dashed black'
            }}
          >
            <img
              id='domimage'
              src={selectedImageData.image}
              className={`absolute ${
                imageDataInDOM.fit ? `` : `object-cover`
              } ${imageDataInDOM.flip_horizontal ? `-scale-y-100` : ``} ${
                imageDataInDOM.flip_vertical ? `-scale-x-100` : ``
              } cursor-move top-0-left-0 z-0 w-full h-full`}
              style={{ userSelect: 'none' }}
              onMouseMove={handleMouseMoveOverDOMImage}
              onMouseUp={handleMouseUpOverDOMImage}
              alt=''
            />
            <div
              className={`h-5 w-5 bg-transparent absolute bottom-0 right-0 flex justify-center items-center ${
                imageDataInDOM.showOverview
                  ? `cursor-crosshair`
                  : `cursor-nwse-resize`
              } z-10`}
            >
              <img
                src={resizer}
                className='resizer'
                alt=''
                style={{ userSelect: 'none' }}
                onMouseDown={e =>
                  setImageDataInDOM(prev => ({
                    ...prev,
                    enableResizing: true,
                    initialX: e.pageX,
                    initialY: e.pageY
                  }))
                }
                onMouseUp={() =>
                  setImageDataInDOM(prev => ({
                    ...prev,
                    enableResizing: false,
                    showOverview: false,
                    enableDragging: false,
                    isOverViewing: false,
                    clicked: 1
                  }))
                }
                onDragStart={e => e.preventDefault()}
                onMouseMove={handleMouseMove}
              />
            </div>
          </div>
        </Dragg>
      ) : null}
      {selection.initialize && !selectedImageData.image ? (
        <div
          style={{
            outline: '1px dashed black',
            backgroundColor: 'transparent',
            position: 'absolute',
            height: `${Math.abs(selection.finalY - selection.initialY)}px`,
            width: `${Math.abs(selection.finalX - selection.initialX)}px`,
            top:
              selection.finalY > selection.initialY
                ? `${selection.initialY}px`
                : `${selection.finalY}px`,
            left:
              selection.finalX > selection.initialX
                ? `${selection.initialX}px`
                : `${selection.finalX}px`,
            zIndex: 5
          }}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMoveInSelectionRegion}
        ></div>
      ) : null}
      {selected === 401 && selectedImageData.image ? (
        <div
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            height: `${Math.abs(selection.finalY - selection.initialY)}px`,
            width: `${Math.abs(selection.finalX - selection.initialX)}px`,
            top:
              selection.finalY > selection.initialY
                ? `${selection.initialY}px`
                : `${selection.finalY}px`,
            left:
              selection.finalX > selection.initialX
                ? `${selection.initialX}px`
                : `${selection.finalX}px`
          }}
        ></div>
      ) : null}
    </div>
  )
}
export default Canvas
