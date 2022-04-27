import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AppView from './views/AppView';

function App() {

  console.log("Rerender App")

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppView />} />
      </Routes>
    </Router>
  );
}

export default App;
