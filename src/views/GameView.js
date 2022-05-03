import React, { useState, useEffect } from "react";
import { Grid, CssBaseline, GlobalStyles } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { observe } from "../GameState";
import GameAreaNew from "../components/GameArea";
import GithubFooter from "../components/GithubFooter";
import ValidationModal from "../components/ValidationModal";
import ToolBarView from "./ToolBarView";
import GameButtons from "./GameButtons";


const GameView = (props) => {


  const [tiles, setTiles] = useState({...props.tiles});
  useEffect(() => observe((newPos) => {
    setTiles({...newPos})
  }, tiles));

  const [validationOpen, setValidationOpen] = React.useState(false);
  const [foundWords, setFoundWords] = useState([]);

  const handleValidationOpen = () => {
    setValidationOpen(true);
  };

  const handleValidationClose = () => {
    setValidationOpen(false);
  };

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

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none', }}} />
      <CssBaseline />

      <ToolBarView />

      <GameAreaNew tiles={Object.values(tiles)} />

      <GameButtons setTiles={setTiles} setFoundWords={setFoundWords} tiles={tiles} handleValidationOpen={handleValidationOpen}/>

      <GithubFooter sx={{ mt: 5 }} />

      <ValidationModal open={validationOpen} handleClose={handleValidationClose} foundWordsDivs={foundWordsDivs} />
    </React.Fragment>
  )
}

export default GameView;