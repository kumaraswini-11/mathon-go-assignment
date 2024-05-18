import React, { useState, useEffect, useCallback } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Note, ReactQuillTextEditor } from "./";

const Notes = ({ videoId, player }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const loadNotes = useCallback(() => {
    const savedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    setNotes(savedNotes);
  }, [videoId]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const updateLocalStorage = (updatedNotes) => {
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  const handleAddNote = () => {
    const currentTime = player?.getCurrentTime() || 0;
    const newNoteItem = {
      id: Date.now(),
      content: newNote,
      timestamp: currentTime,
      date: new Date().toLocaleString(),
    };
    const updatedNotes = [...notes, newNoteItem];
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const handleEditNote = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  return (
    <section className="mt-6 border p-4 rounded-xl">
      <div className="flex justify-between gap-5 items-center">
        <div className="flex-1 rounded">
          <label className="block text-lg font-semibold">My notes</label>
          <ReactQuillTextEditor newNote={newNote} setNewNote={setNewNote} />
        </div>
        <button
          className="flex items-center gap-2 rounded-md border bg-white p-2 shadow-sm cursor-pointer"
          onClick={handleAddNote}
          disabled={!newNote.trim()}
        >
          <CiCirclePlus className="text-xl text-[#667085]" />
          <span className="text-sm text-[#344054] font-semibold">
            Add new note
          </span>
        </button>
      </div>
      <hr className="mt-4 mb-6" />

      {notes.map((note) => (
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
