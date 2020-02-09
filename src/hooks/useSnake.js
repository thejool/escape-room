import { useReducer, useEffect, useRef, useCallback } from 'react'

const offsets = {
  n: [0, 1],
  s: [0, -1],
  e: [1, 0],
  w: [-1, 0],
}

const equals = (a, b) =>
  a[0] === b[0] && a[1] === b[1]

const randomIndex = (length) =>
  Math.trunc(Math.random() * length)

const addToSnakeMap = (map, [x, y]) => {
  map[x] = map[x] || {}
  map[x][y] = true
}

const removeFromSnakeMap = (map, [x, y]) => {
  const row = map[x]
  delete row[y]
}

let code = ''
export function useSnake(boardSize, speed) {
  const start = Math.trunc(boardSize.y / 2)
  const currentSpeed = speed

  const initialState = {
    snake: [[start, start]],
    snakeMap: {
      [start]: {
        [start]: true,
      },
    },
    alive: true,
    food: null,
    score: 0,
  }

  const [game, moveSnake] = useReducer(
    (
      { snake, snakeMap, alive, food, score },
      direction,
    ) => {
      if(direction === 'reset') {
        return initialState
      }
      const [[x, y]] = snake
      const [dX, dY] = offsets[direction]
      const head = [x + dX, y + dY]
      const coord = {x: x + dX, y: y + dY}

      if (
        coord.y < 0
        || coord.x < 0
        || coord.x >= boardSize.x 
        || coord.y >= boardSize.y 
        || snake.find(part => equals(part, head))
      ) {
        alive = false
      } else {
        snake = [head, ...snake]
        addToSnakeMap(snakeMap, head)

        if (food && equals(food, head)) {
          score++
          food = null
          if(score >= 20) code = '5983'
        } else {
          removeFromSnakeMap(snakeMap, snake.pop())

          if (food === null && Math.random() > 1 / 3) {
            const openCoords = []

            for (let i = 0; i < boardSize.x; i++) {
              for (let j = 0; j < boardSize.y; j++) {
                if (!snakeMap[i] || !snakeMap[i][j]) {
                  openCoords.push([i, j])
                }
              }
            }
            food = openCoords[randomIndex(openCoords.length)]
          }
        }
      }

      return {
        snake,
        snakeMap,
        alive,
        food,
        score,
      }
    },
    initialState
  )
  
  const directionRef = useRef('s')

  const updateDirection = useCallback(
    (dir) => (directionRef.current = dir),
    [directionRef],
  )

  const { alive, score } = game

  useEffect(() => {
    if (alive) {
      const interval = setInterval(() => {
        moveSnake(directionRef.current)
      }, currentSpeed - (score * 4))

      return () => clearInterval(interval)
    }
  }, [currentSpeed, alive, score])

  return {
    updateDirection,
    direction: directionRef.current,
    ...game,
    code,
  }
}