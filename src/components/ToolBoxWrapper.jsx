import React from 'react'

function ToolBoxWrapper ({ children, left, right }) {
  return (
    <div
      className={`w-fit px-2 ${left && 'border-l-[1px] border-[#00000027]'} ${
        right && 'border-r-[1px] border-[#00000027]'
      }`}
    >
      {children}
    </div>
  )
}

export default ToolBoxWrapper
