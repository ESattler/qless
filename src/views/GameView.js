import React, { useState, useEffect } from "react";
import { CssBaseline, GlobalStyles } from '@mui/material'
import { observe } from "../GameState";
import GameArea from "../components/GameArea";
import GithubFooter from "../components/GithubFooter";
import ToolBarView from "./ToolBarView";
import GameButtons from "./GameButtons";
import { Daily, Unlimited } from "../constants";


const GameView = (props) => {
  const [tiles, setTiles] = useState({...props.tiles});
  useEffect(() => observe((newPos) => {
    setTiles({...newPos})
  }, tiles));

  useEffect(() => {
    // setDifficultyMode("Normal Mode")
    if (props.mode === Daily && difficultyMode !== "Normal Mode") {
      setDifficultyMode("Normal Mode")
    } else {
      setDifficultyMode(localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" && props.mode === Unlimited ? "Easy Mode" : "Normal Mode" : "Normal Mode")
    }
    setTiles(props.tiles)
  }, [props.tiles, props.mode])

  // // useEffect(() => {
  // //   console.log("test")
  //   if (props.mode === Daily) {
  //     setDifficultyMode("Normal Mode")
  //   } else {
  //     setDifficultyMode(localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" && props.mode === Unlimited ? "Easy Mode" : "Normal Mode" : "Normal Mode")
  //   }
  // // }, [props.mode])

  const [difficultyMode, setDifficultyMode] = useState(localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" && props.mode === Unlimited ? "Easy Mode" : "Normal Mode" : "Normal Mode")
  const [ruleSet, setRuleSet] = useState(localStorage.getItem("officialRules") !== null ? localStorage.getItem("officialRules") === "true" ? "Official Rules" : "Unofficial Rules" : "Unofficial Rules")

  console.log(tiles[0])

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