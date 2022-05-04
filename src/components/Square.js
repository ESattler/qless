import React from "react";
import { Box } from "@mui/material";
import { ItemTypes } from '../constants'
import { useDrop } from 'react-dnd'
import { moveTile } from "../GameState";

const TileBenchSquare = (props) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TILE,
    drop: (item, monitor) => {
      console.log("Dropped items props", item)
      moveTile(props.x, props.y, item)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [props.x, props.y])

  let size = props.board ? '6vh' : '5vh'

  let style = {
    width: size,
    height: size,
    backgroundColor: "#444140",
    boxShadow: "inset 0px 0px 0px 1px #F4E5E1",
  }
  if (isOver) {
    style.background = "rgb(87, 155, 87)"
  }

  return <Box
    sx={style}
    ref={drop}
  />

}
  
  export default TileBenchSquare;