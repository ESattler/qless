import { Grid, Button, Container } from '@mui/material'
import { areAllConnected, createTiles, getAllWords, resetTiles, shuffleTiles, generateRandomLetters } from "../GameState";
import Words from '../words.json'


const GameButtons = (props) => {

  /**
   * Generates new random letters and resets tiles
   */
  const createNewGame = () => {
    let newLetters = generateRandomLetters()
  
    let tempTiles = createTiles(newLetters)
  
    props.setTiles({...tempTiles})
    resetTiles({...tempTiles})
    props.setFoundWords([])
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
  const validate = () => {
    let anyStartingSpot = Object.values(props.tiles).some(tile => tile.y === 0)
    if (anyStartingSpot) {
      alert("NOT ALL ON BOARD")
      return;
    }
  
    let allConnected = areAllConnected(Object.values(props.tiles))
    if (!allConnected) {
      alert("NOT ALL CONNECTED")
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
  
    props.setFoundWords(checkedWords)
    props.handleValidationOpen()
  }


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
          <Button variant="contained" sx={{backgroundColor: "#FFA987", width: 1}} onClick={() => validate()}>Validate</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default GameButtons