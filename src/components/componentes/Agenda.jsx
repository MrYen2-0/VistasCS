import React, { useEffect } from "react";
import axios from "axios";
import Header from "./HeaderWB";
import "./css/tablaAgendas.css"

function Agenda() {
  useEffect(() => {
    const notificaciones = document.getElementById("notificaciones");

    const pintarNotificacion = (notificacion) => {
      const li = document.createElement("li");
      li.classList.add("notificacion");
    
      const fechaElement = document.createElement("span");
      fechaElement.innerText = notificacion.fecha;
      fechaElement.classList.add("fecha");
      li.appendChild(fechaElement);
    
      const usuarioElement = document.createElement("span");
      usuarioElement.innerText = notificacion.usuario;
      usuarioElement.classList.add("usuario"); 
      li.appendChild(usuarioElement);
    
      const mensajeElement = document.createElement("p");
      mensajeElement.innerText = notificacion.mensaje;
      mensajeElement.classList.add("mensaje"); 
      li.appendChild(mensajeElement);
    
      notificaciones.appendChild(li);
    };

    const pintarNotificaciones = (notificaciones) => {
      for (const notificacion of notificaciones) {
        pintarNotificacion(notificacion);
      }
    };

    const obtenerNotificaciones = async () => {
      try {
        const res = await axios.get("http://100.29.114.156/agenda/ver");
        const data = res.data;
        const notificaciones = data.notificaciones;
        pintarNotificaciones(notificaciones);
        console.log(notificaciones);
      } catch (error) {
        console.log(error);
      }
    };
    const obtenerFechaActual = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const fechaActual = obtenerFechaActual();
    const fechaInput = document.getElementById("fecha-input");
    fechaInput.min = fechaActual;

    const source = new EventSource("http://100.29.114.156/agenda/nueva-agenda");
    source.onmessage = function (event) {
      pintarNotificacion(JSON.parse(event.data));
    }

    const enviarNotificacion = async (fecha,usuario,mensaje) => {
      try {
        const res = await axios.post("http://100.29.114.156/agenda/guardar", {
          fecha,
          usuario,
          mensaje,
        });
        const data = res.data;
        console.log(data.message);
      } catch (error) {
        console.log(error);
      }
    };

    document.getElementById("nueva-notificacion-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const fecha = document.getElementById("fecha-input").value;
        const mensaje = document.getElementById("mensaje-input").value;
        const usuario = localStorage.getItem("nombre");
        enviarNotificacion(fecha,usuario,mensaje);
        document.getElementById("fecha-input").value = "";
        document.getElementById("mensaje-input").value = "";
      });

    obtenerNotificaciones();
  });

  return (
    <div>
      <Header/>
      <div className="agenda-container">
      <div className="nueva-notificacion-form-container">
      <form id="nueva-notificacion-form">
        <p>Selecciona una fecha:</p>
        <input type="date" id="fecha-input" placeholder="Fecha" required />
        <p>Texto extra:</p>
        <input type="text" id="mensaje-input" placeholder="Asunto" required />
        <button type="submit">Guardar evento</button>
      </form>
      </div>
      <h2>Eventos</h2>
      <ul id="notificaciones" className="notificaciones-table"></ul>
      </div>
      </div>
  );
}

export default Agenda;