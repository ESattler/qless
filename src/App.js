import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import GameView from './views/GameView';
import { generateRandomLetters } from './GameState';

function App() {

  console.log("Rerender App")

  const letters = generateRandomLetters()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <GameView letters={letters}/>
      </div>
    </DndProvider>
  );
}

export default App;
