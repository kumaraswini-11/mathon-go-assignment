import React, { useState, useEffect } from "react";
import { Notes, VideoPlayer } from "./components";
import { fetchVideoDetails } from "./utils/fetchVideoDetails";

const App = () => {
  const [videoId, setVideoId] = useState("M7lc1UVf-VE");
  const [player, setPlayer] = useState(null);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchVideoDetails(videoId);
        setVideoDetails(details);
      } catch (error) {
        console.error("Error fetching video details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [videoId]);

  const handlePlayerReady = (event) => {
    // "player" state variable - Save a reference to the player when it's ready
    // When we say "save a reference to the player," we mean storing a pointer or a handle that allows us to access and manipulate the player instance later in our code.
    setPlayer(event.target);

    // Get the initial playback time when the player is ready
    // player.getCurrentTime().then((time) => console.log(event.timeStamp));
    // console.log(event.timeStamp);
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
        onReady={handlePlayerReady}
        loading={loading}
        videoDetails={videoDetails}
      />

      {player && <Notes videoId={videoId} player={player} />}
    </main>
  );
};

export default App;
