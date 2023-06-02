
function SelectedImageHover({ x, y, image }) {
  return (
    <div
      className="absolute h-10 w-8 bg-cover"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <img
        className={`absolute top-0 left-0 h-full w-full bg-cover z-0 opacity-70`}
        style={{userSelect:'none'}}
        src={image}
      />
    </div>
  );
}

export default SelectedImageHover;
