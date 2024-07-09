import React, { useState } from "react";
import "../css/registro.css";
import axios from "axios";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const datosRegistro = {
      nombre,
      correo,
      contrasena,
    };

    axios.post("http://100.29.114.156/usuario/crear", datosRegistro)
      .then((respuesta) => {
        console.log(respuesta.data);
        alert("Registro realizado exitosamente");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .catch((error) => {
        alert(error);
        alert("Ha ocurrido un error al registrar el usuario");
      });
  };
  return (
    <div className="almacen">
      <div className="formulario-registro">
        <h1 className="formulario-registro-titulo">Registro</h1>
        <div className="formulario-registro-input">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        <div className="formulario-registro-input">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            required
          />
        </div>
        <div className="formulario-registro-input">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="formulario-registro-boton"
          type="submit"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
