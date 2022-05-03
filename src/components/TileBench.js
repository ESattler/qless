import React from "react";
import TileNew from "./Tile";
import TileBenchSquareNew from "./Square";
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

        let element = <TileBenchSquareNew
          x={index}
          y={rowIndex}
          key={`tile-bench-${index}${rowIndex}`}
        />

        tiles.forEach(tile => {
          if (tile.x === index && tile.y === rowIndex) {
            element = <TileNew key={`tile-${tile.id}`} {...tile} />
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