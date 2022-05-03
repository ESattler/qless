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

    return (
      <Box
        sx={{
          // width: `${SQUARE_SIZE}px`,
          // height: `${SQUARE_SIZE}px`,
          width: `4rem`,
          height: `4rem`,
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
          lineHeight: `${SQUARE_SIZE}px`,
          textAlign: "center",
          fontWeight: 700,
        }}>
          {props.letter}
        </Typography>  
      </Box>
    );
  }
  
  export default Tile;