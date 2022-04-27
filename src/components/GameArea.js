import React from "react";
import { Container } from "@mui/material";
import Board from "./Board";
import TileBench from "./TileBench";

class GameArea extends React.Component {

  render() {
    return (
      <>
        <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 10, pb: 5 }}>
          <Board tiles={this.props.tiles}/>
        </Container>
        <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 5, pb: 6 }}>
          <TileBench tiles={this.props.tiles}/>  
        </Container>
      </>
    );
  }
}
  
  export default GameArea;