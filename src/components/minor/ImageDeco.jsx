import { useContext, useState, useRef } from 'react'
import Appstate from '../../hooks/appstate'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

function ImageDeco ({ decoration, url, label, id }) {
  const { imageDataInDOM, setImageDataInDOM } = useContext(Appstate)
  const [isHovering, setIsHovering] = useState(false)
  const hoveredLabel = useRef(null)
  const StyleIcon = useRef(null)
  const [translateX, setTransateX] = useState(0)

  useEffect(() => {
    if (hoveredLabel.current) {
      const translateX =
        (StyleIcon.current.offsetWidth - hoveredLabel.current.offsetWidth) / 2
      hoveredLabel.current.style.left = `${translateX}px`
    }
  }, [isHovering])
  return (
    <div
      ref={StyleIcon}
      className={`${
        imageDataInDOM[decoration] ? 'bg-[#005eff5f]' : 'hover:bg-[#005eff34]'
      } transition-all flex h-10 p-2 rounded-md mr-4 relative cursor-pointer`}
      onClick={() =>
        setImageDataInDOM(prev => ({
          ...prev,
          [decoration]: !prev[decoration]
        }))
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={url} alt='' />
      {isHovering && label && (
        <motion.div
          ref={hoveredLabel}
          layout
          initial={{
            opacity: 0,
            bottom:`-80px`
          }}
          whileInView={{
            opacity: 1,
            bottom:`-43px`
          }}
          className='absolute bg-red px-3 py-2 text-lg left-0 grid place-items-center shadow-lg shadow-[#001aff40] bg-white rounded-lg whitespace-nowrap w-fit text-slate-500'
        >
          {label}
        </motion.div>
      )}
    </div>
  )
}

export default ImageDeco
