import React, { useState, useEffect } from 'react'
import Draggable from 'react-draggable'
import { xFrameBypass } from '../helpers'

xFrameBypass()

const InternetExplorer = ({initialAddress = '', onClose, iframe, active, onClick}) => {
  const [value, setValue] = useState(initialAddress)
  const [address, setAddress] = useState(initialAddress)
  const [onTop, setOnTop] = useState(false)
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  
  const browseAddress = (e) => {
    if (e.key === 'Enter') {
      const url = e.target.value.split('//')
      const newUrl = 'https://' + url[url.length - 1]
      setAddress(newUrl)
    }
  }

  return (
    <Draggable
      handle=".internet-explorer__handle"
      defaultPosition={{ x: 110, y: 100 }}
      scale={1}
      style={{ zIndex: onTop ? 20 : 0}}
    >
      <div className="internet-explorer" onClick={onClick}>
        <div className="internet-explorer__handle">
        </div>
        
        <button onClick={onClose} className="internet-explorer__close"></button>
        <button onClick={browseAddress} className="internet-explorer__go"></button>

        <input onChange={handleChange} onKeyDown={browseAddress} value={value} className="internet-explorer__input" />

        {iframe
        ? iframe
        : <iframe is="x-frame-bypass" title={address} class="internet-explorer__browser" src={address}></iframe>
        }
      </div>
    </Draggable>
  )
}

export default InternetExplorer