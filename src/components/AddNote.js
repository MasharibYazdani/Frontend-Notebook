import React, { useContext, useState } from "react";
import notesContext from "../context/notes/notesContext";

function AddNote(props) {
  const context = useContext(notesContext);
  const { addNote } = context;

  const [note, setnote] = useState({
    title: "",
    descryption: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.descryption, note.tag);
    setnote({
      title: "",
      descryption: "",
      tag: "",
    });
    props.showAlert("Note Added Successfully", "success");
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descryption" className="form-label">
            Descryption
          </label>
          <input
            type="text"
            className="form-control"
            id="descryption"
            name="descryption"
            value={note.descryption}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.descryption.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
