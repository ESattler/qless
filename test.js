let tiles = [
  { x: 1, y: 3, letter: 'J', id: 0 },
  { x: 1, y: 5, letter: 'S', id: 1 },
  { x: 2, y: 4, letter: 'C', id: 2 },
  { x: 0, y: 4, letter: 'G', id: 3 },
  { x: 1, y: 2, letter: 'V', id: 4 },
  { x: 1, y: 4, letter: 'H', id: 5 },
]

// let farthestTopLeft;
// tiles.forEach(tile => {
//   if (!farthestTopLeft) {
//     farthestTopLeft = tile;
//   }
//   if (tile.x <= farthestTopLeft.x && tile.y <= farthestTopLeft.y) {
//     farthestTopLeft = tile;
//   } 
// })

// console.log(farthestTopLeft)


function getNeighbors(tile) {
  let upNeighbor = null;
  let downNeighbor = null;
  let rightNeighbor = null;
  let leftNeighbor = null;
  tiles.forEach(tempTile => {
    
    if (tempTile.x === tile.x && tempTile.y - tile.y === -1) {
      upNeighbor = tempTile
    }
    
    if (tempTile.x === tile.x && tempTile.y - tile.y === 1) {
      downNeighbor = tempTile
    }
    
    if (tempTile.x - tile.x === 1 && tempTile.y  ===tile.y) {
      rightNeighbor = tempTile
    }
    
    if (tempTile.x - tile.x === -1 && tempTile.y  ===tile.y) {
      leftNeighbor = tempTile
    }
  })
  return [upNeighbor, downNeighbor, leftNeighbor, rightNeighbor];
}

function getWordDown(tile) {
  const [up, down, left, right] = getNeighbors(tile)
  if (!down) {
    return tile.letter
  }
  return `${tile.letter}${getWordDown(down)}`
}

function getWordRight(tile) {
  const [up, down, left, right] = getNeighbors(tile)
  if (!right) {
    return tile.letter
  }
  return `${tile.letter}${getWordRight(right)}`
}


tiles.forEach(tile => {
  const [up, down, left, right] = getNeighbors(tile)
  //console.log(`Tile ${tile.letter} has: up neighbor ${up?.letter}, down neighbor ${down?.letter}, right neighbor ${right?.letter}, left neighbor ${left?.letter}`)

  if (down && !up) {
    console.log(`Found starting letter ${tile.letter}, getting word in DOWN direction`)
    let word = getWordDown(tile)
    console.log(`FOUND WORD ${word}`)
  }

  if (right && !left) {
    console.log(`Found starting letter ${tile.letter}, getting word in RIGHT direction`)
    let word = getWordRight(tile)
    console.log(`FOUND WORD ${word}`)
  }
})

let examinedTiles = []

function countConnect(tile) {
  let count = 0;
  const [up, down, left, right] = getNeighbors(tile)
  console.log(`Looking at tile ${tile.letter}`)
  if (up && !examinedTiles.includes(up.id) ) {
    examinedTiles.push(up.id)
    count = count + 1 + countConnect(up)
  }
  if (down && !examinedTiles.includes(down.id)) {
    examinedTiles.push(down.id)
    count = count + 1 + countConnect(down)
  }
  if (left && !examinedTiles.includes(left.id)) {
    examinedTiles.push(left.id)
    count = count + 1 + countConnect(left)
  }
  if (right && !examinedTiles.includes(right.id)) {
    examinedTiles.push(right.id)
    count = count + 1 + countConnect(right,)
  }
  return count
}

(function (tile) {
  console.log(tile)
})("hi")

let tile = tiles[0]
examinedTiles.push(tile.id)

console.log(countConnect(tile))
console.log(examinedTiles.length)
