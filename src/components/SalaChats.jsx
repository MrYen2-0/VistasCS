import React from "react";
import { Button, Container } from "react-bootstrap";
import Header from "./componentes/HeaderWB";

function SalaChats() {
  const redireccion1 = () => {
    window.location.href = "/chat1";
  };
  const redireccion2 = () => {
    window.location.href = "/chat2";
  };
  const redireccion3 = () => {
    window.location.href = "/chat3";
  };

  return (
    <div>
      <Header />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1>Selecciona un chat</h1>
          <div>
            <Button
              variant="primary"
              size="lg"
              onClick={redireccion1}
              className="mt-4"
            >
              Chat Global
            </Button>
          </div>
          <div>
            <Button
              variant="primary"
              size="lg"
              onClick={redireccion2}
              className="mt-4"
            >
              Chat A
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SalaChats;
