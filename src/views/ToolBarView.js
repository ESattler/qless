
import { useState } from "react";
import { Grid, Typography, Container, IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpDialog from '../components/HelpDialog';

const ToolBarView = (props) => {

  const [helpOpen, setHelpOpen] = useState(false);
  const handleHelpOpen = () => {
    setHelpOpen(true);
  };

  const handleHelpClose = () => {
    setHelpOpen(false);
  };


  return (
    <Container
      maxWidth="xs"
      component="header"
      sx={{
        borderBottom: (theme) => `1px solid #555a5e`,
        pb: 0
      }}
    >
      <Grid container maxWidth="sm" justifyContent="center">
        <Grid container item md={2} justifyContent="flex-end" alignItems="flex-end">
            <IconButton aria-label="delete" size="large" onClick={() => handleHelpOpen()}>
              <HelpOutlineIcon fontSize="inherit" sx={{ fontSize: "40px"}}/>
            </IconButton>
        </Grid>
        <Grid container item md={5} justifyContent="center">
          <Typography variant="h3" color="inherit" align="center" noWrap>
            QLESS
          </Typography>
        </Grid>
        <Grid container item md={2} justifyContent="flex-start" alignItems="flex-start">
          <IconButton aria-label="delete" size="large">
            <SettingsIcon fontSize="inherit" sx={{ fontSize: "40px"}}/>
          </IconButton>
        </Grid>
      </Grid>
      <HelpDialog open={helpOpen} onClose={handleHelpClose} onClick={handleHelpClose}/>
    </Container>
  );
}

export default ToolBarView