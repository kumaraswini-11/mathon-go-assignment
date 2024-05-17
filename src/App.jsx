import React, { useState, useEffect } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Notes from "./components/Notes";
import { fetchVideoDetails } from "./utils/fetchVideoDetails";

const App = () => {
  const [videoId, setVideoId] = useState("M7lc1UVf-VE");
  const [player, setPlayer] = useState(null);
  const [videoDetails, setVideoDetails] = useState({
    title: "Video title goes here",
    description: "This is the description of the video",
  });

  useEffect(() => {
    fetchVideoDetails(videoId)
      .then((details) => {
        setVideoDetails(details);
      })
      .catch((error) => {
        console.error("Error fetching video details:", error);
      });
  }, [videoId]);

  const handleVideoReady = (event) => {
    setPlayer(event.target);
  };

  return (
    <main className="max-w-screen text-primaryText font-inter p-6">
      <header>
        <h1 className="font-semibold font-times text-xl">
          Video Player with Notes
        </h1>
      </header>

      {/* Youtube video, title, descption */}
      <VideoPlayer
        videoId={videoId}
        onVideoReady={handleVideoReady}
        videoDetails={videoDetails}
      />

      {/* Comment section richtext editor, ad, edit, delete option*/}
      {player && <Notes videoId={videoId} player={player} />}
    </main>
  );
};

export default App;
