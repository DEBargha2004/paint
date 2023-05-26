import React, { useEffect, useRef, useContext } from 'react'
import Appstate from '../../hooks/appstate'

function TextStyleListItemContainer ({ children, display, stateKey }) {
  const {
    inputBoxInfo: { fontFamilyIndex, lineHeightIndex }
  } = useContext(Appstate)
  const ListBox = useRef(null)
  const indexOfThis = () => {
    if (stateKey === 'fontFamilyIndex') {
      return fontFamilyIndex
    } else if (stateKey === 'lineHeightIndex') {
      return lineHeightIndex
    }
  }
  useEffect(() => {
    if(ListBox.current){
      setTimeout(()=>{
        ListBox.current.scrollTo({
          top : 52 * indexOfThis() - (window.innerHeight - 100),
          behavior : 'smooth'
        })
      },100)
    }
  }, [display])
  return (
    display && (
      <div
        ref={ListBox}
        className={`absolute max-h-[550px] transition-all whitespace-nowrap top-[-100px] p-2 left-0 text-lg bg-white rounded-lg shadow-lg shadow-[#00000031] overflow-y-scroll z-20`}
      >
        {children}
      </div>
    )
  )
}

export default TextStyleListItemContainer
