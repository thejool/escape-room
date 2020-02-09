import React, { useState, useRef, useEffect } from 'react'
import xpLogo from '../img/xp-logo.png'
import StartMenu from './StartMenu'

const StartButton = (props) => {
  const [showMenu, setShowMenu] = useState(false)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    if(showMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [showMenu])

  return (
    <div className="app-footer__start" ref={ref}>
      {showMenu && false && <StartMenu />}

      <button className="app-footer__start-button" onClick={() => setShowMenu(!showMenu)}>
        <img src={xpLogo} alt="Windows XP" className="app-footer__start-button__img" />
        
        <span className="app-footer__start-button__text">
          Start
        </span>
      </button>

    </div>
  )
}

export default StartButton