import { shuffle } from './array'

const GRID_SIZE = 10

function generateWordSearch(words: string[]): string[][] {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => '.')
  )

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  for (const word of shuffle(words)) {
    let placed = false
    while (!placed) {
      const row = Math.floor(Math.random() * GRID_SIZE)
      const col = Math.floor(Math.random() * GRID_SIZE)
      const dir = directions[Math.floor(Math.random() * directions.length)]

      if (canPlaceWord(grid, row, col, dir, word)) {
        placeWord(grid, row, col, dir, word)
        placed = true
      }
    }
  }

  fillRemaining(grid)
  return grid
}

function canPlaceWord(
  grid: string[][],
  row: number,
  col: number,
  dir: [number, number],
  word: string
): boolean {
  const [dx, dy] = dir
  for (let i = 0; i < word.length; i++) {
    if (
      row < 0 ||
      row >= GRID_SIZE ||
      col < 0 ||
      col >= GRID_SIZE ||
      (grid[row][col] !== '.' && grid[row][col] !== word[i])
    ) {
      return false
    }
    row += dx
    col += dy
  }
  return true
}

function placeWord(
  grid: string[][],
  row: number,
  col: number,
  dir: [number, number],
  word: string
) {
  const [dx, dy] = dir
  for (let i = 0; i < word.length; i++) {
    grid[row][col] = word[i]
    row += dx
    col += dy
  }
}

function fillRemaining(grid: string[][]) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === '.') {
        grid[row][col] = chars[Math.floor(Math.random() * chars.length)]
      }
    }
  }
}
