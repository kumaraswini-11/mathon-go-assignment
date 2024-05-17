import axios from "axios";

export const fetchVideoDetails = async (videoId) => {
  try {
    const apiKey = "YOUR_YOUTUBE_API_KEY";
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    );
    if (response.data.items.length === 0) {
      throw new Error("Video not found");
    }
    const snippet = response.data.items[0].snippet;
    return {
      title: snippet.title,
      description: snippet.description,
    };
  } catch (error) {
    throw new Error("Error fetching video details");
  }
};
