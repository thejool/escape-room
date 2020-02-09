import React, { useState, useEffect } from 'react'
import { useSnake } from '../hooks/useSnake'

function Snake({ boardSize, speed, setProps }) {
  const [playGame, setPlayGame] = useState(true);

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
  
  let board = ` score: ${score} ${code && 'code: ' + code} \n`
  const [head] = snake

  const drawHead = () => {
    switch (direction) {
      case 'n':
        return 'A '
      case 's':
        return 'V '
      case 'e':
        return '> '
      case 'w':
        return '< '
      default:
        return null
    }
  }
  
  const startGame = () => {
    setProps({x: 28, y: 28})
    setPlayGame(true)
  }

  for (let i = boardSize.y - 1; i >= 0; i--) {
    board += ' '
    for (let j = 0; j < boardSize.x; j++) {
      if (snakeMap[j] && snakeMap[j][i]) {
        board += j === head[0] && i === head[1] ? drawHead() : '0 '
      } else if (food && j === food[0] && i === food[1]) {
        board += 'X '
      } else {
        board += '  '
      }
    }
    board += ' \n'
  }

  return (
    <div className="snake">
      <pre className="snake__game">{board}</pre>
      {!playGame &&
        <div className="snake-menu">
          <h1 className="snake-menu__heading">GAME OVER!</h1>
          <button className="snake-menu__button" onClick={startGame}>Start game</button>
        </div>
      }
    </div>
  )
}

export default Snake