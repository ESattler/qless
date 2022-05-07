import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { createTiles, generateRandomLetters } from '../GameState';
import GameView from './GameView';
import { isMobile } from 'react-device-detect';

const AppView = (props) => {
  console.log("Is Mobile", isMobile)
  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <GameView tiles={createTiles(generateRandomLetters())} mode={props.mode}/>
    </DndProvider>
  )
}

export default AppView