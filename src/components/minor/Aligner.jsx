import { useContext, useEffect, useRef, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { motion } from 'framer-motion'

function Aligner ({ url, align, alignmentId, label }) {
  const {
    inputBoxInfo: { alignmentIndex },
    setInputBoxInfo
  } = useContext(Appstate)

  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (bottomRef.current) {
      const topWidth = topRef.current.offsetWidth
      const bottomWidth = bottomRef.current.offsetWidth

      const translateX = (topWidth - bottomWidth) / 2
      bottomRef.current.style.left = `${translateX}px`
    }
  }, [isHovering])
  return (
    <div
      className={`${
        alignmentIndex === alignmentId
          ? 'bg-[#005eff5f]'
          : 'hover:bg-[#005eff34]'
      } transition-all flex h-10 p-2 rounded-md mx-2 relative`}
      onClick={() =>
        setInputBoxInfo(prev => ({ ...prev, alignmentIndex: alignmentId }))
      }
      onMouseEnter={() => {
        setIsHovering(true)
        setInputBoxInfo(prev => ({ ...prev, temp_alignmentIndex: alignmentId }))
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        setInputBoxInfo(prev => ({ ...prev, temp_alignmentIndex: null }))
      }}
      ref={topRef}
    >
      <img src={url} alt='' />
      {isHovering && (
        <motion.div
          layout
          initial={{ bottom: `-80px`, opacity: 0 }}
          whileInView={{ bottom: `-43px`, opacity: 1 }}
          className={`absolute whitespace-nowrap px-3 py-2 bg-white rounded-lg shadow-lg shadow-[#001aff40] text-slate-500 `}
          ref={bottomRef}
        >
          {label}
        </motion.div>
      )}
    </div>
  )
}

export default Aligner
