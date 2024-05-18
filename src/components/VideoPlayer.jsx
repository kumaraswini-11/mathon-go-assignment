import React from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId, onReady, loading, videoDetails }) => {
  const opts = {
    height: "420",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return loading ? (
    <div className="flex flex-col gap-2 mt-4">
      <div className="bg-gray-300 animate-pulse h-[420px] rounded w-full"></div>
      <div className="bg-gray-300 animate-pulse rounded h-4 w-3/4"></div>
      <div className="bg-gray-300 animate-pulse h-4 rounded w-full"></div>
    </div>
  ) : (
    <section className="w-full mt-4">
      <div className="rounded-lg overflow-hidden">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={(event) => onReady(event)}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-semibold font-times text-lg">
          {videoDetails?.title}
        </h2>
        <p className="text-secondaryText font-normal text-sm mt-1">
          {videoDetails?.description}
        </p>
      </div>
      <hr className="mt-3" />
    </section>
  );
};

export default VideoPlayer;
