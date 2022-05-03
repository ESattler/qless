import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createTiles, generateMatches, generateRandomLetters } from '../GameState';
import GameViewNew from './GameView';

const AppView = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameViewNew tiles={createTiles(generateRandomLetters())}/>
    </DndProvider>
  )
}

export default AppView