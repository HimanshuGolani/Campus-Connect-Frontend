import React from "react";

const YouTubePlaylist = ({ srcUrl }) => {
  const embedUrl = convertToEmbedUrl(srcUrl);

  if (!embedUrl) {
    return <p className="text-red-500">Invalid YouTube URL</p>;
  }

  return (
    <div className="flex justify-center mt-5">
      <iframe
        width="800"
        height="450"
        src={embedUrl}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

// Function to convert standard YouTube URLs to embeddable URLs
const convertToEmbedUrl = (url) => {
  const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};

export default YouTubePlaylist;
