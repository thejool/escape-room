import React, { useState, useEffect } from 'react'
import Amplify from '@aws-amplify/core'
import uuidv1 from 'uuid/v1'

import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'

import withWindow from './withWindow'
import BlueScreen from './components/BlueScreen'
import LoadingScreen from './components/LoadingScreen'
import LoginScreen from './components/LoginScreen'
import FinishedScreen from './components/FinishedScreen'

import DesktopIcon from './components/DesktopIcon'
import Snake from './components/Snake'
import InternetExplorer from './components/InternetExplorer'
import Paint from './components/Paint'
import Editor from './components/Editor'
import Instructions from './components/Instructions'
import Treasure from './components/Treasure'
import Trashbin from './components/Trashbin'
import Footer from './components/Footer'

import msnIcon from './img/msn.png'
import treasureIcon from './img/treasure_chest.png'
import snakeIcon from './img/snake.png'
import notepadIcon from './img/notepad.png'
import ie from './img/ie-icon.png'
import folder from './img/folder.png'
import paint from './img/paint.png'
import trash from './img/trash.png'
import './App.scss'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)
Amplify.addPluggable(new AmazonAIPredictionsProvider())

const teamID = uuidv1()
const App = () => {
  // const teamID = '40d02a10-4b37-11ea-8fe3-7f4ae56393f2'
  const [teamName, setTeamName] = useState()
  const [disableTimer, setDisableTimer] = useState(false)
  const [boardSize, setBoardSize] = useState({x: 28, y: 28})
  const [app, setApp] = useState('loading')
  const SnakeWithWindow = withWindow(Snake)
  const PaintWithWindow = withWindow(Paint)
  const EditorWithWindow = withWindow(Editor)
  const InstructionsWithWindow = withWindow(Instructions)
  const TrashbinWithWindow = withWindow(Trashbin)
  const TreasureWithWindow = withWindow(Treasure)
  const [startTime, setStartTime] = useState()

  useEffect(() => {
    if(startTime === undefined && (app === null || app === undefined)) {
      setStartTime(new Date())
    }
  }, [app, startTime])
  const Developers = () => <iframe width="560" height="315" src="https://www.youtube.com/embed/Vhh_GeBPOhs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  const onEscapeRoom = () => {
    setDisableTimer(true)

    setApp('finished')
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
          onClick={() => setApp('bluescreen')} 
          position={{x: 0, y: 130}} 
          label="MSN" 
          image={msnIcon} />
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
          label="Escape" 
          image={treasureIcon} />
        <DesktopIcon 
          onClick={() => setApp('developers')} 
          position={{x: 100, y: 130}} 
          label="Developers" 
          image={ie} />
        <DesktopIcon 
          onClick={() => setApp('swagger')} 
          position={{x: 100, y: 240}} 
          label="Swagger" 
          image={ie} />
        <DesktopIcon 
          onClick={() => setApp('instructions')} 
          position={{x: 100, y: 350}} 
          label="instructions.txt" 
          image={notepadIcon} />
        <DesktopIcon 
          onClick={() => setApp('bluescreen')} 
          position={{x: 100, y: 460}} 
          label="Files N stuff" 
          image={folder} />
        
        {app === 'loading' && <LoadingScreen onClick={() => setApp('login')} />}
        {app === 'login' && <LoginScreen onClick={() => setApp(null)} setTeamName={setTeamName} teamID={teamID} />}
        {app === 'bluescreen' && <BlueScreen onClick={() => setApp(null)} />}
        {app === 'finished' && <FinishedScreen onClick={() => setApp(null)} startTime={startTime} teamName={teamName} />}
        {app === 'ie' && <InternetExplorer label="Knowit Trainee" onClose={() => setApp(null)} initialAddress={'https://www.knowit.se/karriar/trainee/'} />}
        {app === 'snake' && <SnakeWithWindow setProps={setBoardSize} boardSize={boardSize} speed={180} label="Snake" onClose={() => setApp(null)} />}
        {app === 'paint' && <PaintWithWindow label="Paint" onClose={() => setApp(null)} />}
        {app === 'notepad' && <EditorWithWindow label="Notepad" onClose={() => setApp(null)} />}
        {app === 'trashbin' && <TrashbinWithWindow label="Trashbin" onClose={() => setApp(null)} />}
        {app === 'treasure' && <TreasureWithWindow label="Escape" onClose={() => setApp(null)} onEscapeRoom={onEscapeRoom} teamName={teamName} teamID={teamID} />}
        {app === 'developers' && <InternetExplorer label="Developers" onClose={() => setApp(null)} iframe={<Developers />} />}
        {app === 'swagger' && <InternetExplorer label="Swagger" onClose={() => setApp(null)} initialAddress='https://casemysteryapi.azurewebsites.net/swagger/index.html' />}
        {app === 'instructions' && <InstructionsWithWindow label="Instructions" onClose={() => setApp(null)} />}
        
      </section>

      <Footer stopTimer={disableTimer} />
    </div>
  )
}

export default App
