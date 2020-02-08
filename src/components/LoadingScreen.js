import React from 'react'
import windowsXP from '../img/windows-xp.gif'

const LoadingScreen = ({onClick}) => {
  return (
    <div className="loading-screen" onClick={onClick}>
      <img src={windowsXP} alt="Windows XP" />
    </div>
  )
}

export default LoadingScreen
