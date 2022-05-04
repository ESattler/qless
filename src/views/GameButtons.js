import { useState } from 'react';
import { Grid, Button, Container, Popover, Typography } from '@mui/material'
import { areAllConnected, createTiles, getAllWords, resetTiles, shuffleTiles, generateRandomLetters } from "../GameState";
import Words from '../words.json'
import ValidationModal from '../components/ValidationModal';

const NotAllConnected = "NotAllConnected"
const NotAllOnBoard = "NotAllOnBoard"

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
      handleClick(event)
      return;
    }
  
    let allConnected = areAllConnected(Object.values(props.tiles))
    if (!allConnected) {
      setValidationError(NotAllConnected)
      handleClick(event)
      return;
    }
  
    const words = getAllWords(Object.values(props.tiles))
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
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
          </Popover>
        </Grid>
      </Grid>
      <ValidationModal open={validationOpen} handleClose={handleValidationClose} foundWords={foundWords} tiles={Object.values(props.tiles)} />
    </Container>
  )
}

export default GameButtons