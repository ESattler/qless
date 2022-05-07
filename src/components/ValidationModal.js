import { useState } from 'react';
import { Grid, Paper, IconButton, Dialog, DialogTitle, DialogContent, Divider, Tooltip, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Draggable from "react-draggable";
import { isMobile } from 'react-device-detect';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ValidationModal = (props) => { 

  let validWords = []
  let invalidWords = []
  for (let word of props.foundWords) {
    if (word.valid) {
      validWords.push(
          <Grid container justifyContent="center"item sm={12}>
            <CheckIcon color="success" /> {word.word}
          </Grid>
      )
    } else {
      invalidWords.push(
        <Grid container justifyContent="center"item sm={12}>
          <CloseIcon color="error" /> {word.word}
        </Grid>
      )
    }
  }

  const [toolTipOpen, setToolTipOpen] = useState(false);
  const handleShareClick = () => {
    setToolTipOpen(true)
    navigator.clipboard.writeText(setCopyText())
    setTimeout(() => {
      setToolTipOpen(false);
    }, "500");
  }

  const setCopyText = () => {
    if (!props.open) {
      return ""
    }

    let matrix = [];
    for(let  i = 0;  i < 8; i++) {
        matrix[i] = new Array(8).fill("⬛");
    }

    const difficultyMode = localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" ? "Easy Mode" : "Normal Mode" : "Normal Mode"
    const ruleSet = localStorage.getItem("officialRules") !== null ? localStorage.getItem("officialRules") === "true" ? "Official Rules" : "Unofficial Rules" : "Unofficial Rules"

    props.tiles.forEach(tile => {
      console.log("Tile", tile.letter, tile.x, tile.y)
      let x = tile.x
      let y = tile.y
      matrix[y-1][x] = "🟩"
    })

    let text = `QLess Game (https://tinyurl.com/qlessgame)\n${difficultyMode} | ${ruleSet}\n`
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        text = text.concat(matrix[i][j])
      }
      text = text.concat("\n")
    }

    return text
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.andleClose}
      PaperComponent={isMobile ? null : PaperComponent}
      aria-labelledby="draggable-dialog-title"
      id="draggable-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle style={{ cursor: "move" }}>
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        { validWords.length > 0 &&
          <>
            <Divider sx={{ m: 0, p: 2 }}>CORRECT WORDS</Divider>
            <Grid container justify="center" alignContent="center" sm={12} spacing={3}>
              {validWords}
            </Grid>
          </>
        } 
        { invalidWords.length > 0 &&
          <>
            <Divider sx={{ m: 0, p: 2 }}>INCORRECT WORDS</Divider>
            <Grid container justify="center" alignContent="center" sm={12} spacing={3}>
              {invalidWords}
            </Grid>
          </>
        }
        { invalidWords.length === 0 &&
          <>
            <Divider sx={{ m: 2, p: 2 }}></Divider>
            <Grid container justify="center" alignContent="center" sm={12}>
              <Grid container justifyContent="center"item sm={12}>
                <Tooltip open={toolTipOpen} title="Copied">
                  <Button variant="contained" sx={{backgroundColor: "#FFA987", width: 0.33}} onClick={() => handleShareClick()}>Share</Button>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        } 
      </DialogContent>
    </Dialog>
  )
}

export default ValidationModal