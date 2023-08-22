import React from "react";

export default function BandInfo({ bandData }) {
  console.log(bandData);
  const bandInfo = bandData.bandInfo;
  const bandTopTracks = bandData.bandTopTracks;
  const bandAlbums = bandData.bandAlbums;
  return (
    <div>
      <h1>{bandInfo.name}</h1>
      <h5>{bandInfo.followers.total} followers</h5>
      <img src={bandInfo.images[0].url} alt="band-image" />
      {bandInfo.genres.map((genre, index) => (
        <div key={index}>{genre}</div>
      ))}
    </div>
  );
}
