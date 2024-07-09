import React, { useState, useEffect } from "react";
import Header from "./componentes/HeaderWB";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ".././components/componentes/css/ws-css.css"

function WebHoooks() {
  const [url, setUrl] = useState("");
  const [secWord, setSecWord] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("nombre");
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

  async function pushWebHook(){
    try{
      const response = await axios.post('http://100.29.114.156/agenda/webhooks', { url, secretWord:secWord })
      if(response.data){
        alert(response)
      }else if(response.status === 400 || response.status === 500){
        alert(response.statusText)
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <div className="my-webhook-div" >
      <input
        placeholder="url del hook"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <p/>
      <input
        placeholder="secret word"
        onChange={(e) => setSecWord(e.target.value)}
        value={secWord}
      />
      <p></p>
      <button onClick={pushWebHook}>publicar webhook</button>
      </div>
    </div>
  );
}

export default WebHoooks;
