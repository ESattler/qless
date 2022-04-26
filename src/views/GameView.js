import React, { useState, useEffect } from "react";
import { getAllWords, observe, resetTile } from "../GameState";
import GameArea from "../components/GameArea"
import { generateRandomLetters } from "../GameState";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Words from '../words.json'

function randomize(setTiles, setFoundWords) {
  let newLetters = generateRandomLetters()

  for (let i = 0; i < setTiles.length; i++) {
    let newTile = {
      x: i,
      y: 0,
      letter: newLetters[i],
      id: `${i}`
    }

    setTiles[i](newTile)
    resetTile(i, newTile)
    setFoundWords([])
  }
}

function validate(tiles, setFoundWords) {
  console.log(tiles)
  let anyStartingSpot = Object.values(tiles).some(tile => tile.y === 0)
  if (anyStartingSpot) {
    alert("NOT ALL ON BOARD")
    return;
  }

  const words = getAllWords(tiles)
  let checkedWords = []
  words.forEach(word => {
    checkedWords.push({
      word: word,
      valid: Words.hasOwnProperty(word)
    })
  })

  setFoundWords(checkedWords) 
}

const GameView = (props) => {

  const [tile1, setTile1] = useState({x: 0, y: 0, letter: props.letters[0], id: "0"});
  useEffect(() => observe((newPos) => setTile1(newPos), tile1));

  const [tile2, setTile2] = useState({x: 1, y: 0, letter: props.letters[1], id: "1"});
  useEffect(() => observe((newPos) => setTile2(newPos), tile2));

  const [tile3, setTile3] = useState({x: 2, y: 0, letter: props.letters[2], id: "2"});
  useEffect(() => observe((newPos) => setTile3(newPos), tile3));

  const [tile4, setTile4] = useState({x: 3, y: 0, letter: props.letters[3], id: "3"});
  useEffect(() => observe((newPos) => setTile4(newPos), tile4));

  const [tile5, setTile5] = useState({x: 4, y: 0, letter: props.letters[4], id: "4"});
  useEffect(() => observe((newPos) => setTile5(newPos), tile5));

  const [tile6, setTile6] = useState({x: 5, y: 0, letter: props.letters[5], id: "5"});
  useEffect(() => observe((newPos) => setTile6(newPos), tile6));

  const [tile7, setTile7] = useState({x: 6, y: 0, letter: props.letters[6], id: "6"});
  useEffect(() => observe((newPos) => setTile7(newPos), tile7));

  const [tile8, setTile8] = useState({x: 7, y: 0, letter: props.letters[7], id: "7"});
  useEffect(() => observe((newPos) => setTile8(newPos), tile8));

  const [tile9, setTile9] = useState({x: 8, y: 0, letter: props.letters[8], id: "8"});
  useEffect(() => observe((newPos) => setTile9(newPos), tile9));

  const [tile10, setTile10] = useState({x: 9, y: 0, letter: props.letters[9], id: "9"});
  useEffect(() => observe((newPos) => setTile10(newPos), tile10));

  const [tile11, setTile11] = useState({x: 10, y: 0, letter: props.letters[10], id: "10"});
  useEffect(() => observe((newPos) => setTile11(newPos), tile11));

  const [tile12, setTile12] = useState({x: 11, y: 0, letter: props.letters[11], id: "11"});
  useEffect(() => observe((newPos) => setTile12(newPos), tile12));

  let tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10, tile11, tile12]
  let setTiles = [setTile1, setTile2, setTile3, setTile4, setTile5, setTile6, setTile7, setTile8, setTile9, setTile10, setTile11, setTile12]


  const [foundWords, setFoundWords] = useState([]);

  let foundWordsDivs = []
  for (let word of foundWords) {
    foundWordsDivs.push(
      <ListItem>
        <ListItemText>
          <ListItemIcon>
            { word.valid &&
              <CheckIcon color="green" />
            }
            { !word.valid &&
              <ErrorOutlineIcon color="red" />
            }
          </ListItemIcon>
          {word.word}
        </ListItemText>
      </ListItem>
    )
  }

  console.log("\n\nRerender Game View")
  return (
    <>
      <div>
        <GameArea tiles={tiles}/>
        <button onClick={() => randomize(setTiles, setFoundWords)}> Randomize </button>
        <button onClick={() => validate(tiles, setFoundWords)}> Validate </button>
      </div >
      <div className="scrabble">
        <div className="scoreboard-border">
          <div className="scoreboard">
            <Typography variant="h6" gutterBottom>
              Q Less
            </Typography>
          </div>
          <List>
              {foundWordsDivs}
          </List>
        </div>
      </div>
    </>

  )
}
  
  export default GameView;