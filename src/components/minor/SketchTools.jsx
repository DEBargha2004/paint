import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'
import ToolBoxWrapper from './ToolBoxWrapper'
import ToolBoxTitle from './ToolBoxTitle'
import { sketchToolsUrl, addImage } from '../../assets/Tools.js'
import { motion } from 'framer-motion'
import { isNumber } from '../../functions/isNumber'

function SketchTools () {
  const { selected, setSelected, setSelectedImageData } = useContext(Appstate)
  const [{ isHovering, display, webSearch }, setDisplayOptions] = useState({
    isHovering: false,
    display: false,
    webSearch: false
  })
  const imageInputRef = useRef(null)
  const webDialog = useRef(null)
  const [urlExistance, setUrlExistance] = useState({
    show: false,
    value: '',
    id: null
  })
  const handleImageChange = e => {
    const file = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.onload = () => {
      imageInputRef.current.value = null
      const image = new Image()
      image.src = fileReader.result
      image.onload = () => {
        setDisplayOptions(prev => ({ ...prev, display: false }))
        setSelectedImageData(prev => ({
          ...prev,
          image: image.src,
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth
        }))
      }
    }
    fileReader.readAsDataURL(file)
  }
  const handleWebSearchModal = () => {
    webDialog.current.showModal()
    document.documentElement.style.overflow = 'hidden'
    setDisplayOptions(prev => ({ ...prev, display: true }))
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    const url = e.target[0].value
    const image = new Image()
    image.src = url
    image.onload = () => {
      setSelectedImageData(prev => ({
        ...prev,
        image: image.src,
        natutalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth
      }))

      setDisplayOptions(prev => ({ ...prev, display: false }))
      e.target[0].value = null
      setUrlExistance(prev => ({ ...prev, id: null, show: false, value: null }))
      webDialog.current.close()
    }
    document.documentElement.style.overflow = 'scroll'
  }

  const verifyURL = e => {
    const url_user = e.target.value
    const image = new Image()
    image.src = url_user
    image.onload = () => {
      setUrlExistance(prev => ({
        ...prev,
        id: 1,
        show: true,
        value: url_user
      }))
    }
    image.onerror = () => {
      if (url_user) {
        setUrlExistance(prev => ({
          ...prev,
          id: 0,
          show: true,
          value: url_user
        }))
      } else {
        setUrlExistance(prev => ({ ...prev, show: false, id: null }))
      }
    }
  }
  useEffect(() => {
    const handleClick = e => {
      const { top, left, height, width } =
        webDialog.current.getBoundingClientRect()

      const { clientX, clientY } = e
      if (
        display &&
        !(
          clientX > left &&
          clientX < left + width &&
          clientY > top &&
          clientY < top + height
        )
      ) {
        webDialog.current.close()
        document.documentElement.style.overflow = 'scroll'
        setDisplayOptions(prev => ({ ...prev, display: false }))
        setUrlExistance(prev => ({
          ...prev,
          show: false,
          id: null,
          value: null
        }))
      }
    }
    display && webDialog.current.addEventListener('click', handleClick)
    return () => webDialog.current?.removeEventListener('click', handleClick)
  }, [display])

  return (
    <ToolBoxWrapper right>
      <div className='h-full flex flex-col items-center justify-between cursor-pointer'>
        <div className='grid grid-cols-3 w-fit h-[100px] transition-all p-2 gap-2'>
          {sketchToolsUrl.map((item, index) => (
            <div
              key={index}
              className={`p-2 px-[10px] flex justify-center items-center ${
                item.id === selected
                  ? 'rounded-md outline outline-1 outline-slate-400 bg-slate-100'
                  : ''
              } hover:bg-slate-100`}
              onClick={() => setSelected(item.id)}
            >
              <img src={item.url} className='h-6' />
            </div>
          ))}
          {addImage.map((item, index) => (
            <div
              key={index}
              className={`p-2 px-[10px] relative bg-red flex justify-center items-center cursor-pointer ${
                selected === item.id
                  ? 'rounded-md outline outline-1 outline-slate-400 bg-slate-100'
                  : ''
              } hover:bg-slate-100`}
              onClick={() => {
                setSelected(item.id)
              }}
              onMouseEnter={() => {
                setDisplayOptions(prev => ({
                  ...prev,
                  isHovering: true,
                  display: true
                }))
              }}
              onMouseLeave={() => {
                setDisplayOptions(prev => ({
                  ...prev,
                  isHovering: false,
                  display: selected === item.id ? true : false
                }))
              }}
            >
              <img src={item.url} className='h-6 cursor-pointer' />
              {(isHovering || selected === item.id) && display ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, bottom: `-80px` }}
                  whileInView={{ opacity: 1, bottom: `-43px` }}
                  className={`absolute w-[100px] overflow-hidden h-fit flex justify-between items-center bg-white rounded-md shadow-lg shadow-[#4400ff36]`}
                >
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/364/364089.png'
                    className=' hover:bg-slate-100 p-3 h-12'
                    alt=''
                    onClick={handleWebSearchModal}
                  />

                  <input
                    ref={imageInputRef}
                    type='file'
                    hidden
                    name=''
                    id='select-img'
                    accept='image/*'
                    onChange={e => {
                      handleImageChange(e)
                    }}
                  />
                  <label htmlFor='select-img'>
                    <img
                      src={`https://cdn-icons-png.flaticon.com/512/2933/2933245.png`}
                      className='hover:bg-slate-100 p-3 h-12'
                    />
                  </label>
                </motion.div>
              ) : null}
            </div>
          ))}
          <dialog
            ref={webDialog}
            className='rounded-xl shadow-xl shadow-[#27008221]'
          >
            <div className='p-5'>
              <div className='flex items-center mb-5'>
                <h1 className='text-2xl text-slate-600 mr-5'>
                  Enter URL of Image
                </h1>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/3214/3214746.png'
                  alt=''
                  className='h-5 w-auto mt-1'
                />
              </div>
              <form
                onSubmit={handleFormSubmit}
                className='flex flex-col items-end justify-between'
              >
                <input
                  type='text'
                  className='w-[450px] outline-none border-2 border-indigo-700 rounded-lg p-3 text-slate-400'
                  placeholder='https://cdn.pixabay.com/photo/2015/'
                  spellCheck={false}
                  onChange={verifyURL}
                />
                <div className='w-full flex justify-between items-center'>
                  <div className='flex w-[18%] justify-between items-center'>
                    {urlExistance.show ? (
                      <>
                        <img
                          src={
                            urlExistance.id
                              ? `https://cdn-icons-png.flaticon.com/512/5610/5610944.png`
                              : `https://cdn-icons-png.flaticon.com/512/5610/5610967.png`
                          }
                          className='h-6 w-auto'
                          alt=''
                        />
                        <img
                          src={urlExistance.value}
                          className='h-6 w-auto'
                          alt=''
                        />
                      </>
                    ) : null}
                  </div>
                  <button
                    className={`mt-5  uppercase px-4 py-2 rounded-lg text-white font-semibold transition-all  ${
                      urlExistance.id
                        ? `bg-indigo-500 hover:bg-indigo-700`
                        : `opacity-40 bg-slate-400 cursor-not-allowed`
                    }`}
                    disabled={urlExistance.id ? false : true}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
        <ToolBoxTitle>Tools</ToolBoxTitle>
      </div>
    </ToolBoxWrapper>
  )
}

export default SketchTools
