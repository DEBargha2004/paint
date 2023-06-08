import { useContext } from 'react'
import Appstate from '../../hooks/appstate'
import SketchTools from '../minor/SketchTools'
import Brush from '../minor/Brush'
import Size from '../minor/Size'
import Color from '../minor/Color'
import AddSlide from '../minor/AddSlide'
import TextStyleBox from '../minor/TextStyleBox'
import ImageStyleBox from '../minor/ImageStyleBox'

function Tools () {
  const { inputBoxInfo, setInputBoxInfo, selected } = useContext(Appstate)

  return (
    <div className='z-10'>
      <div className='w-full px-2 flex items-center bg-white shadow-md shadow-[#00000015]'>
        <AddSlide />
        <SketchTools />
        <Brush />
        <Size />
        <Color />
      </div>
      <TextStyleBox />
      <ImageStyleBox />
    </div>
  )
}

export default Tools
