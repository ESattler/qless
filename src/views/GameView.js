import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { getAllWords, observe, resetTile } from "../GameState";
import { generateRandomLetters } from "../GameState";
import CheckIcon from '@mui/icons-material/Check';
import Words from '../words.json'
import GameAreaNew from "../components/GameArea";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import GithubFooter from "../components/GithubFooter";

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

function validate(tiles, setFoundWords, handleClickOpen) {
  console.log(tiles)
  let anyStartingSpot = Object.values(tiles).some(tile => tile.y === 0)
  if (anyStartingSpot) {
    alert("NOT ALL ON BOARD")
    return;
  }

  const words = getAllWords(tiles)
  let checkedWords = []
  words.forEach(word => {
    console.log(`${word} | ${Words.hasOwnProperty(word)}`)
    checkedWords.push({
      word: word,
      valid: Words.hasOwnProperty(word)
    })
  })

  setFoundWords(checkedWords)
  handleClickOpen()
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [foundWords, setFoundWords] = useState([]);

  let foundWordsDivs = []
  for (let word of foundWords) {
    foundWordsDivs.push(
      <Grid container justifyContent="center"item xs={6}>
        { word.valid &&
          <CheckIcon color="success" />
        }
        { !word.valid &&
          <CloseIcon color="error" />
        } {word.word}
      </Grid>
    )
  }

  console.log("\n\nRerender Game View")
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none', }}} />
      <CssBaseline />
      <Container
        maxWidth="md"
        component="header"
        sx={{
          borderBottom: (theme) => `1px solid #555a5e`,
          pb: 3
        }}
      >
        <Typography variant="h3" color="inherit" align="center" noWrap>
          QLESS
        </Typography>
      </Container>

      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 2, pb: 2 }}>
        <GameAreaNew tiles={tiles} />
      </Container>
      <Container disableGutters maxWidth="xs" component="main" justifyContent="center">
        <Grid container maxWidth="sm">
          <Grid container item md={6} justifyContent="center">
            <Button variant="contained" sx={{backgroundColor: "#E54B4B"}} onClick={() => randomize(setTiles, setFoundWords)}>Randomize</Button>
          </Grid>
          <Grid container item md={6} justifyContent="center">
            <Button variant="contained" sx={{backgroundColor: "#FFA987"}} onClick={() => validate(tiles, setFoundWords, handleClickOpen)}>Validate</Button>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid #555a5e`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <GithubFooter sx={{ mt: 5 }} />
      </Container>

      <Modal
          open={open}
          onClose={handleClose}
          BackdropProps={{ style: { backgroundColor: "rgba(255,255,255,0.4)" } }} 
        >
          <Box justifyContent="center" alignContent="center" alignItems="center" sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            p: 4
          }}>
            <Grid container justifyContent="center" alignContent="center" xs={12} spacing={3}>
              {/* <Grid container justifyContent="center" item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Found Words
                </Typography>
              </Grid> */}
              {foundWordsDivs}
            </Grid>
          </Box>
      </Modal>
    </React.Fragment>
  )
}

export default GameView;