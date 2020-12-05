import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../NavBar";
import NewNote from "./NewNote";
import NotesList from "./NotesList";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <Container className="w-100" style={{ marginTop: "10vh" }}>
        <Row className="w-100">
          <Col xs={12} lg={{ span: 5, offset: 1 }} className="lg-mx-3">
            <NewNote />
          </Col>
          <Col
            xs={12}
            lg={{ span: 5, offset: 1 }}
            className="lg-mx-3 xs-mt-5 lg-mt-auto"
          >
            <NotesList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
