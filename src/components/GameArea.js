import React from "react";
import Tile from "./Tile";
import BoardSquare from './BoardSquare';
import utils from '../utils';
import TileBench from "./TileBench";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;

class GameArea extends React.Component {

  renderBoardSquares() {
    const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);
    return matrix.map((row, rowIndex) =>
      row.map(index => {
        return (
          <BoardSquare
            x={index}
            y={2 + rowIndex}
            key={index}
          />
        );
      })
    );
  };

  render() {
    return (
      <div>
        <div id="scrabble">
          <TileBench tiles={this.props.tiles}/>
          <div className="board-border">
            <div className="board">
              {/* {tiles} */}
              {this.renderBoardSquares()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  }
  
  export default GameArea;