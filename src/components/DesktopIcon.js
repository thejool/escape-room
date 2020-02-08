import React from 'react';
import Draggable from 'react-draggable';

const DesktopIcon = ({ onClick, image, position, label, color, disabled }) => {
  return (
    <Draggable
      handle=".desktop-icon"
      defaultPosition={position}
      scale={1}
      disabled={disabled}
      //onStart={handleStart}
      //onDrag={handleDrag}
      //onStop={handleStop}
    >
      <button onDoubleClick={onClick} className="desktop-icon">
        <img src={image} draggable="false" alt="" className="desktop-icon__img" />

        <div className="desktop-icon__label" style={{color: color}}>{label}</div>
      </button>
    </Draggable>
  )
}

export default DesktopIcon