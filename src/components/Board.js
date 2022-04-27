import React from "react";
import utils from '../utils';
import TileNew from "./Tile";
import BoardSquareNew from "./Square";
import Stack from '@mui/material/Stack';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;

class Board extends React.Component {

  renderBoardSquares(tiles) {
    const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);

    let squares = []

    matrix.map((row, rowIndex) => {
      let tempRow = []

      row.map(index => {

        let element = <BoardSquareNew
          x={index}W
          y={rowIndex+1}
          key={`tile-bench-${index}${rowIndex}`}
        />

        tiles.forEach(tile => {
          if (tile.x === index && tile.y === rowIndex+1) {
            element = <TileNew key={tile.id} {...tile} />
          }
        })
        tempRow.push(element)
      })
      squares.push(
      <Stack spacing={0} direction="row" justifyContent="center" alignItems="center">
          {tempRow}
      </Stack>
      )
    })
    return squares;
  };

  render() {
    return this.renderBoardSquares(this.props.tiles)
  }
}

export default Board;