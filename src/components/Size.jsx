import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import { useContext } from 'react'
import Appstate from '../hooks/appstate'
import { size } from '../assets/Tools'

function Size () {
  const { selected, setSelected } = useContext(Appstate)
  return (
    <ToolBoxWrapper right>
      <div className='h-full flex flex-col justify-between items-center px-3'>
        <div
          className={`mt-6 p-1 hover:bg-slate-100 ${
            selected === size[0].id &&
            'rounded-md outline outline-1 outline-slate-400 bg-slate-100 flex flex-col justify-center items-center'
          }`}
          onClick={() => setSelected(size[0].id)}
        >
          <img src={size[0].url} alt='' className='h-10' />
          <img
            src='https://cdn-icons-png.flaticon.com/512/2985/2985150.png'
            className='h-4 mt-2 mx-auto'
            alt=''
          />
        </div>
        <ToolBoxTitle>Size</ToolBoxTitle>
      </div>
    </ToolBoxWrapper>
  )
}

export default Size
