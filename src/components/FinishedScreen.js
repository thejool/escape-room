import React from 'react'
import celebrate from '../img/celebrate.gif'

const FinishedScreen = ({onClick, teamName, startTime}) => {
  const differenceInTime = (start, current) => {
    let time = current.getTime() - start.getTime()
    let ms = time % 1000;
    time = (time - ms) / 1000;
    let secs = time % 60;
    time = (time - secs) / 60;
    let mins = time % 60;
    let hrs = (time - mins) / 60;
    secs = secs > 9 ? secs : '0' + secs
    mins = mins > 9 ? mins : '0' + mins
    hrs = hrs > 9 ? hrs : '0' + hrs

    return mins + ' minutes and ' + secs + ' seconds';
  }

  const currentTime = new Date()
  return (
    <div className="finished-screen">
      <div className="congratz-close" onClick={onClick}>Close</div>

      <div className="congratz">
        <h1>Congratulations {teamName}</h1>
        <div>Good job! You escaped in {differenceInTime(startTime, currentTime)}!</div>
        <a href="https://www.knowit.se/karriar/trainee" target="_blank">
          Apply to our traineprogram here
        </a>
      </div>
      <img src={celebrate} alt="Fireworks" />
    </div>
  )
}

export default FinishedScreen
