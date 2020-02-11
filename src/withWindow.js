import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const withWindow = (Window) => {
  const WithWindow = ({active, onClick, label, onClose, onMinimize, onMaximize, ...props}) => {
    const [onTop, setOnTop] = useState(false)
    useEffect(() => {
      console.log('setOnTop')
      console.log(active)
      setOnTop(active)
    }, [active])

    return (
      <Draggable
        handle=".window__header__handle"
        defaultPosition={{ x: 160, y: 100 }}
        scale={1}
        style={{zIndex: onTop ? 20 : 0}}
      >
        <div className="window" onClick={onClick}>
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