import {Typography, IconButton, Dialog, DialogTitle, DialogContent, Link, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


const HelpDialog = (props) => {
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={props.onClick}
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
        <Divider sx={{ m: 0, p: 2, fontWeight: "bold" }}>HISTORY</Divider>
        <Typography gutterBottom>
          QLess is based on the dice game of a similar name. The Q-Less dice game was created by Tom Sturdevant
          and can be bought from the <Link href="https://www.q-lessgame.com/" target="_blank">Q-Less website</Link>.
        </Typography>
        <Divider sx={{ m: 0, p: 2, fontWeight: "bold" }}>HOW TO PLAY</Divider>
        <Typography gutterBottom>
          The goal of the game is to create a board of interconnecting words using twelve randomized letters.
          All words are validated using the 2019 official Scrabble® dictionary.
        </Typography>
        <Divider sx={{ m: 0, p: 2, fontWeight: "bold" }}>RULE CHANGES</Divider>
        <Typography gutterBottom>
          This game differs from the official Q-Less game in that it allows the use of two letter words.
          In the settings you can turn on the official ruleset which will ban two letter words.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default HelpDialog