import React from "react";

export default function ArtistTracks({ artistTopTracks }) {
  console.log(artistTopTracks);

  return (
    <div>
      {artistTopTracks.map((track, index) => (
        <div key={index}>
          {track.name}

          <span>{track.uri}</span>
        </div>
      ))}
    </div>
  );
}
