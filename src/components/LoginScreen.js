import React, { useState } from 'react'
import windowsXPLogin from '../img/xp-login.png'

const LoginScreen = ({onClick}) => {
  const [value, setValue] = useState()

  return (
    <div className="login-screen" onClick={onClick}>
      <img src={windowsXPLogin} alt="Windows XP" />

      <form>
        <label hmtlFor="login-teamName">Team name:</label>
        <input className="login-teamName" id="login-teamName" onChange={setValue} value={value} />
      </form>
    </div>
  )
}

export default LoginScreen
