import React, { useState, useEffect } from 'react'
import { useSnake } from '../hooks/useSnake'

function Snake(props) {
  const [playGame, setPlayGame] = useState(true);

  const { boardSize, speed } = props
  const {
    snake,
    snakeMap,
    food,
    alive,
    score,
    updateDirection,
    direction,
    code
  } = useSnake(boardSize, speed)

  useEffect(() => {
    const cb = (e) => {
      switch (e.which) {
        case 37: // left
          updateDirection('w')
          break
        case 38: // up
          updateDirection('n')
          break
        case 39: // right
          updateDirection('e')
          break
        case 40: // down
          updateDirection('s')
          break
        default:
          return
      }
    }

    window.addEventListener('keydown', cb)
    return () => {
      window.removeEventListener('keydown', cb)
    }
  }, [updateDirection])

  useEffect(() => {
    if(alive === false) {
      setPlayGame(false)
    }
  }, [alive])
  
  useEffect(() => {
    console.log('playGame')
    console.log(playGame)
    console.log(alive)
    if(playGame === true && alive === false) {
      console.log('hehe')
      updateDirection('reset')
    }
  }, [playGame, alive, updateDirection])

  let board = `score: ${score} code: ${code} \n`
  const [head] = snake

  const drawHead = () => {
    switch (direction) {
      case 'n':
        return '▲'
      case 's':
        return '▼ '
      case 'e':
        return '▶ '
      case 'w':
        return '◀ '
      default:
        return null
    }
  }
  
  for (let i = boardSize.y - 1; i >= 0; i--) {
    board += ' '
    for (let j = 0; j < boardSize.x; j++) {
      if (snakeMap[j] && snakeMap[j][i]) {
        board += j === head[0] && i === head[1] ? drawHead() : '▣ '
      } else if (food && j === food[0] && i === food[1]) {
        board += 'X '
      } else {
        board += '  '
      }
    }
    board += ' \n'
  }

  return (
    <>
      {(playGame)  
      ? <pre className="snake">{board}</pre>
      : <div className="snake-menu">
          <h1 className="snake-menu__heading">GAME OVER!</h1>
          <button className="snake-menu__button" onClick={() => setPlayGame(true)}>Start game</button>
        </div>
      }
    </>
  )
}

export default Snake