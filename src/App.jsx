import Appstate from './hooks/appstate'
import Navbar from './components/Navbar'
import LowerBody from './components/lowerBody'
import Tools from './components/Tools'
import { useEffect, useState } from 'react'

function App () {
  const [selected, setSelected] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState({
    color: { r: 0, g: 0, b: 0, a: 1 },
    size: 1
  })
  const [canvasData, setCanvasData] = useState([[null], 0])
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  useEffect(()=>{
    if(selected === 104){
      setSelectedStyle(prev => ({...prev,size:20}))
    }else {
      setSelectedStyle(prev => ({...prev,size:1}))
    }
  },[selected])
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
      <LowerBody />
    </Appstate.Provider>
  )
}

export default App
