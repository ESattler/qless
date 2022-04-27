import React from "react";
import { ItemTypes } from '../constants'
import { useDrag, useDrop } from 'react-dnd'
import { swapTile } from "../GameState";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';

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
          width: `${SQUARE_SIZE}px`,
          height: `${SQUARE_SIZE}px`,
          background: "#FFA987",
          cursor: "move",
        }}
        ref={(node) => drag(drop(node))}
      >
        <Typography variant="h3" sx={{
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: "#222",
          "font-size": "2.5rem",
          "line-height": "56px",
          'text-align': "center",
          "font-weight": 700,
        }}>
          {props.letter}
        </Typography>  
      </Box>
    );
  }
  
  export default Tile;