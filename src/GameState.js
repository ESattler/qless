const letters = {}

let observers = {};

function emitChange() {
  for (let id in observers) {
    observers[id]({...letters[id]})
  }
}

export function observe(o, tile) {
  observers[tile.id] = o
  letters[tile.id] = tile
}

export function moveTile(toX, toY, item) {
  letters[item.id] = {
    ...letters[item.id],
    x: toX,
    y: toY,
  }
  emitChange();
}

export function swapTile(fromID, toID) {
  let fromX = letters[fromID].x;
  let fromY = letters[fromID].y;

  let toX = letters[toID].x;
  let toY = letters[toID].y;

  letters[fromID] = {
    ...letters[fromID],
    x: toX,
    y: toY
  }

  letters[toID] = {
    ...letters[toID],
    x: fromX,
    y: fromY
  }
  emitChange()
}

export function canDropTile(squareX, squareY, item) {
  let allStartingSpot = Object.values(letters).every(tile => tile.y === 0)

  let nextToExistingLetter = false
  Object.values(letters).forEach(tile => {
    if (tile.y !== 0 && tile.id !== item.id && ((Math.abs(tile.x - squareX) === 1 &&  Math.abs(tile.y - squareY) === 0) || (Math.abs(tile.y - squareY) === 1 && Math.abs(tile.x - squareX) === 0))) {
      nextToExistingLetter = true
    }
  })


  let [tile, up, down, left, right] = getNeighborsById(Object.values(letters), item.id);
  let connectingPiece = (((up && down) || (left && right)) && tile.y !== 0);

  return (allStartingSpot || nextToExistingLetter) && !connectingPiece
}

export function resetTile(id, newTile) {
    letters[id] = {
      ...newTile
    };
}

/*
  GENERATE RANDOM LETTERS
*/
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function generateRandomLetters() {
  
  let one = "CCDTBJ".charAt(getRandomInt(6))
  let two = "XZBNSK".charAt(getRandomInt(6))
  let three = "YMLBML".charAt(getRandomInt(6))
  let four = "ONIOIY".charAt(getRandomInt(6))
  let five = "MCCTTS".charAt(getRandomInt(6))
  let six = "HPTHTW".charAt(getRandomInt (6))
  let seven = "RLLFDW".charAt(getRandomInt(6))
  let eight = "EAOUUI".charAt(getRandomInt(6))
  let nine = "RHNHNR".charAt(getRandomInt(6))
  let ten = "OEAEAO".charAt(getRandomInt(6))
  let eleven = "KPFVPG".charAt(getRandomInt(6))
  let twelve = "GDGRRL".charAt(getRandomInt (6))

  let letters = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve]

  return letters
}

/*
  FIND LETTERS IN GRID
*/
function getNeighborsById(allTiles, id) {
  let tile = allTiles.filter(t => t.id === id)[0]
  return [tile, ...getNeighbors(allTiles, tile)]
}

function getNeighbors(allTiles, tile) {
  let upNeighbor = null;
  let downNeighbor = null;
  let rightNeighbor = null;
  let leftNeighbor = null;
  allTiles.forEach(tempTile => {
    
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

function getWordDown(allTiles, tile) {
  const [up, down, left, right] = getNeighbors(allTiles, tile)
  if (!down) {
    return tile.letter
  }
  return `${tile.letter}${getWordDown(allTiles, down)}`
}

function getWordRight(allTiles, tile) {
  const [up, down, left, right] = getNeighbors(allTiles, tile)
  if (!right) {
    return tile.letter
  }
  return `${tile.letter}${getWordRight(allTiles, right)}`
}


export function getAllWords(allTiles) {
  let words = []
  console.log("IN GET ALL WORDS", allTiles)

  allTiles.forEach(tile => {
    const [up, down, left, right] = getNeighbors(allTiles, tile)
    //console.log(`Tile ${tile.letter} has: up neighbor ${up?.letter}, down neighbor ${down?.letter}, right neighbor ${right?.letter}, left neighbor ${left?.letter}`)

    if (down && !up) {
      console.log(`Found starting letter ${tile.letter}, getting word in DOWN direction`)
      let word = getWordDown(allTiles, tile)
      words.push(word)
      console.log(`FOUND WORD ${word}`)
    }

    if (right && !left) {
      console.log(`Found starting letter ${tile.letter}, getting word in RIGHT direction`)
      let word = getWordRight(allTiles, tile)
      words.push(word)
      console.log(`FOUND WORD ${word}`)
    }
  })
  return words
}