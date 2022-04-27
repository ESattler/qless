import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { generateRandomLetters } from '../GameState';
import GameViewNew from './GameView';

const AppView = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameViewNew letters={generateRandomLetters()}/>
    </DndProvider>
  )
}

export default AppView