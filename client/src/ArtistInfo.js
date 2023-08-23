import React from "react";
import "./artistInfo.css";
export default function ArtistInfo({ artistData }) {
  const artistDetails = artistData.artistDetails;
  const artistTopTracks = artistData.artistTopTracks.tracks;
  const artistAlbums = artistData.artistAlbums;
  console.log(artistDetails);
  console.log(artistTopTracks);
  console.log(artistAlbums);
  const backgroundImageStyle = {
    backgroundImage: `url(${artistDetails.images[0].url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "50vh",
    minWidth: "50vh",
  };
  return (
    <div>
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
      <div className="artistTracksSection">
        <h2>Top 5 songs</h2>
        {artistTopTracks.slice(0, 5).map((track, index) => (
          <div key={index}>
            <img src={track.album.images[2].url} alt="Track Album" />
            {track.name} release : {track.album.release_date}
            <span>{track.uri}</span>
          </div>
        ))}
      </div>
      <div className="artistAlbumsSection">
        <h2>Albums</h2>
      </div>
    </div>
  );
}
