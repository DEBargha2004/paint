import React, { useState, useContext, useEffect } from 'react'
import Appstate from '../../hooks/appstate'
import TextStyleListItemContainer from './TextStyleListItemContainer'
import TextStyleListItem from './TextStyleListItem'

function TextStyleBoxComponent ({ list, value, stateKey }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative mx-7'>
      <div
        className='w-fit min-w-[190px] bg-white p-2 border-[1px] border-[#0000002d] rounded-md flex justify-between items-center'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <p className='text-slate-700 mr-2'>{value}</p>
        <img
          src='https://cdn-icons-png.flaticon.com/512/32/32195.png'
          className='h-3 mr-2'
          alt=''
        />
      </div>
      <TextStyleListItemContainer display={isOpen} stateKey={stateKey}>
        {list.map((item, index) => (
          <TextStyleListItem
            key={index}
            index={index}
            stateKey={stateKey}
            value={item}
            setIsOpen={setIsOpen}
          />
        ))}
      </TextStyleListItemContainer>
    </div>
  )
}

export default TextStyleBoxComponent
