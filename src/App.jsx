import Appstate from './hooks/appstate'
import Navbar from './components/minor/Navbar'
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
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [inputBoxInfo, setInputBoxInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: '',
    textboxWidth: 0,
    fontFamilyIndex : 0,
    lineHeightIndex : 0
  })
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
        redoStack,
        inputBoxInfo,
        setInputBoxInfo
      }}
    >
      {/* <Navbar /> */}
      <Tools />
      <LowerBody />
    </Appstate.Provider>
  )
}

export default App
