import React, { useState } from "react";
import { Alert, Button, Col, Container, Navbar, Row } from "react-bootstrap";

import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import "./NavBar.css";

export default function NavBar() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Navbar fixed="top" bg="light" className="custom-navbar">
        <Container>
          <Row className="w-100">
            <Col xs={5}>
              <Navbar.Brand href="#home" className="custom-navbrand">
                NONG Coding Challenge
              </Navbar.Brand>
            </Col>
            <Col xs={{ span: 3, offset: 4 }} className="logout-col">
              <Button className="navBarButton" onClick={handleLogout}>
                Log out
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}
