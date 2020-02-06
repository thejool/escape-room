import React, { useState } from 'react'
import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'

import withWindow from './withWindow'
import DesktopIcon from './components/DesktopIcon'
import Snake from './components/Snake'
import InternetExplorer from './components/InternetExplorer'
import Paint from './components/Paint'
import Editor from './components/Editor'
import StartButton from './components/StartButton'
import snakeIcon from './img/snake.png'
import notepadIcon from './img/notepad.png'
import ie from './img/ie.png'
import folder from './img/folder.png'
import paint from './img/paint.png'
import trash from './img/trash.png'
import './App.scss'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)
Amplify.addPluggable(new AmazonAIPredictionsProvider())

const App = () => {
  const [app, setApp] = useState()
  const SnakeWithWindow = withWindow(Snake)
  const PaintWithWindow = withWindow(Paint)
  const EditorWithWindow = withWindow(Editor)

  return (
    <div className="App">      
      <section className="app-desktop">
        <DesktopIcon 
          onClick={() => setApp('ie')} 
          position={{x: 0, y: 20}} 
          label="Internet Explorer" 
          image={ie} />
        <DesktopIcon 
          onClick={() => setApp()} 
          position={{x: 0, y: 60}} 
          label="Folder" 
          image={folder} />
        <DesktopIcon 
          onClick={() => setApp('snake')} 
          position={{x: 0, y: 100}} 
          label="Snake" 
          image={snakeIcon} />
        <DesktopIcon 
          onClick={() => setApp()} 
          position={{x: 0, y: 160}} 
          label="Trashbin" 
          image={trash} />
        <DesktopIcon 
          onClick={() => setApp('paint')} 
          position={{x: 0, y: 220}} 
          label="Paint" 
          image={paint} />
        <DesktopIcon 
          onClick={() => setApp('notepad')} 
          position={{x: 0, y: 280}} 
          label="Notepad" 
          image={notepadIcon} />
        
        {app === 'ie' && <InternetExplorer label="Knowit Trainee" onClose={() => setApp(null)} initialAddress={'https://www.knowit.se/karriar/trainee/'} />}
        {app === 'snake' && <SnakeWithWindow boardSize={{x: 48, y: 15}} speed={200} label="Snake" onClose={() => setApp(null)} />}
        {app === 'paint' && <PaintWithWindow label="Paint" onClose={() => setApp(null)} />}
        {app === 'notepad' && <EditorWithWindow label="Notepad" onClose={() => setApp(null)} />}
        
      </section>

      <footer className="app-footer">
        <StartButton />
      </footer>
    </div>
  )
}

export default App
