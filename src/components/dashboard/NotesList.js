import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("notes");

  const getNotes = () => {
    setLoading(true);
    ref.onSnapshot((snapshot) => {
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
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div>
          <h1>Previous Notes</h1>
          {notes.map((note) => (
            <div key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
