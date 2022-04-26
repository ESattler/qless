import React from "react";
import Tile from "./Tile";
import utils from '../utils';
import TileBenchSquare from "./TileBenchSquare";

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 1;

class TileBench extends React.Component {

  renderBoardSquares() {
    const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);
    return matrix.map((row, rowIndex) =>
      row.map(index => {
        return (
          <TileBenchSquare
            x={index}
            y={rowIndex}
            key={index}
          />
        );
      })
    );
  };

  render() {
    let tiles = []
    for (let tile of this.props.tiles) {
      console.log("Creating Tile ", tile.letter, tile.x, tile.y)
      tiles.push(<Tile key={tile.id} {...tile} />)
    }

    console.log("Tile bench", tiles)
    return (
        <div className="tile-bench-border">
          <div className="tile-bench">
            {tiles}
            {this.renderBoardSquares()}
          </div>
      </div>
    );
  }
  }
  
  export default TileBench;