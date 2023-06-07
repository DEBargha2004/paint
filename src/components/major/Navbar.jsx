import { useContext } from 'react'
import Appstate from '../../hooks/appstate'

function Navbar () {


  return (
    <div>
      <button
        className='p-2 border-[1px] border-[#00000050] m-2'
        onClick={handleUndo}
      >
        Undo
      </button>
      <button
        className='p-2 border-[1px] border-[#00000050] m-2'
        onClick={handleRedo}
      >
        Redo
      </button>
    </div>
  )
}

export default Navbar
