import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CiCirclePlus } from "react-icons/ci";
import Note from "./Note";

const Notes = ({ videoId, player }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    setNotes(savedNotes);
  }, [videoId]);

  const handleAddNote = () => {
    const currentTime = player.getCurrentTime();
    const newNoteItem = {
      id: Date.now(),
      content: newNote,
      timestamp: currentTime,
      date: new Date().toLocaleString(),
    };
    const newNotes = [...notes, newNoteItem];
    setNotes(newNotes);
    localStorage.setItem(videoId, JSON.stringify(newNotes));
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  const handleEditNote = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  return (
    <section className="mt-6 border p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <label className="block text-lg font-semibold">My notes</label>
          <ReactQuill
            value={newNote}
            onChange={setNewNote}
            placeholder="All your notes at a single place. Click on any note to go to a specific timestamp in the video."
          />
        </div>
        <button
          className="flex items-center gap-2 rounded-md border bg-white p-2 shadow-sm"
          onClick={handleAddNote}
        >
          <CiCirclePlus className="text-xl text-[#667085]" />
          <span className="text-sm text-[#344054] font-semibold">
            Add new note
          </span>
        </button>
      </div>
      <hr className="mt-4 mb-6" />

      {notes?.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
          player={player}
        />
      ))}
    </section>
  );
};

export default Notes;
