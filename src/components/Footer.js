import React, { useState } from 'react'
import StartButton from './StartButton'
import useInterval from '../hooks/useInterval'

const Footer = ({stopTimer}) => {
  const [time, setTime] = useState(3600000)
  
  useInterval(() => {
    setTime(time - 1000)
  }, 1000, stopTimer)

  const msToTime = (s) => {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;
    secs = secs > 9 ? secs : '0' + secs
    mins = mins > 9 ? mins : '0' + mins
    hrs = hrs > 9 ? hrs : '0' + hrs
    return hrs + ':' + mins + ':' + secs;
  }

  return (
    <footer className="app-footer">
        <StartButton />

        <div className="app-footer__time">
          {msToTime(time)}
        </div>
      </footer>
  )
}

export default Footer
