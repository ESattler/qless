import React, { useState } from "react";
import { ItemTypes } from '../constants'
import { useDrag, useDrop } from 'react-dnd'
import { swapTile } from "../GameState";

const SQUARE_SIZE = 56;
const TILE_OFFSET = -10;

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
          console.log("in tile drop", item, props.id)
          swapTile(item.id, props.id)
          //console.log(item)
          //return {x: x, y: y}
        },
        //drop: p => {return {x: props.x, y: props.y} },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }), [props.x, props.y])

    let x = props.x
    let y = props.y
    const styles = {
      left: x * SQUARE_SIZE - TILE_OFFSET,
      top: y * SQUARE_SIZE - TILE_OFFSET,
      zIndex: `${x + 1}${y + 1}`,
    };

    return (
        <div className='tile' key={props.id} style={styles} ref={(node) => drag(drop(node))}>
            <span className="tile-letter">{props.letter}</span>
        </div>
    );
  }
  
  export default Tile;