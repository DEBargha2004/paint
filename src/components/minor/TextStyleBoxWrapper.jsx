function TextStyleBoxWrapper({children}) {
  return (
    <div className="flex justify-end items-center z-20">
      <div
        style={{
          width: window.innerWidth - 400,
          marginRight: "39px",
        }}
        className="absolute h-fit flex bottom-[-50px] justify-start items-center p-3 bg-gray-50 rounded-lg shadow-lg shadow-[#0000003f] z-20"
      >
        {children}
      </div>
    </div>
  );
}

export default TextStyleBoxWrapper;
