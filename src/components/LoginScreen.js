import React, { useState } from 'react'
import windowsXPLogin from '../img/xp-login.png'
import API from '@aws-amplify/api'

const LoginScreen = ({onClick, teamID, setTeamName}) => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState()

  const saveTeamName = () => {
    if(!value) {
      alert('Choose a team name');
      return
    }
    
    setLoading(true)

    // useEffect(() => {
    let data = {
        body: {
          id: teamID,
          teamName: value,
        },
    }

    API.post('escapeRoom', '/competitions', data).then(response => {
      // Add your code here
      setTeamName(value)
      var object = { lsTeamName: value, lsTeamID: teamID, timestamp: new Date().getTime()}
      localStorage.setItem("escape-room-team", JSON.stringify(object));

      setLoading(false)
      onClick()
    }).catch(error => {
      console.log(error.response)
    });
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={'login-screen ' + (loading && ' login-screen--loading')}>
      <img src={windowsXPLogin} alt="Windows XP" />

      <div className="login">
        <label className="login__label" htmlFor="login-teamName">Team name:</label>
        <input type="text" className="login__input" id="login-teamName" onChange={handleChange} value={value} />

        <button className="login__button" onClick={saveTeamName} disabled={loading || value === ''}>Save</button>
      </div>
    </div>
  )
}

export default LoginScreen
