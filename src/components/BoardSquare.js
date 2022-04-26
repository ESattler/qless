import React from "react";
import classNames from "classnames";
import { ItemTypes } from '../constants'
import { useDrop } from 'react-dnd'
import { canDropTile, moveTile } from "../GameState";

const BoardSquare = (props) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.TILE,
    drop: (item, monitor) => {
      moveTile(props.x, props.y, item)
    },
    //canDrop: (item) => canDropTile(props.x, props.y, item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [props.x, props.y])

  const classes = classNames({
    "board-square": true,
    "dragged-over": isOver,
    //"cant-drop": isOver && !canDrop
  });

  return <div className={classes} ref={drop}/>;

}
  
  export default BoardSquare;