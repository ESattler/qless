import React from "react";
import { ItemTypes } from '../constants'
import { useDrag, useDrop } from 'react-dnd'
import { swapTile } from "../GameState";
import { Box, Typography } from "@mui/material";

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


    let style = {
      width: props.board ? '8vw' : '4vw',
      height: props.board ? '8vw' : '4vw',
      minWidth: props.board ? "3rem" : "2.5rem",
      maxWidth: props.board ? "4rem" : "2.5rem",
      minHeight: props.board ? "3rem" : "2.5rem",
      maxHeight: props.board ? "4rem" : "2.5rem",
      background: "#FFA987",
      cursor: "move",
      borderRadius: "5px"
    }

    return (
      <Box
        alignItems="center"
        justifyContent="center"
        sx={style}
        ref={(node) => drag(drop(node))}
      >
        <Typography alignItems="center" justifyContent="center" sx={{
          position: "relative",
          color: "#444140",
          height: 1,
          fontSize: "1rem",
          lineHeight: style.minHeight,
          textAlign: "center",
          fontWeight: 700,
        }}>
          {props.letter}
        </Typography>  
      </Box>
    );
  }
  
  export default Tile;