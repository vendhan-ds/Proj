//import logo from './logo.svg';
import React from "react";
import {Route, Routes} from "react-router-dom"

import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import HomePage from "./components/HomePage"
import GroupHome from "./components/GroupHome"
import NewMessage from "./components/home/AddNewMsg"
import NewGroup from "./components/group/AddNewGrp"
import './App.css';

function App() {
  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path= "/" element={<LoginPage/>} exact />
          <Route path= "/Login" element={<LoginPage/>} exact />
          <Route path= "/Register" element={<RegisterPage/>} exact />
          <Route path= "/Home">
            <Route index element={<HomePage/>}/>
            <Route path='NewMessage' element={<NewMessage/>}/>
            <Route path='GroupHome' >
              <Route index element={<GroupHome/>}/>
              <Route path='AddNewGroup' element={<NewGroup/>}/>
            </Route>
          </Route> 
        
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
