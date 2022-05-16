import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserHome from './pages/UserHome';
import Tournaments from './pages/Tournaments';
import Teams from './pages/Teams';
import Matches from './pages/Matches';
import ScheduleMatch from './pages/ScheduleMatch';
import Bidders from './pages/Bidders';
import LeaderBoard from './pages/LeaderBoard';
import CreateBid from './pages/CreateBid';
import Biddings from './pages/Biddings';
import UpdateMatch from './pages/UpdateMatch';

function App() {
  return (
    <div className="App">
      <ToastContainer 
      position="top-right"
      autoClose={4000}
      /> 
      <BrowserRouter>      
        <Routes>
          <Route element={<LoginPage />} path="/" exact />                    
          <Route element={<Dashboard/>} path="/dashboard"/>                              
          <Route element={<Users/>} path="/users"/>                              
          <Route element={<Tournaments/>} path="/tournaments"/>                              
          <Route element={<Teams/>} path="/teams"/>                              
          <Route element={<Matches/>} path="/matches"/>                              
          <Route element={<Bidders/>} path="/bidders"/>                              
          <Route element={<LeaderBoard/>} path="/leaders"/>                              
          <Route element={<LeaderBoard/>} path="/teamleaders"/>                              
          <Route element={<CreateBid/>} path="/createbid"/>                              
          <Route element={<Biddings/>} path="/biddings"/>                              
          <Route element={<ScheduleMatch/>} path="/schedule"/>                              
          <Route element={<UpdateMatch/>} path="/update"/>                              
          <Route element={<UserHome/>} path="/profile"/>                              
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
