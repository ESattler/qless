import { useState, useEffect } from 'react';
import { Grid, Button, Container, Popover, Typography } from '@mui/material'
import { areAllConnected, createTiles, getAllWords, resetTiles, shuffleTiles, generateRandomLetters } from "../GameState";
import Words from '../words.json'
import ValidationModal from '../components/ValidationModal';

const NotAllConnected = "NotAllConnected"
const NotAllOnBoard = "NotAllOnBoard"
const NoTwoLetterWords = "NoTwoLetterWords"

const GameButtons = (props) => {

  /**
   * Generates new random letters and resets tiles
   */
  const createNewGame = () => {
    let newLetters = generateRandomLetters()
  
    let tempTiles = createTiles(newLetters)
  
    props.setTiles({...tempTiles})
    resetTiles({...tempTiles})
    setFoundWords([])
  }
  
  /**
   * Moves all tiles back to bench
   */
  const setTilesBackToBench = () => {
    let allStartingSpot = Object.values(props.tiles).every(tile => tile.y === 0)
    if (allStartingSpot) {
      return
    }
    let letters = Object.values(props.tiles).map(tile => tile.letter)
    let tempTiles = createTiles(letters)
  
    props.setTiles({...tempTiles})
    resetTiles({...tempTiles})
  }
  
  /**
   * Shuffles tiles still on bench
   */
  const shuffle = () => {
    let x = Object.values(props.tiles).filter(tile => tile.y === 0).length
    const spots = [...Array(x).keys()].sort(() => (Math.random() > 0.5) ? 1 : -1)
    console.log(spots)
  
    let tempTiles = shuffleTiles(spots)
    props.setTiles({...tempTiles})
    resetTiles({...tempTiles})
  }
  
  /**
   * Validates all the letters on the board, connected and then opens
   * modal showing which are spelling correct
   */
  const validate = (event) => {
    let anyStartingSpot = Object.values(props.tiles).some(tile => tile.y === 0)
    if (anyStartingSpot) {
      setValidationError(NotAllOnBoard)
      handlePopOverOpen(event)
      return;
    }
  
    let allConnected = areAllConnected(Object.values(props.tiles))
    if (!allConnected) {
      setValidationError(NotAllConnected)
      handlePopOverOpen(event)
      return;
    }

    const words = getAllWords(Object.values(props.tiles))

    let twoLetterWords = words.some(word => word.length === 2)
    let officialRules = localStorage.getItem("officialRules") === "true"
    if (twoLetterWords && officialRules) {
      setValidationError(NoTwoLetterWords)
      handlePopOverOpen(event)
      return
    }

  
    let checkedWords = []
    words.forEach(word => {
      console.log(`${word} | ${Words.hasOwnProperty(word)}`)
      checkedWords.push({
        word: word,
        valid: Words.hasOwnProperty(word)
      })
    })
  
    setFoundWords(checkedWords)
    handleValidationOpen()
  }

  const [popOverAnchor, setPopOverAnchor] = useState(null);

  const handlePopOverOpen = (event) => {
    setPopOverAnchor(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setPopOverAnchor(null);
  };

  const [validationError, setValidationError] = useState(null);

  const [validationOpen, setValidationOpen] = useState(false);
  const [foundWords, setFoundWords] = useState([]);

  const handleValidationOpen = () => {
    setValidationOpen(true);
  };

  const handleValidationClose = () => {
    setValidationOpen(false);
  };

  useEffect(
    () => {
      createNewGame()
    },
    [props.difficultyMode],
  );


  return (
    <Container disableGutters maxWidth="sm" component="main" justifyContent="center">
      <Grid container maxWidth="sm" spacing={3}>
        <Grid container item md={3} justifyContent="center">
          <Button variant="contained" sx={{backgroundColor: "#E54B4B", width: 1}} onClick={() => createNewGame()}>New Game</Button>
        </Grid>
        <Grid container item md={3} justifyContent="center">
          <Button variant="contained" sx={{backgroundColor: "#FFA987", width: 1}} onClick={() => setTilesBackToBench()}>Reset Tiles</Button>
        </Grid>
        <Grid container item md={3} justifyContent="center">
          <Button variant="contained" sx={{backgroundColor: "#FFA987", width: 1}} onClick={() => shuffle()}>Shuffle</Button>
        </Grid>
        <Grid container item md={3} justifyContent="center">
          <Button variant="contained" sx={{backgroundColor: "#FFA987", width: 1}} onClick={(event) => validate(event)}>Validate</Button>
          <Popover
            open={Boolean(popOverAnchor)}
            anchorEl={popOverAnchor}
            onClose={handlePopOverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {validationError === NotAllConnected &&
              <Typography sx={{ p: 2 }}>All tiles are not currently connected</Typography>
            }
            {validationError === NotAllOnBoard &&
              <Typography sx={{ p: 2 }}>All tiles are not currently on the board</Typography>
            }
            {validationError === NoTwoLetterWords &&
              <Typography sx={{ p: 2 }}>Official Rules enabled, two letter words are banned</Typography>
            }
          </Popover>
        </Grid>
      </Grid>
      <ValidationModal open={validationOpen} handleClose={handleValidationClose} foundWords={foundWords} tiles={Object.values(props.tiles)} />
    </Container>
  )
}

export default GameButtons