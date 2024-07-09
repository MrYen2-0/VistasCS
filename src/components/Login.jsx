import React, { useState, useEffect } from "react";
import "../css/login.css";
import { Footer } from "./componentes/FooterWB";
import axios from "axios";

const Login = () => {
  const [correo, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const nombre = localStorage.getItem("nombre")
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  useEffect(()=>{
    if(nombre !== null){
      window.location.href = "/inicio"
    }
  })
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://100.29.114.156/usuario/login`,{
          correo: correo,
          contrasena: contrasena,
        }
      );
      if (response.data) {
        localStorage.setItem("nombre",response.data.nombre)
        localStorage.setItem("token",response.data.token)
        window.location.href = "/inicio";
      } else {
        alert("Error de autenticación");
      }
    } catch (error) {
      console.error(error);
      alert("Error al intentar iniciar sesión");
    }
  }
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-titulo">Inicio de sesión</h1>
        <div className="login-input-container">
          <input
            type="text"
            placeholder="Correo electrónico"
            value={correo}
            onChange={handleEmailChange}
          />
        </div>
        <div className="login-input-container">
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-boton"  onClick={handleSubmit}>
          Iniciar sesión
        </button>
        <p className="login-link">
          ¿No tienes una cuenta? <a href="registro">Registrarse</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
