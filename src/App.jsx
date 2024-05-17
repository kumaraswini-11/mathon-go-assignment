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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const details = await fetchVideoDetails(videoId);
        setVideoDetails(details);
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [videoId]);

  const handleVideoReady = (event) => {
    setPlayer(event?.target);
  };

  return (
    <main className="max-w-screen text-primaryText font-inter p-6">
      <header>
        <h1 className="font-semibold font-times text-xl">
          Video Player with Notes
        </h1>
      </header>

      <VideoPlayer
        videoId={videoId}
        onVideoReady={handleVideoReady}
        loading={loading}
        videoDetails={videoDetails}
      />

      {player && <Notes videoId={videoId} player={player} />}
    </main>
  );
};

export default App;
