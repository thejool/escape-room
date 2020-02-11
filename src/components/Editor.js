import React, { useState } from 'react'

import { fizzBuzz } from '../helpers';
import CodeMirror from "react-codemirror"
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'


const Editor = (props) => {
  const [code, setCode] = useState(`const fizzBuzz = () => {\n  // 1. Write a program in JAVASCRIPT that prints the numbers from 1 to 100. \n  // 2. For numbers divisible by 3, print “Fizz” \n  // 3. For numbers divisible by 5, print “Buzz” \n  // 4. For numbers divisible by both 3 and 5, print “FizzBuzz” \n  // 5. Store your results in the array by pushing them to it \n\n  const result = [] \n\n  // Your code here \n\n  return result \n} \n\n fizzBuzz()`)

  const options = {
    mode: 'javascript',
    lineNumbers: true,
  }

  const saveFile = () => {
    try {
      const userAnswer = eval(code)
      const correctAnswer = fizzBuzz()
      let valid = false
      if(typeof userAnswer === 'object') {
        userAnswer.forEach((item, i) => {
          valid = item === correctAnswer[i] ? true : false
        })
      }
  
      if(valid) {
        alert('Wohoo! Your code is: 8912')
      } else {
        alert('Not correct, try again!')
      }
    }
    catch(err) {
      console.log(err)
      alert('Syntax error, try again.')
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