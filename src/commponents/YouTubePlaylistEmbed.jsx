import React from "react";

const YouTubePlaylist = ({srcUrl}) => {
    return (
      <div className="flex justify-center mt-5">
        <iframe
          width="800"
          height="450"
          src={srcUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Playlist"
        ></iframe>
      </div>
    );
  };
  
  export default YouTubePlaylist;
  