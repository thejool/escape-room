import React from 'react';
import Draggable from 'react-draggable';

const withWindow = Window => {
  const WithWindow = ({label, onClose, onMinimize, onMaximize, ...props}) => {
    return (
      <Draggable
        handle=".window__header__handle"
        defaultPosition={{ x: 160, y: 100 }}
        scale={1}
        //onStart={handleStart}
        //onDrag={handleDrag}
        //onStop={handleStop}
      >
        <div className="window">
          <header className="window__header">
            <div className="window__header__handle">
              {label}
            </div>
            <div className="window__header__actions">
              {/* <button onClick={onMinimize} className="window__header__actions__minimize"></button> */}
              {/* <button onClick={onMaximize} className="window__header__actions__maximize"></button> */}
              <button onClick={onClose} className="window__header__actions__close"></button>
            </div>
          </header>

          <div className="window__content">
            <Window {...props} />
          </div>
        </div>
      </Draggable>
    )
  }

  return WithWindow
}

export default withWindow