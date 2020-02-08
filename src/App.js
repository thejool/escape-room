import React, { useState, useEffect } from 'react'
import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'
import uuidv1 from 'uuid/v1'

import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'

import withWindow from './withWindow'
import LoadingScreen from './components/LoadingScreen'
import LoginScreen from './components/LoginScreen'

import DesktopIcon from './components/DesktopIcon'
import Snake from './components/Snake'
import InternetExplorer from './components/InternetExplorer'
import Paint from './components/Paint'
import Editor from './components/Editor'
import Treasure from './components/Treasure'
import Trashbin from './components/Trashbin'
import StartButton from './components/StartButton'

import treasureIcon from './img/treasure_chest.svg'
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
  const teamID = uuidv1()
  const [screen, setScreen] = useState('loading')
  const [teamName, setTeamName] = useState()
  const [app, setApp] = useState()
  const SnakeWithWindow = withWindow(Snake)
  const PaintWithWindow = withWindow(Paint)
  const EditorWithWindow = withWindow(Editor)
  const TrashbinWithWindow = withWindow(Trashbin)
  const TreasureWithWindow = withWindow(Treasure)

  // useEffect(() => {
  //   if(!teamName) {
  //     let name = ''
  //     while(name === '') {
  //       name = prompt("Please select a team name:");
  //     }
  //     setTeamName(name)
  //     let data = {
  //         body: {
  //           id: teamID,
  //           teamName: name,
  //         },
  //     }
  
  //     API.post('escapeRoom', '/competitions', data).then(response => {
  //       // Add your code here
  //       console.log(response)
  //     }).catch(error => {
  //       console.log(error.response)
  //     });
  //   }
  // }, [teamID, teamName])

  if(screen === 'loading') {
    return <LoadingScreen onClick={() => setScreen('login')} />
  }
  
  if(screen === 'login') {
    return <LoginScreen onClick={() => setScreen('desktop')} />
  }

  return (
    <div className="App">      
      {teamName && 
        <div className="app-teamname">
          {teamName}
        </div>
      }

      <section className="app-desktop">
        <DesktopIcon 
          onClick={() => setApp('ie')} 
          position={{x: 0, y: 20}} 
          label="Internet Explorer" 
          image={ie} />
        <DesktopIcon 
          onClick={() => setApp()} 
          position={{x: 0, y: 130}} 
          label="Folder" 
          image={folder} />
        <DesktopIcon 
          onClick={() => setApp('snake')} 
          position={{x: 0, y: 240}} 
          label="Snake" 
          image={snakeIcon} />
        <DesktopIcon 
          onClick={() => setApp('trashbin')} 
          position={{x: 0, y: 350}} 
          label="Trashbin" 
          image={trash} />
        <DesktopIcon 
          onClick={() => setApp('paint')} 
          position={{x: 0, y: 460}} 
          label="Paint" 
          image={paint} />
        <DesktopIcon 
          onClick={() => setApp('notepad')} 
          position={{x: 0, y: 570}} 
          label="Notepad" 
          image={notepadIcon} />
        <DesktopIcon 
          onClick={() => setApp('treasure')} 
          position={{x: 100, y: 20}} 
          label="Treasure" 
          image={treasureIcon} />
        
        {app === 'ie' && <InternetExplorer label="Knowit Trainee" onClose={() => setApp(null)} initialAddress={'https://www.knowit.se/karriar/trainee/'} />}
        {app === 'snake' && <SnakeWithWindow boardSize={{x: 48, y: 15}} speed={200} label="Snake" onClose={() => setApp(null)} />}
        {app === 'paint' && <PaintWithWindow label="Paint" onClose={() => setApp(null)} />}
        {app === 'notepad' && <EditorWithWindow label="Notepad" onClose={() => setApp(null)} />}
        {app === 'trashbin' && <TrashbinWithWindow label="Trashbin" onClose={() => setApp(null)} />}
        {app === 'treasure' && <TreasureWithWindow label="Treasure" onClose={() => setApp(null)} teamName={teamName} teamID={teamID} />}
        
      </section>

      <footer className="app-footer">
        <StartButton />
      </footer>
    </div>
  )
}

export default App
