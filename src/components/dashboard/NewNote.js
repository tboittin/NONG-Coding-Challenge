import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import firebase from "../../firebase";

export default function NewNote() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const ref = firebase.firestore().collection("notes");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      ref.add({
        title: title,
        name: name,
        date: date,
        description: description,
      });
      initializeState();
      // set a Toast to alert of submission
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const initializeState = () => {
    setDate("");
    setName("");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="new-note">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">New Note</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </Form.Group>
            <Form.Group id="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={date}
                onChange={handleDateChange}
                required
              />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                as="textarea"
                rows={5}
                required
              />
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
