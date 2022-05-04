import React from "react";
import { ItemTypes } from '../constants'
import { useDrag, useDrop } from 'react-dnd'
import { swapTile } from "../GameState";
import { Box, Typography } from "@mui/material";

const SQUARE_SIZE = 70;

const Tile = (props) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TILE,
        item: () => {
          return {id: props.id}
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
          })
      }))

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TILE,
        drop: (item, monitor) => {
          swapTile(item.id, props.id)
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }), [props.x, props.y])


    let size = props.board ? '6vh' : '5vh'

    return (
      <Box
        sx={{
          width: size,
          height: size,
          background: "#FFA987",
          cursor: "move",
          borderRadius: "5px"
        }}
        ref={(node) => drag(drop(node))}
      >
        <Typography variant="h3" sx={{
          position: "relative",
          color: "#222",
          height: 1,
          fontSize: "2.5rem",
          lineHeight: size,
          textAlign: "center",
          fontWeight: 700,
        }}>
          {props.letter}
        </Typography>  
      </Box>
    );
  }
  
  export default Tile;