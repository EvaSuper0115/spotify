import React from "react";

export default function ArtistTracks({ artistTopTracks }) {
  console.log(artistTopTracks);

  return (
    <div>
      <h2>his top 5 songs</h2>
      {artistTopTracks.slice(0, 5).map((track, index) => (
        <div key={index}>
          <img src={track.album.images[2].url} alt="Track Album" />
          {track.name} release : {track.album.release_date}
          <span>{track.uri}</span>
        </div>
      ))}
    </div>
  );
}
