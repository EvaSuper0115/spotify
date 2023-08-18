import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Button, Container, Form } from "react-bootstrap";
import "./searchForm.css";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistInfo from "./ArtistInfo";
const spotifyApi = new SpotifyWebApi({
  clientId: "625a81e04da040f08e7974a7487b85b2",
});
export default function Dashboard({ code }) {
  //https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX
  //Spotify ID of BTS is 3Nrfpe0tUJi4K4DXYWgMUX
  const BtsSpotifyId = "3Nrfpe0tUJi4K4DXYWgMUX";
  //Spotify ID Jin is 5vV3bFXnN6D6N3Nj4xRvaV
  //Spotify ID RM is 2auC28zjQyVTsiZKNgPRGs
  //Spotify ID JHope is 0b1sIQumIAsNbqAoIClSpy
  //Spotify ID Suga/Agust D is 5RmQ8k4l3HZ8JoPb4mNsML
  const JiminSpotifyId = "1oSPZhvZMIrWW5I41kPkkY";
  //Spotify ID Jimin is 1oSPZhvZMIrWW5I41kPkkY
  //Spotify ID V is 3JsHnjpbhX4SnySpvpa9DK
  //Spotify ID Jungkook is 6HaGTQPmzraVmaVxvz6EUc

  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [jiminImage, setJiminImage] = useState(null);
  const [artistDetails, setArtistDetails] = useState(BtsSpotifyId);
  useEffect(() => {
    //only set access token if we have one, if we don't have, exit
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return;
    setSearchResult([]);
    if (!accessToken) return;
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        console.log(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, accessToken]);
  const members = ["RM", "Jin", "Suga", "jhope", "Jimin", "V", "Jungkook"];

  return (
    <Container className="searchFormContainer">
      <Form.Control
        autoFocus={true}
        className="searchForm"
        type="search"
        placeholder="search BTS music by genre, mood or album etc."
        value={search}
        onChange={(keyword) => setSearch(keyword.target.value)}
      />
      {members.map((name, index) => (
        <Button key={index}>{name}</Button>
      ))}

      <ArtistInfo artistDetails={artistDetails} />
      {jiminImage && <img src={jiminImage}></img>}
    </Container>
  );
}
