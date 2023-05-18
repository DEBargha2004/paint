import Appstate from './hooks/appstate'
import Navbar from './components/Navbar'
import Tools from './components/Tools'
import Canvas from './components/Canvas'
import { useState } from 'react'

function App () {
  const [selected, setSelected] = useState(null)
  return (
    <Appstate.Provider value={{selected,setSelected}}>
      {/* <Navbar /> */}
      <Tools />
      <Canvas />
    </Appstate.Provider>
  )
}

export default App
