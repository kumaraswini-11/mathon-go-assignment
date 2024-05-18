import React, { useState } from "react";
import ReactQuillTextEditor from "./ReactQuillTextEditor"; // Import the editor
import { formatDate, formatTimestamp } from "../utils/dateAndTimeFormatter";

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
        <p className="font-medium">{formatDate(note.date)}</p>
        <p className="font-normal">
          Timestamp:{" "}
          <span
            className="font-medium text-[#6941C6] hover:opacity-75 cursor-pointer"
            onClick={handleTimeJump}
          >
            {formatTimestamp(note.timestamp)}
          </span>
        </p>
        {isEditing ? (
          <ReactQuillTextEditor newNote={content} setNewNote={setContent} />
        ) : (
          <p className="border rounded-b-md mt-2 p-2 w-full shadow-sm">
            {note.content}
          </p>
        )}
      </div>
      <div className="flex gap-2 mt-2 items-center justify-end">
        {isEditing ? (
          <button
            className="rounded-md border font-medium bg-white text-secondaryText py-0.5 px-1 shadow-sm"
            onClick={handleEdit}
          >
            Save
          </button>
        ) : (
          <>
            <button
              className="text-secondaryText font-medium rounded-md border bg-white py-0.5 px-1 shadow-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit note
            </button>
            <button
              className="rounded-md border font-medium bg-white text-secondaryText py-0.5 px-1 shadow-sm"
              onClick={() => onDelete(note.id)}
            >
              Delete note
            </button>
          </>
        )}
      </div>
      <hr className="my-2" />
    </>
  );
};

export default Note;
