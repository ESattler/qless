const Words = require('./src/words.json')

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


// function getNeighbors(tile) {
//   let upNeighbor = null;
//   let downNeighbor = null;
//   let rightNeighbor = null;
//   let leftNeighbor = null;
//   tiles.forEach(tempTile => {
    
//     if (tempTile.x === tile.x && tempTile.y - tile.y === -1) {
//       upNeighbor = tempTile
//     }
    
//     if (tempTile.x === tile.x && tempTile.y - tile.y === 1) {
//       downNeighbor = tempTile
//     }
    
//     if (tempTile.x - tile.x === 1 && tempTile.y  ===tile.y) {
//       rightNeighbor = tempTile
//     }
    
//     if (tempTile.x - tile.x === -1 && tempTile.y  ===tile.y) {
//       leftNeighbor = tempTile
//     }
//   })
//   return [upNeighbor, downNeighbor, leftNeighbor, rightNeighbor];
// }

// function getWordDown(tile) {
//   const [up, down, left, right] = getNeighbors(tile)
//   if (!down) {
//     return tile.letter
//   }
//   return `${tile.letter}${getWordDown(down)}`
// }

// function getWordRight(tile) {
//   const [up, down, left, right] = getNeighbors(tile)
//   if (!right) {
//     return tile.letter
//   }
//   return `${tile.letter}${getWordRight(right)}`
// }


// tiles.forEach(tile => {
//   const [up, down, left, right] = getNeighbors(tile)
//   //console.log(`Tile ${tile.letter} has: up neighbor ${up?.letter}, down neighbor ${down?.letter}, right neighbor ${right?.letter}, left neighbor ${left?.letter}`)

//   if (down && !up) {
//     console.log(`Found starting letter ${tile.letter}, getting word in DOWN direction`)
//     let word = getWordDown(tile)
//     console.log(`FOUND WORD ${word}`)
//   }

//   if (right && !left) {
//     console.log(`Found starting letter ${tile.letter}, getting word in RIGHT direction`)
//     let word = getWordRight(tile)
//     console.log(`FOUND WORD ${word}`)
//   }
// })

// let examinedTiles = []

// function countConnect(tile) {
//   let count = 0;
//   const [up, down, left, right] = getNeighbors(tile)
//   console.log(`Looking at tile ${tile.letter}`)
//   if (up && !examinedTiles.includes(up.id) ) {
//     examinedTiles.push(up.id)
//     count = count + 1 + countConnect(up)
//   }
//   if (down && !examinedTiles.includes(down.id)) {
//     examinedTiles.push(down.id)
//     count = count + 1 + countConnect(down)
//   }
//   if (left && !examinedTiles.includes(left.id)) {
//     examinedTiles.push(left.id)
//     count = count + 1 + countConnect(left)
//   }
//   if (right && !examinedTiles.includes(right.id)) {
//     examinedTiles.push(right.id)
//     count = count + 1 + countConnect(right,)
//   }
//   return count
// }

// (function (tile) {
//   console.log(tile)
// })("hi")

// let tile = tiles[0]
// examinedTiles.push(tile.id)

// console.log(countConnect(tile))
// console.log(examinedTiles.length)

// function generateMatches(letters) {

//   let allPossible = getPermutationsAllLengths(letters)
//   let results = [];

//   for (let i = 0; i < allPossible.length; i++) {
//     if (Words.hasOwnProperty(allPossible[i].toUpperCase())) {
//       results.push(allPossible[i].toUpperCase());
//     }
//   }
//   console.log(results)
//   // filter out duplicates and sort by length
//   results = [...new Set(results)].sort((a, b) => b.length - a.length);
//   console.log(results.slice(0, 5))
// };

// function stringPermutations(letters) {
//   if (letters.length <= 2) return letters.length === 2 ? [letters, letters[1] + letters[0]] : [letters];
//   return letters
//     .split('')
//     .reduce(
//       (acc, letter, i) =>
//         acc.concat(stringPermutations(letters.slice(0, i) + letters.slice(i + 1)).map(val => letter + val)),
//       []
//     );
// };

// generateMatches(["d", "x", "y", "y", "t", "p", "l", "a"])//, "h", "e", "p", "d"])

// // find all permutations of an array
// function swap(array, i, j) {
//   if (i !== j) {
//     let swap = array[i];
//     array[i] = array[j];
//     array[j] = swap;
//   }
// };

// function permute_rec(res, str, array) {
//   if (array.length === 0) {
//     res.push(str);
//   } else {
//     for (let i = 0; i < array.length; i++) {
//       swap(array, 0, i);
//       permute_rec(res, str + array[0], array.slice(1));
//       swap(array, 0, i);
//     }
//   }
// };

// function xpermute_rec(res, sub, array) {
//   if (array.length === 0) {
//     if (sub.length > 0) permute_rec(res, "", sub);
//   } else {
//     xpermute_rec(res, sub, array.slice(1));
//     xpermute_rec(res, sub.concat(array[0]), array.slice(1));
//   }
// };

// // find all permutations for all lengths
// function getPermutationsAllLengths(array) {
//   let res = [];
//   xpermute_rec(res, [], array);
//   return res;
// };

// var matrix = [];
// for(var i=0; i<10; i++) {
//     matrix[i] = new Array(10).fill("⬛");
// }

// tiles.forEach(tile => {
//   let x = tile.x
//   let y = tile.y
//   matrix[9-x][10-y] = "🟩"
// })

// console.log(matrix)
// let text = ""
// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     text = text.concat(matrix[i][j])
//   }
//   text = text.concat("\n")
// }

// console.log(text)

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomLetters() {
  
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

for (let i = 0; i < 60; i++){
  console.log(generateRandomLetters().join(""))
}

let letters = [
  "CKMOCPFORAVG",
  "DZBYCHDIHAVG",
  "JZLIMWLUROVG",
  "DXMYSTRANAPR",
  "CBLICTRUHOKD",
  "CZYIMHLUNAGD",
  "TZLITWFUNAFR",
  "DSMOCWLEROKG",
  "DKMOTHLOHAGD",
  "DSMITHLUNOGG",
  "TBBOMTWIROPL",
  "CKMOCHLUHOPG",
  "BXLITHDONEPD",
  "CXBOCWDUHEPR",
  "CSYICHRAREKD",
  "JSYYTWRANEKL",
  "JKLOMPFUROFL",
  "DSMNCHFOHOPL",
  "CXYOMTROHAPD",
  "BZYYSHFEHAFD",
  "TNLOCHLUNEPD",
  "CNLOCPREHAKG",
  "BSYICHWENEPG",
  "DNYITHFEREPG",
  "TSMNCPLAREKD",
  "JXBOCHRUROKG",
  "JZYOTHDERAVD",
  "DKBITHRUHAKG",
  "CBLNTWLENEFR",
  "JNMITWWOREPG",
  "CZMNCPRARAVL",
  "CXMNCHFUROFR",
  "CXLITHFUREGD",
  "JSMOCHDUHEFL",
  "DZLITWDEHEKL",
  "DSMOCHLUREVR",
  "CSLITWFENEVR",
  "BXMITTWINAKG",
  "TXMICHRENEPR",
  "DNBITTWUHEKR",
  "BSLYCTDAROKG",
  "CBMNTPDENEVL",
  "CZBYTPRUHOPD",
  "BNBISWFUREPR",
  "JBLOCHDAHOGG",
  "DBLYMTFONAKR",
  "CXBNCWFANOKR",
  "JBLICHDUHOPG",
  "BXMOTPDIHAPG",
  "CXMIMWWUREKL",
  "DXMNSHFINOVG",
  "CSMITHDIREKR",
  "CBYISTLUNOPL",
  "DKMYCTWAHEGG",
  "JXMNCHWAHEKL",
  "TXMYSHRURAGL",
  "TZBOTHLUHAVR",
  "DKMOCPRORAGR",
  "JZMIMHFENEKL",
  "BXLOSTLUHAPR",
]

let date = new Date()

let options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  timeZone: 'America/New_York'
};
console.log(new Intl.DateTimeFormat('en-US', options).format(date));

let startDate = date
startDate.setDate(startDate.getDate())

let dailyList = {}

letters.forEach((letter, index) => {
  let tempDate = new Date(startDate)
  tempDate.setDate(startDate.getDate() + index)
  console.log(tempDate)
  tempDate = new Intl.DateTimeFormat('en-US', options).format(tempDate)
  dailyList[tempDate] = letter.split("")
})

console.log(dailyList)

/*
CNLYCWLUROGL
JKMYTTLANAFG
BZMITHLIHEVG
DKLICPLAREPL
DXBOCTFINAPG
DKBOCHLUNAFL
DBMOTHFUHAPG
CKYNTTDANOKR
CKYITTREREKR
JNLISTLIHOFR
TSLICTWUHEVG
CBLNTPLOREPG
BNMOSPWENAVR
CZMOCTFAROPR
JNMYCTLUREFR
JNBIMPDANAVR
CNLNSTLURAKR
JZLOTWDUHOGR
JNYIMPREHOVD
JBLOCHLAHAVR
CKLNCHFAHEPR
JKMYTHWOREPR
TXMICTFURAKR
TSLICPDOHAFG
TBBYCTFARAGD
DKLICPFIHEPL
CKLITWFARAVG
JNLOCTLURAVR
TZLOSTWOHEPG
*/