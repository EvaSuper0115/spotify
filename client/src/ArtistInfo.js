import React from "react";
import "./artistInfo.css";
export default function ArtistInfo({ artistDetails }) {
  const backgroundImageStyle = {
    backgroundImage: `url(${artistDetails.images[0].url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "50vh",
    minWidth: "50vh",
  };
  return (
    <div className="artistInfoSection" style={backgroundImageStyle}>
      <h1>{artistDetails.name}</h1>
      <div className="artistStatus">
        {" "}
        {artistDetails.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
        <li>Followers: {artistDetails.followers.total}</li>
      </div>
    </div>
  );
}
