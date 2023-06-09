import { useContext, useState } from 'react'
import Appstate from '../../hooks/appstate'
import { motion } from 'framer-motion'

function Aligner ({ url, align, alignmentId }) {
  const {
    inputBoxInfo: { alignmentIndex },
    setInputBoxInfo
  } = useContext(Appstate)
  const [isHovering, setIsHovering] = useState(false)
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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={url} alt='' />
      <motion.div
        layout
        initial={{
          translateY: '20px',
          opacity: 0,
          translateX: `${17}px`
        }}
        whileInView={{
          translateY: '0px',
          opacity: 1,
          translateX: `${17}px`
        }}
        className={`absolute bg-red p-2 -bottom-9 text-lg left-0 ${isHovering ? `grid` : `hidden`} place-items-center shadow-lg shadow-[#001aff40] bg-white rounded-lg whitespace-nowrap w-fit text-slate-500`}
      >
        {`Shift`}
      </motion.div>
    </div>
  )
}

export default Aligner
