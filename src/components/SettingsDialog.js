import { useEffect, useState } from 'react';
import {Typography, IconButton, Dialog, DialogTitle, DialogContent, Switch, Divider, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Daily, Unlimited } from '../constants';


const SettingsDialog = (props) => {

  const [easyMode, setEasyMode] = useState(localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" && props.mode === Unlimited : false);

  const handleEasyModeChange = (event) => {
    localStorage.setItem("easyMode", event.target.checked)
    setEasyMode(event.target.checked)
    event.target.checked ? props.setDifficultyMode("Easy Mode") : props.setDifficultyMode("Normal Mode")

  };

  useEffect(() => {
    if (props.mode === Daily) {
      setEasyMode(false)
    } else {
      setEasyMode(localStorage.getItem("easyMode") !== null ? localStorage.getItem("easyMode") === "true" && props.mode === Unlimited : false)
    }
  }, [props.mode])

  const [officalRules, setOfficalRules] = useState(localStorage.getItem("officialRules") !== null ? localStorage.getItem("officialRules") === "true" : false);

  const handleOfficialRulesChange = (event) => {
    localStorage.setItem("officialRules", event.target.checked)
    setOfficalRules(event.target.checked)
    event.target.checked ? props.setRuleSet("Official Rules") : props.setRuleSet("Unofficial Rules")
  };

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth="xs"
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
        <Divider sx={{ m: 0, p: 2, fontWeight: "bold" }}>EASY MODE</Divider>
        <Box textAlign='center'>
          <Typography>
            Guaranteed three vowels and removes V/X/Z from letter pool. Not available in DAILY mode.
          </Typography>
          <Switch checked={easyMode} disabled={props.mode === Daily} onChange={handleEasyModeChange}/>
        </Box>
        <Divider sx={{ m: 0, p: 2, fontWeight: "bold" }}>OFFICIAL RULES</Divider>
        <Box textAlign='center'>
          <Typography>
            Bans two letter words
          </Typography>
          <Switch checked={officalRules} onChange={handleOfficialRulesChange}/>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog;