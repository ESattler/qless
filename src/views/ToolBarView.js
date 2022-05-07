
import { useState } from "react";
import { Typography, IconButton, AppBar, Toolbar, Button, Grid} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpDialog from '../components/HelpDialog';
import SettingsDialog from "../components/SettingsDialog";
import { Daily, Unlimited } from "../constants";
import { useNavigate } from 'react-router-dom'

const ToolBarView = (props) => {

  const [helpOpen, setHelpOpen] = useState(false);
  const handleHelpOpen = () => {
    setHelpOpen(true);
  };

  const handleHelpClose = () => {
    setHelpOpen(false);
  };

  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  let nav = useNavigate();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
    >
      <Toolbar justifyContent="center" alignItems="center" sx={{justifyContent: "center", alignItems: "center"}}>
        <Grid maxWidth="sm" justify={"space-between"} container>
          <Grid xs={3} container direction="row" justifyContent="center" alignItems="center">
            <Typography sx={{fontWeight: 700, color: "#444140",}}>QLESS</Typography>
          </Grid>
          <Grid xs={6} container direction="row" justifyContent="left" alignItems="center">
            <Grid container direction="row" justifyContent="left" alignItems="center">
              <Button disableRipple onClick={() => nav("/qless", { replace: true })} variant="text" sx={{
                borderRadius: "10px",
                color: "#444140",
                fontWeight: 500,
                backgroundColor: props.mode === Daily ? "#FFA987" : "transparent",
                '&:hover': {
                  backgroundColor: '#FFA987',
                },
                marginRight: "10px"
              }}>
                Daily
              </Button>
              <Button disableRipple onClick={() => nav("/qless/unlimited", { replace: true })} variant="text" sx={{
                borderRadius: "10px",
                color: "#444140",
                fontWeight: 500,
                backgroundColor: props.mode === Unlimited ? "#FFA987" : "transparent",
                '&:hover': {
                  backgroundColor: '#FFA987',
                },
              }}>
                Unlimited
              </Button>
            </Grid>
          </Grid>
          <Grid xs={3}> 
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <IconButton size="large" onClick={() => handleHelpOpen()}>
                <HelpOutlineIcon />
              </IconButton>
              <IconButton size="large" onClick={() => handleSettingsOpen()}>
                <SettingsIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    <HelpDialog open={helpOpen} onClose={handleHelpClose} onClick={handleHelpClose}/>
    <SettingsDialog open={settingsOpen} onClose={handleSettingsClose} onClick={handleSettingsClose} setDifficultyMode={props.setDifficultyMode} setRuleSet={props.setRuleSet} mode={props.mode}/>
  </AppBar>
  );
}

export default ToolBarView