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
  const BtsSpotifyId = "3Nrfpe0tUJi4K4DXYWgMUX";

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
  const members = [
    {
      name: "RM",
      spotifyId: "2auC28zjQyVTsiZKNgPRGs",
    },
    {
      name: "Jin",
      spotifyId: "5vV3bFXnN6D6N3Nj4xRvaV",
    },
    {
      name: "Suga",
      spotifyId: "5RmQ8k4l3HZ8JoPb4mNsML",
    },
    {
      name: "Jhope",
      spotifyId: "0b1sIQumIAsNbqAoIClSpy",
    },
    {
      name: "Jimin",
      spotifyId: "1oSPZhvZMIrWW5I41kPkkY",
    },
    {
      name: "V",
      spotifyId: "3JsHnjpbhX4SnySpvpa9DK",
    },
    {
      name: "Jungkook",
      spotifyId: "6HaGTQPmzraVmaVxvz6EUc",
    },
  ];

  const getArtist = (spotifyId) => {
    spotifyApi
      .getArtist(spotifyId)
      .then((res) => {
        console.log(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      {members.map((member, index) => (
        <Button key={index} onClick={() => getArtist(member.spotifyId)}>
          {member.name}
        </Button>
      ))}

      <ArtistInfo artistDetails={artistDetails} />
      {jiminImage && <img src={jiminImage}></img>}
    </Container>
  );
}
