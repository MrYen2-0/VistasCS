import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./componentes/HeaderWB";
import { useEffect, useState } from "react";
import Publicaciones from "./componentes/PublicacionesWB";
import { jwtDecode } from 'jwt-decode';

const Inicio = () => {
  const nombre = localStorage.getItem("nombre");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      window.location.href = "/";
    }
  });


function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000;
    return expirationDate < new Date().getTime();
  } catch {
    return true;
  }
}

  return (
    <div>
      <Header />
      <Publicaciones/>
    </div>
  );
};

export default Inicio;
