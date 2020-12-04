import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import firebase from "../../firebase";

import "./NotesList.css";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (note) => {
    setModal({
      title: note.title,
      name: note.name,
      date: note.date,
      description: note.description,
    });
    setShow(true);
  };

  const ref = firebase.firestore().collection("notes");

  const getNotes = () => {
    setLoading(true);
    ref.orderBy("date", "desc").onSnapshot((snapshot) => {
      const notes = [];
      snapshot.forEach((doc) => {
        notes.push(doc.data());
      });
      setNotes(notes);
      setLoading(false);
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <h1 className="mb-3">Previous Notes</h1>
      {loading && <h2 className="pl-2">Loading...</h2>}
      {!loading &&
        notes.map((note) => (
          <>
            <Card
              key={note.id}
              onClick={() => handleShow(note)}
              className="py-2 px-4 m-2 noteCard"
            >
              <Card.Title>{note.title}</Card.Title>
              <Card.Subtitle className="mb-2 pl-2 text-muted">
                By {note.name} - {note.date}
              </Card.Subtitle>
            </Card>
          </>
        ))}
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>
            By {modal.name} - {modal.date}
          </h2>
          <p>{modal.description}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}
