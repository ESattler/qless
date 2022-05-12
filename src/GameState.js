import { Daily, dailyLetters } from './constants';
import { getDate } from './utils';
import Words from './words.json'

let letters = {}
let observer;

/**
  PROPOGATE CHANGES
*/

function emitChange() {
  observer(letters)
}

export function observe(o, tiles) {
  observer = o
  letters = tiles
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

export function resetTiles(tiles) {
    letters = tiles
}

export function getLetters(gameMode) {
  if (gameMode === Daily) {
    return getDailyLetters()
  }
  return generateRandomLetters()
}

function getDailyLetters() {
  const date = getDate()

  return dailyLetters[date]
}

/*
  GENERATE RANDOM LETTERS
*/
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Hard Mode
 * AAA BBB CCCC DDD EEEE FF GGG HHHH III J KK LLLLL MMM NNNN OOOOO PPP RRRR SS TTTTT UU V WW X YY Z
 * Easy Mode
 * AAAA BBB CCCC DDD EEEEE FF GGG HHHH III J KK LLLLL MMM NNNN OOOOO PPP RRRR SSSS TTTTT UU WW Y
 */
export function generateRandomLetters() {

  let easyMode = localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" : false
  
  let one = "CCDTBJ".charAt(getRandomInt(6))
  let two = easyMode ? "SSBNSK".charAt(getRandomInt(6)) : "XZBNSK".charAt(getRandomInt(6))
  let three = "YMLBML".charAt(getRandomInt(6))
  let four = easyMode ? "OEIOIN".charAt(getRandomInt(6)) : "ONIOIY".charAt(getRandomInt(6))
  let five = "MCCTTS".charAt(getRandomInt(6))
  let six = "HPTHTW".charAt(getRandomInt (6))
  let seven = "RLLFDW".charAt(getRandomInt(6))
  let eight = "EAOUUI".charAt(getRandomInt(6))
  let nine = "RHNHNR".charAt(getRandomInt(6))
  let ten = "OEAEAO".charAt(getRandomInt(6))
  let eleven = easyMode ? "KPFPGA".charAt(getRandomInt(6)) : "KPFVPG".charAt(getRandomInt(6))
  let twelve = "GDGRRL".charAt(getRandomInt (6))

  let letters = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve]

  return letters
}

export function createTiles(newLetters, gameMode) {
  if (gameMode === Daily) {
    const currentDate = getDate()
    let dailyTiles = localStorage.getItem("dailyTiles")

    dailyTiles = dailyTiles ? JSON.parse(dailyTiles) : null

    console.log(dailyTiles)

    if (dailyTiles && currentDate === dailyTiles.date) {
      return dailyTiles.tiles
    }
  }


  let tempTiles = {}
  newLetters.forEach((letter, i) => {
    tempTiles[i] = {
      x: i,
      y: 0,
      letter,
      id: String(i)
    }
  })
  return tempTiles
}

export function shuffleTiles(shuffledSpots) {
  let tempTiles = {}
  for (let i = 0; i < Object.values(letters).length; i++) {
    tempTiles[i] = {
      ...letters[i]
    }

    if (tempTiles[i].y === 0) {
      tempTiles[i].x = shuffledSpots.pop()
    }

  }

  return tempTiles
}

/*
  FIND LETTERS IN GRID
*/
export function areAllConnected(tiles) {
  let examinedTiles = []

  let countConnect = (function (tile) {
    const [up, down, left, right] = getNeighbors(tiles, tile)
    if (up && !examinedTiles.includes(up.id) ) {
      examinedTiles.push(up.id)
      countConnect(up)
    }
    if (down && !examinedTiles.includes(down.id)) {
      examinedTiles.push(down.id)
      countConnect(down)
    }
    if (left && !examinedTiles.includes(left.id)) {
      examinedTiles.push(left.id)
      countConnect(left)
    }
    if (right && !examinedTiles.includes(right.id)) {
      examinedTiles.push(right.id)
      countConnect(right)
    }
  })

  countConnect(tiles[0])

  return examinedTiles.length === 12
}

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
  const [, down, , ] = getNeighbors(allTiles, tile)
  if (!down) {
    return tile.letter
  }
  return `${tile.letter}${getWordDown(allTiles, down)}`
}

function getWordRight(allTiles, tile) {
  const [, , , right] = getNeighbors(allTiles, tile)
  if (!right) {
    return tile.letter
  }
  return `${tile.letter}${getWordRight(allTiles, right)}`
}


export function getAllWords(allTiles) {
  let words = []

  allTiles.forEach(tile => {
    const [up, down, left, right] = getNeighbors(allTiles, tile)

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

/*
  SOLVE
*/
export function generateMatches(letters) {

  let allPossible = getPermutationsAllLengths(letters)
  let results = [];

  for (let i = 0; i < allPossible.length; i++) {
    if (Words.hasOwnProperty(allPossible[i].toUpperCase())) {
      results.push(allPossible[i].toUpperCase());
    }
  }
  // filter out duplicates and sort by length
  results = [...new Set(results)].sort((a, b) => b.length - a.length);
};

// find all permutations of an array
function swap(array, i, j) {
  if (i !== j) {
    let swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
};

function permute_rec(res, str, array) {
  if (array.length === 0 && Words.hasOwnProperty(str)) {
    res.push(str);
  } else {
    for (let i = 0; i < array.length; i++) {
      swap(array, 0, i);
      permute_rec(res, str + array[0], array.slice(1));
      swap(array, 0, i);
    }
  }
};

function xpermute_rec(res, sub, array) {
  if (array.length === 0) {
    console.log(res)
    if (sub.length >= 5) permute_rec(res, "", sub);
  } else {
    xpermute_rec(res, sub, array.slice(1));
    xpermute_rec(res, sub.concat(array[0]), array.slice(1));
  }
};

// find all permutations for all lengths
function getPermutationsAllLengths(array) {
  let res = [];
  xpermute_rec(res, [], array);
  return res;
};