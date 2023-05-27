import { useContext, useState } from 'react'
import Appstate from '../../hooks/appstate'
import SketchTools from '../minor/SketchTools'
import Brush from '../minor/Brush'
import Size from '../minor/Size'
import Color from '../minor/Color'
import AddSlide from '../minor/AddSlide'
import TextStyleBox from '../minor/TextStyleBox'

function Tools () {
  const { inputBoxInfo, setInputBoxInfo, selected } = useContext(Appstate)

  return (
    <div className='relative'>
      <div className='w-full p-2 flex sticky top-0 bg-white shadow-md shadow-[#00000015] z-10'>
        <AddSlide />
        <SketchTools />
        <Brush />
        <Size />
        <Color />
      </div>
      <TextStyleBox />
    </div>
  )
}

export default Tools