import React from "react";
import "./artistInfo.css";
export default function ArtistInfo({ artistDetails }) {
  return <div className="artistInfoSection">{artistDetails.name}</div>;
}
