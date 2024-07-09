import React, { useState } from "react";
import "../componentes/css/headerStyle.css";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const nombre = localStorage.getItem("nombre");

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const salirSesion = () => {
    localStorage.removeItem("nombre");
  };

  return (
    <header className="header-container">
      <h1 className="header-title">Bienvenido {nombre}</h1>
      <button onClick={toggleMenu}>☰</button>
      {menuVisible && (
        <nav className="header-nav">
          <ul>
            <li>
              <a href="/inicio">Inicio</a>
            </li>
            <li>
              <a href="/juego">Entretenimineto</a>
            </li>
            <li>
              <a href="/agenda">Calendario</a>
            </li>
            <li>
              <a onClick={salirSesion} href="/">
                Salir sesión
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
