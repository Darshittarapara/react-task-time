import React, { useEffect } from 'react'
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashBoard from './screen/Dashboard/DashBoard';
import MainHeader from './components/MainHeader/MainHeader';
import { useContext } from 'react';
import { authContext } from './context/AuthContext';
import Auth from './screen/Auth/Auth';
import TimeHistory from './screen/TimeHistory/TimeHistory';

function App() {
  const navigator = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { isAuth } = useContext(authContext);

  useEffect(() => {
    if (!isAuth && !user?.userToken) {
      navigator("/auth")
    }
  }, [isAuth, navigator, user?.userToken])
  return (
    <div className="App">
      {isAuth && <MainHeader />}
      {!isAuth && user?.userToken && <MainHeader />}
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/timehistory" element={<TimeHistory />} />
      </Routes>
    </div>
  );
}

export default App;
