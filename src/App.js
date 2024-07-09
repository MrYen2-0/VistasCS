import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from "./components/Inicio.jsx"
import Chat from "./components/chat1.jsx"
import Login from './components/Login.jsx';
import Registro from './components/Registro.jsx';
import PiedraPapel from "./components/PiedraPapel.jsx"
import SalaChats from './components/SalaChats.jsx';
import TablaPuntaje from './components/componentes/TablaPuntaje.jsx';
import Chat2 from './components/chat2.jsx';
import Agenda from './components/componentes/Agenda.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/inicio' element={<Inicio/>}/>
          <Route path='/salaChat' element={<SalaChats/>}/>
          <Route path='/chat1' element={<Chat/>}/>
          <Route path='/chat2' element={<Chat2/>}/>
          <Route path='/juego' element={<PiedraPapel/>}/>
          <Route path='/tabla' element={<TablaPuntaje/>}/>
          <Route path='/agenda' element={<Agenda/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
