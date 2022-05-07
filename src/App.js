import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Daily, Unlimited } from "./constants";
import AppView from './views/AppView';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppView mode={Daily}/>} />
        <Route path="/unlimited" element={<AppView mode={Unlimited}/>} />
        <Route path="*" element={<AppView mode={Daily} />} />
      </Routes>
    </Router>
  );
}

export default App;
