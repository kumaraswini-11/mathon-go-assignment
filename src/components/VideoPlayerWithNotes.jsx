import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { parse, format } from "date-fns";

const formatDate = (inputDate) => {
  // Check if inputDate is not a string
  if (typeof inputDate !== "string") {
    return "Invalid date"; // or throw an error
  }

  // Parse the input string into a Date object
  const parsedDate = parse(inputDate, "dd/MM/yyyy, HH:mm:ss", new Date());

  // Format the parsed date to "dd MMM ''yy"
  const formattedDate = format(parsedDate, "dd MMM ''yy");

  return formattedDate;
};

const VideoPlayerWithNotes = () => {
  const [videoId, setVideoId] = useState("M7lc1UVf-VE");
  const [notes, setNotes] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoStartTimestamp, setVideoStartTimestamp] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${videoId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [videoId]);

  const handleVideoReady = () => {
    setVideoReady(true);
  };

  const handleVideoStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING && !videoStartTimestamp) {
      setVideoStartTimestamp(playerRef.current.internalPlayer.getCurrentTime());
    }
  };

  const handleAddNote = () => {
    let initialTimestamp = 0;
    if (videoReady) {
      initialTimestamp = videoStartTimestamp || currentTimestamp;
    }
    const newNote = {
      id: Date.now(),
      timestamp: initialTimestamp,
      date: formatDate(new Date()),
      content: "",
      isEditing: true,
    };
    setNotes([...notes, newNote]);
  };

  useEffect(() => {
    localStorage.setItem(`notes_${videoId}`, JSON.stringify(notes));
  }, [notes, videoId]);

  const seekToTime = (timeInSeconds) => {
    if (playerRef.current) {
      playerRef.current.internalPlayer.seekTo(timeInSeconds, true);
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <main className="max-w-screen text-primaryText font-inter p-6">
      <header>
        <h1 className="font-semibold font-times text-xl">
          Video Player with Notes
        </h1>
      </header>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={handleVideoReady}
            onStateChange={handleVideoStateChange}
            ref={playerRef}
          />
        </div>

        <input
          type="text"
          placeholder="Enter YouTube Video ID"
          className="mt-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          value={videoId}
          onChange={(event) => setVideoId(event.target.value)}
        />

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          onClick={handleAddNote}
        >
          Add Note
        </button>

        <div className="mt-4 w-full max-w-md">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow-md rounded-md p-4 mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{note.date}</p>
                  <p
                    className="text-gray-500 cursor-pointer"
                    onClick={() => seekToTime(note.timestamp)}
                  >
                    {note.timestamp} min
                  </p>
                  {note.isEditing ? (
                    <textarea
                      className="mt-2 w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                      value={note.content}
                      onChange={(e) => {
                        const updatedNotes = [...notes];
                        updatedNotes.find((n) => n.id === note.id).content =
                          e.target.value;
                        setNotes(updatedNotes);
                      }}
                    />
                  ) : (
                    <p className="text-blue-500">{note.content}</p>
                  )}
                </div>
                <div>
                  {note.isEditing ? (
                    <button
                      className="mr-2 bg-green-500 text-white px-3 py-1 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                      onClick={() => handleSaveNote(note.id, note.content)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                      onClick={() => handleEditNote(note.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-red-500 focus:outline-none"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default VideoPlayerWithNotes;
