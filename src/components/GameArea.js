import React from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import Board from "./Board";
import TileBench from "./TileBench";

const GameArea = (props) => {

  return (
    <Container disableGutters maxWidth="md" component="main" sx={{ pt: 0, pb: 0 }}>
      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 5, pb: 5 }}>
        <Stack spacing={0} direction="row" justifyContent="center" alignItems="center">
          <Typography sx={{
            fontWeight: 'bold'
          }}>
            {props.difficultyMode}
          </Typography>
          <Typography sx={{
            paddingLeft: 2,
            paddingRight: 2
          }}>
            |
          </Typography>
          <Typography sx={{
            fontWeight: 'bold'
          }}>
            {props.ruleSet}
          </Typography>
        </Stack>
        <Board tiles={props.tiles}/>
      </Container>
      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 5, pb: 6 }}>
        <TileBench tiles={props.tiles}/>  
      </Container>
    </Container>
  );
}
  
export default GameArea;