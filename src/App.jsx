import Appstate from './hooks/appstate'
import Navbar from './components/Navbar'
import CanvasWrapper from './components/CanvasWrapper'
import Tools from './components/Tools'
import { useState } from 'react'

function App () {
  const [selected, setSelected] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState({color:{ r: 0, g: 0, b: 0, a: 1 },size:1})
  const [canvasData, setCanvasData] = useState([[null],0])
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  return (
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
        redoStack
      }}
    >
      {/* <Navbar /> */}
      <Tools />
      <CanvasWrapper />
    </Appstate.Provider>
  )
}

export default App
