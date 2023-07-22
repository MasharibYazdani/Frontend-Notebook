// import React from "react";
import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];

  const [notes, setnotes] = useState(initialNotes);

  //Get all notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    setnotes(json);
  };

  //Add a note
  const addNote = async (title, descryption, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, descryption, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API Call

    const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id === id;
    });
    setnotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, descryption, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, descryption, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit client
    let newNotes = JSON.parse(JSON.stringify(notes)); //To update the front end part
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].descryption = descryption;
        newNotes[index].tag = tag;
        break;
      }
    }

    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
