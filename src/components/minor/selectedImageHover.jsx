function SelectedImageHover ({ x, y, image }) {
  return (
    // <div
    //   className='absolute h-10 w-8'
    //   style={{
    //     top: `${y}px`,
    //     left: `${x}px`
    //   }}
    // >
      <img
        className={`absolute top-0 left-0 h-10 w-8 object-cover z-0 opacity-70`}
        style={{
          userSelect: 'none',
          top: `${y}px`,
          left: `${x}px`
        }}
        src={image}
      />
    // </div>
  )
}

export default SelectedImageHover
