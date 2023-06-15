import Appstate from './hooks/appstate'
import Navbar from './components/major/Navbar'
import LowerBody from './components/major/LowerBody'
import Tools from './components/major/Tools'
import { useEffect, useState } from 'react'

function App () {
  const [selected, setSelected] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState({
    color: { r: 0, g: 0, b: 0, a: 1 },
    size: 1
  })
  const [canvasData, setCanvasData] = useState([[null], 0])
  const [canvasDimensions, setCanvasDimensions] = useState({
    height: 700,
    width: window.innerWidth - 400
  })

  const [undoStack, setUndoStack] = useState([[null]])
  const [redoStack, setRedoStack] = useState([[null]])
  const [inputBoxInfo, setInputBoxInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: '',
    textboxWidth: 0,
    textboxHeight: 0,
    fontFamilyIndex: 0,
    lineHeightIndex: 0,
    alignmentIndex: 0,
    temp_fontFamilyIndex: null,
    temp_lineHeightIndex: null,
    temp_alignmentIndex: null
  })
  const [selectedImageData, setSelectedImageData] = useState({
    image: null,
    x: null,
    y: null,
    naturalHeight: 1,
    naturalWidth: 1
  })
  const [imageDataInDOM, setImageDataInDOM] = useState({
    initialX: null,
    initialY: null,
    height: 0,
    width: 0,
    top: null,
    left: null,
    showOverview: false,
    isOverViewing: false,
    enableResizing: false,
    enableDragging: false,
    clicked: 0,
    initialDraggingX: null,
    initialDraggingY: null,
    getting_used:false
  })
  const [isSwapped, setIsSwapped] = useState(false)
  const [hasUndoRedoPerformed, setHasUndoRedoPerformed] = useState(false)
  useEffect(() => {
    if (selected === 104) {
      setSelectedStyle(prev => ({ ...prev, size: 20 }))
    } else {
      setSelectedStyle(prev => ({ ...prev, size: 1 }))
    }
  }, [selected])

  return (
    <>
      <Appstate.Provider
        value={{
          selected,
          setSelected,
          selectedStyle,
          setSelectedStyle,
          setCanvasData,
          canvasData,
          setUndoStack,
          setRedoStack,
          undoStack,
          redoStack,
          inputBoxInfo,
          setInputBoxInfo,
          setSelectedImageData,
          selectedImageData,
          imageDataInDOM,
          setImageDataInDOM,
          isSwapped,
          setIsSwapped,
          setHasUndoRedoPerformed,
          hasUndoRedoPerformed,
          canvasDimensions
        }}
      >
        <div className='sticky  z-10'>
          <Navbar />
          <Tools />
        </div>
        <LowerBody />
      </Appstate.Provider>
    </>
  )
}

export default App
