import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId, onVideoReady, loading, videoDetails }) => {
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
          {loading ? (
            <span className="bg-gray-300 animate-pulse rounded h-4 w-3/4 block"></span>
          ) : (
            videoDetails?.title
          )}
        </h2>
        <p className="text-secondaryText font-normal text-sm">
          {loading ? (
            <span className="bg-gray-300 animate-pulse h-3 rounded w-full block mt-1"></span>
          ) : (
            videoDetails?.description
          )}
        </p>
      </div>
      <hr className="mt-3" />
    </section>
  );
};

export default VideoPlayer;
