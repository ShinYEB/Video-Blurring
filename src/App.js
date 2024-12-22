import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import MainViewController from './Presentation/Main/MainViewController';
import MypageViewController from './Presentation/Mypage/MypageViewController';
import LoginViewController from './Presentation/Login/LoginViewController';
import LogoutViewController from './Presentation/Login/LogoutViewController';
import VideoEditViewController from './Presentation/VideoEdit/VideoEditViewController';


function App() {
  return (
    <div>
        <BrowserRouter>
              <Routes>
                  <Route path="/" element={<MainViewController/>}/>
                  <Route path='/mypage' element={<MypageViewController/>}/>
                  <Route path="/login" element={<LoginViewController/>}/>
                  <Route path="/home" element={<LogoutViewController/>}/>
                  <Route path="/video" element={<VideoEditViewController/>}/>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;