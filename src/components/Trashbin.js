import React from 'react'
import DesktopIcon from './DesktopIcon'
import ie from '../img/ie.png'


const Trashbin = () => {
  return (
    <>
      <DesktopIcon 
        position={{x: 0, y: 20}} 
        label="lorem-ipsum.html" 
        color="#202020"
        disabled={true}
        image={ie} />
      <DesktopIcon 
        position={{x: 90, y: 20}} 
        label="evry.html" 
        color="#202020"
        disabled={true}
        image={ie} />
      <DesktopIcon 
        position={{x: 190, y: 20}} 
        label="accenture.html" 
        color="#202020"
        disabled={true}
        image={ie} />
      <DesktopIcon 
        position={{x: 0, y: 130}} 
        label="capgemini.html" 
        color="#202020"
        disabled={true}
        image={ie} />
    </>
  )
}

export default Trashbin