import React from "react";
import classNames from "classnames";
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

  const classes = classNames({
    "tile-bench-square": true,
    "dragged-over": isOver
  });

  return <div className={classes} ref={drop}/>;

}
  
  export default TileBenchSquare;