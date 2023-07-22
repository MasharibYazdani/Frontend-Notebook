import React, { useContext } from "react";
import notesContext from "../context/notes/notesContext";

const NoteItem = (props) => {
  const context = useContext(notesContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.descryption}</p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="fa-sharp fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
