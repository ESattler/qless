import React, { useState, useEffect } from "react";
import { CssBaseline, GlobalStyles } from '@mui/material'
import { observe } from "../GameState";
import GameAreaNew from "../components/GameArea";
import GithubFooter from "../components/GithubFooter";
import ToolBarView from "./ToolBarView";
import GameButtons from "./GameButtons";


const GameView = (props) => {


  const [tiles, setTiles] = useState({...props.tiles});
  useEffect(() => observe((newPos) => {
    setTiles({...newPos})
  }, tiles));

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none', }}} />
      <CssBaseline />

      <ToolBarView />

      <GameAreaNew tiles={Object.values(tiles)} />

      <GameButtons setTiles={setTiles} tiles={tiles} />

      <GithubFooter sx={{ mt: 5 }} />

    </React.Fragment>
  )
}

export default GameView;