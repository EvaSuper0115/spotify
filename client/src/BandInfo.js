import React from "react";

export default function BandInfo({ bandInfo }) {
  console.log(bandInfo);

  return (
    <div>
      <h1>{bandInfo.name}</h1>
      <img src={bandInfo.images[0].url} />
      {bandInfo.genres.map((genre, index) => (
        <div key={index}>{genre}</div>
      ))}
      <h4>{bandInfo.followers.total} followers</h4>
    </div>
  );
}
