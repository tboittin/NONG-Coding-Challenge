import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";

export default function NewNote() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const ref = firebase.firestore().collection("notes");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      //   TODO Submit note to the database
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="new-note">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">New Note</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" required />
            </Form.Group>
            <Form.Group id="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" as="textarea" rows={5} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Submit Note
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
