import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { createTiles, getLetters } from '../GameState';
import GameView from './GameView';
import { isMobile } from 'react-device-detect';

const AppView = (props) => {
  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <GameView tiles={createTiles(getLetters(props.mode), props.mode)} mode={props.mode}/>
    </DndProvider>
  )
}

export default AppView