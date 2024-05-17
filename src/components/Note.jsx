// src/components/Note.js
import React, { useState } from "react";

const Note = ({ note, onDelete, onEdit, player }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);

  const handleEdit = () => {
    setIsEditing(false);
    onEdit(note.id, content);
  };

  const handleTimeJump = () => {
    player.seekTo(note.timestamp);
  };

  return (
    <>
      <div className="flex flex-col text-sm text-[#344054] items-start justify-center">
        <p className="font-medium">{note.date}</p>
        <p className="font-normal">
          Timestamp:{" "}
          <span className="font-medium text-[#6941C6]" onClick={handleTimeJump}>
            [{new Date(note.timestamp * 1000).toISOString().substr(11, 8)}]
          </span>
        </p>
        <p className="border rounded-b-md mt-2 p-2 w-full shadow-sm">
          {note.content}
        </p>
      </div>
      <div className="flex gap-2 mt-2 items-center justify-end">
        <button
          className="rounded-md border font-medium bg-white text-secondaryText py-0.5 px-1 shadow-sm"
          onClick={() => onDelete(note.id)}
        >
          Delete note
        </button>
        <button
          className=" text-secondaryText font-medium rounded-md border bg-white py-0.5 px-1 shadow-sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit note
        </button>
      </div>
      <hr className="my-2" />
    </>
  );
};

export default Note;
