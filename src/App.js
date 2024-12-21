import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import MainViewController from './Presentation/Main/MainViewController';

function App() {
  return (
    <div>
        <BrowserRouter>
              <Routes>
                  <Route path="/" element={<MainViewController/>}/>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;