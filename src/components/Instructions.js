import React from 'react'

import CodeMirror from "react-codemirror"
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'


const Instructions = () => {
  const instructions = `
There are 9 challenges to solve.
Some of them are digital while other are physical.

Remember that this is a collaboration game, all players have to participate during every challenge.

All programs on the desktop might not help you solve a challenge.

`;

  const options = {
    mode: null,
    readOnly: true,
  }

  return (
    <div className="code">
      <CodeMirror value={instructions} options={options} />
    </div>
  )
}

export default Instructions