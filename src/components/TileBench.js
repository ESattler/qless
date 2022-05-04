import React from "react";
import Tile from "./Tile";
import Square from "./Square";
import Stack from '@mui/material/Stack';

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 1;

const TileBench = (props) => { 

  function renderBoardSquares(tiles) {
    const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);

    let squares = []

    matrix.map((row, rowIndex) => {
      let tempRow = []

      row.map(index => {

        let element = <Square
          x={index}
          y={rowIndex}
          key={`tile-bench-${index}${rowIndex}`}
          board={false}
        />

        tiles.forEach(tile => {
          if (tile.x === index && tile.y === rowIndex) {
            element = <Tile key={`tile-${tile.id}`} {...tile} board={false} />
          }
        })
        tempRow.push(element)
      })
      squares.push(
      <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
          {tempRow}
      </Stack>
      )
    })
    return squares;
  };

  return renderBoardSquares(props.tiles)
}

export default TileBench;