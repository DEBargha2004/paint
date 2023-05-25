import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { fontStyles } from '../../assets/Tools'

function TextStyleBox () {
  const { selected, inputBoxInfo, setInputBoxInfo } = useContext(Appstate)
  const [opstionState, setOptionState] = useState({
    fontFamily: false
  })
  const fontStyleRef = useRef(null)
  const handleChangeFont = index => {
    setInputBoxInfo(prev => ({ ...prev, fontFamilyIndex: index }))
    setOptionState(prev => ({ ...prev, fontFamily: false }))
  }
  useEffect(() => {
    if (opstionState.fontFamily) {
      fontStyleRef.current.scrollTop = inputBoxInfo.fontFamilyIndex * 48 - (window.innerHeight - 100)
      console.log(fontStyleRef.current.scrollTop);
    }
  }, [opstionState.fontFamily])
  return selected === 104 ? (
    <div className='flex justify-end items-center'>
      <div
        style={{
          width: window.innerWidth - 400,
          top: '155px',
          marginRight: '39px'
        }}
        className='absolute h-fit flex justify-start items-center p-3 bg-gray-50 rounded-lg shadow-lg shadow-[#0000003f]'
      >
        <div
          className='w-fit min-w-[190px] bg-white p-2 border-[1px] border-[#0000002d] rounded-md flex justify-between items-center'
          onClick={() =>
            setOptionState(prev => ({
              ...prev,
              fontFamily: !prev.fontFamily
            }))
          }
        >
          <p className='text-slate-700 mr-2'>
            {fontStyles[inputBoxInfo.fontFamilyIndex].split(',')[0]}
          </p>
          <img
            src='https://cdn-icons-png.flaticon.com/512/32/32195.png'
            className='h-3 mr-2'
            alt=''
          />
        </div>
        {opstionState.fontFamily ? (
          <div
            ref={fontStyleRef}
            className='absolute top-[-100px] left-0 p-2 bg-white rounded-lg shadow-lg shadow-[#00000031] overflow-y-scroll z-20'
            style={{ height: window.innerHeight - 100 }}
          >
            {fontStyles.map((item, index) => {
              const styleName = item.split(',')[0]
              return (
                <div
                  key={index}
                  className={`relative ${
                    inputBoxInfo.fontFamilyIndex === index
                      ? 'bg-gray-100'
                      : 'bg-white'
                  } hover:bg-gray-100 cursor-pointer rounded-md my-1`}
                  style={{ fontFamily: item }}
                  onClick={() => handleChangeFont(index)}
                >
                  <div
                    className={`${
                      inputBoxInfo.fontFamilyIndex === index
                        ? 'bg-purple-500 w-1 h-full my-auto rounded-md'
                        : 'none'
                    } absolute left-0 top-0`}
                  />
                  <p className='p-2'>{styleName}</p>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  ) : null
}

export default TextStyleBox
