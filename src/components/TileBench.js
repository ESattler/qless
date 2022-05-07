import React from "react";
import Tile from "./Tile";
import Square from "./Square";
import Stack from '@mui/material/Stack';
import { Container } from "@mui/material";

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 1;

const TileBench = (props) => { 

  function renderBoardSquares(tiles) {
    const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);

    let firstRow = []
    let secondRow = []

    matrix.forEach((row, rowIndex) => {
      row.forEach((value, index) => {
        tiles.forEach(tile => {
          if (tile.x === index && tile.y === rowIndex) {
            if ( index <= 5) {
              firstRow.push(<Tile key={`tile-${tile.id}`} {...tile} board={false} />)
            } else {
              secondRow.push(<Tile key={`tile-${tile.id}`} {...tile} board={false} />)
            }
          }
        })
      })
    })

    return (
      <>
        <Stack spacing={3} direction="row" justifyContent="center" alignItems="center">
            {firstRow}
        </Stack>
        <Stack spacing={3} direction="row" justifyContent="center" alignItems="center" sx={{paddingTop: '10px'}}>
            {secondRow}
        </Stack>
      </>
    )
  };

  return renderBoardSquares(props.tiles)
}

export default TileBench;