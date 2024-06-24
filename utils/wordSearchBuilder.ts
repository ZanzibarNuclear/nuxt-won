export function generateWordSearch(words, size) {
  // Initialize the grid
  let grid = Array(size)
    .fill()
    .map(() => Array(size).fill(''))

  // Place words in the grid
  for (let word of words) {
    const capitalized = word.toUpperCase().replace(/\s/g, '')
    let placed = false
    while (!placed) {
      let direction = Math.floor(Math.random() * 3) // 0: horizontal, 1: vertical, 2: diagonal
      let row = Math.floor(Math.random() * size)
      let col = Math.floor(Math.random() * size)

      if (canPlaceWord(grid, capitalized, row, col, direction)) {
        placeWord(grid, capitalized, row, col, direction)
        placed = true
      }
    }
  }

  // Fill empty spaces with random letters
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
      }
    }
  }

  return grid
}

function canPlaceWord(grid, word, row, col, direction) {
  let size = grid.length
  if (direction === 0 && col + word.length > size) return false
  if (direction === 1 && row + word.length > size) return false
  if (direction === 2 && (row + word.length > size || col + word.length > size))
    return false

  for (let i = 0; i < word.length; i++) {
    let r = direction === 1 ? row + i : direction === 2 ? row + i : row
    let c = direction === 0 ? col + i : direction === 2 ? col + i : col
    if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false
  }

  return true
}

function placeWord(grid, word, row, col, direction) {
  for (let i = 0; i < word.length; i++) {
    let r = direction === 1 ? row + i : direction === 2 ? row + i : row
    let c = direction === 0 ? col + i : direction === 2 ? col + i : col
    grid[r][c] = word[i]
  }
}

// Example usage
// let words = ['JAVASCRIPT', 'HTML', 'CSS', 'REACT', 'NODE']
// let size = 15
// let wordSearch = generateWordSearch(words, size)

// // Print the word search
// for (let row of wordSearch) {
//   console.log(row.join(' '))
// }
