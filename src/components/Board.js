import React from "react";
import utils from '../utils';
import Tile from "./Tile";
import Square from "./Square";
import { Stack } from '@mui/material';

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

const Board = (props) => {

  function renderBoardSquares(tiles) {
    const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);

    let squares = []

    matrix.map((row, rowIndex) => {
      let tempRow = []

      row.map(index => {

        let element = <Square
          x={index}W
          y={rowIndex+1}
          key={`board-${index}${rowIndex}`}
          board={true}
        />

        tiles.forEach(tile => {
          if (tile.x === index && tile.y === rowIndex+1) {
            element = <Tile key={`tile-${tile.id}`} {...tile} board={true}/>
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

  return renderBoardSquares(props.tiles)
}

export default Board;