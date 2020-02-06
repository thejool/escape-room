import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { xFrameBypass } from '../helpers'

xFrameBypass()

const InternetExplorer = ({initialAddress, onClose}) => {
  const [value, setValue] = useState(initialAddress)
  const [address, setAddress] = useState(initialAddress)

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  
  const browseAddress = (e) => {
    if (e.key === 'Enter') {
      const url = e.target.value.split('//')
      const newUrl = 'http://' + url[url.length - 1]
      setAddress(newUrl)
    }
  }

  return (
    <Draggable
      handle=".internet-explorer__handle"
      defaultPosition={{ x: 110, y: -400 }}
      scale={1}
    >
      <div className="internet-explorer">
        <div className="internet-explorer__handle">
        </div>
        
        <button onClick={onClose} className="internet-explorer__close"></button>

        <input onChange={handleChange} onKeyDown={browseAddress} value={value} className="internet-explorer__input" />

        <iframe is="x-frame-bypass" title={address} class="internet-explorer__browser" src={address}></iframe>
      </div>
    </Draggable>
  )
}

export default InternetExplorer