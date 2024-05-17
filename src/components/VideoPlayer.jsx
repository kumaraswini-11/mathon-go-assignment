import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId, onVideoReady, videoDetails }) => {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    if (playerReady) {
      onVideoReady();
    }
  }, [playerReady, onVideoReady]);

  const opts = {
    height: "420",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <section className="w-full mt-4">
      <div className="rounded-lg overflow-hidden">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={() => setPlayerReady(true)}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-semibold font-times text-lg">
          {videoDetails?.title}
        </h2>
        <p className="text-secondaryText font-normal text-sm">
          {videoDetails?.description}
        </p>
      </div>
      <hr className="mt-3" />
    </section>
  );
};

export default VideoPlayer;
