import React, { useState, useEffect } from "react";
import "../css/juego.css";
import Header from "./componentes/HeaderWB";
import { jwtDecode } from 'jwt-decode';

const PiedraPapelTijeras = () => {

  const opciones = ["piedra", "papel", "tijeras"];
  const [jugador, setJugador] = useState(null);
  const [computadora, setComputadora] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [bloquearBotones, setBloquearBotones] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [perdio, setPerdio] = useState(false);
  const nombreUsuario = localStorage.getItem("nombre");
  const [conectado,setConectado]=useState(false)

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      window.location.href = "/";
    }
    function setNewWebsockets(message) {
      const newSocket = new WebSocket("ws://100.29.114.156");
      console.log(message);
      
      newSocket.onopen = () => {
        setConectado(true)
        console.log('conexion a websockets inicializada');
        setSocket(newSocket);
      };

      newSocket.onclose = () => {
        setConectado(false)
        setTimeout(() => setNewWebsockets('la conexion a websockets ha sido cerrada, intentando reconectar'), 2500);
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        newSocket.close();
      };

      newSocket.onmessage = (event) => {
        console.log('Received message from WebSocket:', event.data);
      };
    }

    if (!socket) {
      setNewWebsockets('WebSocket connection opened');
    }

    return () => {
      if (socket) {
        socket.close();
      }
    }
  },[]);


function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000;
    return expirationDate < new Date().getTime();
  } catch {
    return true;
  }
}

  const handleClick = () => {
    if (puntaje > 0) {
      enviarDatos()
    }
    window.location.href = "/tabla";
  };

  useEffect(() => {
    if (nombreUsuario == null) {
      window.location.href = "/";
    }
  });


  const enviarDatos = () => {
    if (socket.readyState === WebSocket.OPEN) {
      const data = {
        action: 'postPuntaje',
        body: {
          name: nombreUsuario,
          value: puntaje
        }
      };
      socket.send(JSON.stringify(data));
    }
  };

  const jugar = (opcion) => {
    if (perdio) return;
    setJugador(opcion);
    setBloquearBotones(true);

    setTimeout(() => {
      const indiceComputadora = Math.floor(Math.random() * 3);
      const opcionComputadora = opciones[indiceComputadora];
      setComputadora(opcionComputadora);

      if (opcion === opcionComputadora) {
        setResultado("Empate");
        setBloquearBotones(false);
      } else if (
        (opcion === "piedra" && opcionComputadora === "tijeras") ||
        (opcion === "papel" && opcionComputadora === "piedra") ||
        (opcion === "tijeras" && opcionComputadora === "papel")
      ) {
        setResultado("Ganaste");
        setPuntaje((prevPuntaje) => prevPuntaje + 100);
        setBloquearBotones(false);
      } else {
        setResultado("Perdiste");
        setPerdio(true);
      }
    }, 1000);
  };

  const reiniciarJuego = () => {
    if (puntaje > 0) {
      enviarDatos()
    }
    setJugador(null);
    setComputadora(null);
    setResultado(null);
    setBloquearBotones(false);
    setPuntaje(0);
    setPerdio(false);
  };
  useEffect(() => {
    if (resultado !== null) {
      setTimeout(() => {
        setBloquearBotones(false);
      }, 2000);
    }
  }, [resultado]);

  return (
    <div>
      <Header />
      <div className="game-container">
        <h1 className="title">Piedra, Papel, Tijeras</h1>
        <div className="buttons-container">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              className="button"
              onClick={() => jugar(opcion)}
              disabled={bloquearBotones}
            >
              {opcion}
            </button>
          ))}
        </div>
        {jugador && computadora && (
          <div className="result-container">
            <p>Tu elección: {jugador}</p>
            <p>Elección de la computadora: {computadora}</p>
            <p>Resultado: {resultado}</p>
            <p>Puntaje: {puntaje}</p>
            {perdio && (
              <div>
                <button className="button" onClick={reiniciarJuego}>
                  Reiniciar
                </button>
                <button className="button" onClick={handleClick}>
                  Tabla de puntaje
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PiedraPapelTijeras;
