import React, {useState} from 'react'
import bluescreen from '../img/bluescreen.jpg'
import useInterval from '../hooks/useInterval'

const BlueScreen = ({onClick}) => {
  const [disabled, setDisabled] = useState(false)

  useInterval(() => {
    console.log(disabled)

    if(!disabled) {
      setDisabled(true)  
    }
  }, 5000, disabled)

  if(!disabled) {
    return <div className="blue-screen--loading"></div>
  }

  return (
    <div className="blue-screen" onClick={onClick}>
      <img src={bluescreen} alt="bluescreen" />
    </div>
  )
}

export default BlueScreen
