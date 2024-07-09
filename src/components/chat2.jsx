/*import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import moment from "moment";
import axios from "axios";
import Header from "./componentes/HeaderWB";*/

//const socket = io("http://localhost:3300/chatA");

function Chat2() {
  
}

/*function Chat2() {
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [conectado, setConectado] = useState();
  const nombre = localStorage.getItem("nombre");

  const chatRef = useRef(null);

  useEffect(() => {
    if (nombre === null) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    socket.on("connect", () => setConectado(true));

    socket.on("mensajeChatA", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    });

    obtenerMensajes();

    return () => {
      socket.off("mensajeChatA");
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensajes]);

  const obtenerMensajes = () => {
    axios.get("http://localhost:3300/chatA/visualizar")
      .then((response) => {
        setMensajes(response.data);
      })
      .catch((error) => {
        console.log("Error al obtener los mensajes");
      });
  };

  const enviarMensaje = () => {
    const fechaHora = new Date();
    const fechaHoraFormateada = moment(fechaHora).format("DD/MM/YYYY HH:mm");

    const mensaje = {
      usuario: nombre,
      mensaje: nuevoMensaje,
      fecha: fechaHoraFormateada,
    };

    socket.emit("mensajeChatA", mensaje);
    axios
      .post("http://localhost:3300/chatA/enviar", mensaje)
      .then((response) => {
        console.log("Mensaje enviado correctamente");
      })
      .catch((error) => {
        console.log("Error al enviar el mensaje");
      });

    setNuevoMensaje("");
  };

  return (
    <div>
      <Header />
      <div className="chat-container">
        <div className="chat" ref={chatRef}>
          {mensajes.map((mensaje, index) => (
            <p
              key={index}
              className={`message ${
                mensaje.usuario === nombre ? "message-own" : "message-incoming"
              }`}
            >
              {mensaje.usuario}:{mensaje.mensaje}:{mensaje.fecha}
            </p>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            className="message-input"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
          />
          <Button className="send-button" onClick={enviarMensaje}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
*/
export default Chat2;