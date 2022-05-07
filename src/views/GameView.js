import React, { useState, useEffect } from "react";
import { CssBaseline, GlobalStyles } from '@mui/material'
import { observe } from "../GameState";
import GameArea from "../components/GameArea";
import GithubFooter from "../components/GithubFooter";
import ToolBarView from "./ToolBarView";
import GameButtons from "./GameButtons";
import { Unlimited } from "../constants";


const GameView = (props) => {
  const [tiles, setTiles] = useState({...props.tiles});
  useEffect(() => observe((newPos) => {
    setTiles({...newPos})
  }, tiles));

  const [difficultyMode, setDifficultyMode] = useState(localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" && props.mode === Unlimited ? "Easy Mode" : "Normal Mode" : "Normal Mode")
  const [ruleSet, setRuleSet] = useState(localStorage.getItem("officialRules") !== null ? localStorage.getItem("officialRules") === "true" ? "Official Rules" : "Unofficial Rules" : "Unofficial Rules")


  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none', }}} />
      <CssBaseline />

      <ToolBarView setDifficultyMode={setDifficultyMode} setRuleSet={setRuleSet} mode={props.mode}/>
    
      <GameArea tiles={Object.values(tiles)} difficultyMode={difficultyMode} ruleSet={ruleSet} mode={props.mode}/>

      <GameButtons setTiles={setTiles} tiles={tiles} difficultyMode={difficultyMode} mode={props.mode}/>

      <GithubFooter sx={{ mt: 5 }} />

    </React.Fragment>
  )
}

export default GameView;