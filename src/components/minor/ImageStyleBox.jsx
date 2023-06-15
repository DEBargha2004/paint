import { useContext, useEffect } from 'react'
import Appstate from '../../hooks/appstate'
import TextStyleBoxWrapper from './TextStyleBoxWrapper'
import { ImageDecoList } from '../../assets/Tools'
import ImageDeco from './ImageDeco'

function ImageStyleBox () {
  const { selected, setImageDataInDOM, imageDataInDOM } = useContext(Appstate)
  useEffect(() => {
    const handleKeyPress = e => {
      if (selected === 102) {
        if (e.key === 'B') {
          setImageDataInDOM(prev => ({ ...prev, boundary: !prev.boundary }))
        } else if (e.key === 'F') {
          setImageDataInDOM(prev => ({ ...prev, fit: !prev.fit }))
        } else if (e.key === 'V') {
          setImageDataInDOM(prev => ({
            ...prev,
            flip_vertical: !prev.flip_vertical
          }))
        } else if (e.key === 'H') {
          setImageDataInDOM(prev => ({
            ...prev,
            flip_horizontal: !prev.flip_horizontal
          }))
        }
      }
    }
    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [selected, setImageDataInDOM])
  return selected === 102 || imageDataInDOM.getting_used ? (
    <TextStyleBoxWrapper>
      {ImageDecoList.map((item, index) => {
        return <ImageDeco {...item} key={item.id} />
      })}
    </TextStyleBoxWrapper>
  ) : null
}

export default ImageStyleBox
