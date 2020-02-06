import React, { useState } from 'react'

import { fizzBuzz } from '../helpers';
import CodeMirror from "react-codemirror"
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'


const Editor = (props) => {
  const [code, setCode] = useState(`const fizzBuzz = () => {\n   // Your code here \n} \n\n fizzBuzz()`)
  const options = {
    mode: 'javascript',
    lineNumbers: true,
  }

  const saveFile = () => {
    const userAnswer = eval(code)
    const correctAnswer = fizzBuzz()
    let valid = false
    if(typeof userAnswer === 'object') {
      userAnswer.forEach((item, i) => {
        valid = item === correctAnswer[i] ? true : false
      })
    }

    if(valid) {
      alert('Wohoo! Your code is: 1321')
    } else {
      alert('Not correct, try again!')
    }
  }

  return (
    <div className="code">
      <button onClick={saveFile}>Save</button>
      <CodeMirror value={code} onChange={setCode} options={options} />
    </div>
  )
}

export default Editor