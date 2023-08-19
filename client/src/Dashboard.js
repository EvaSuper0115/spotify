import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Button, Container, Form } from "react-bootstrap";
import "./searchForm.css";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistInfo from "./ArtistInfo";
import ArtistTracks from "./ArtistTracks";
const spotifyApi = new SpotifyWebApi({
  clientId: "625a81e04da040f08e7974a7487b85b2",
});
export default function Dashboard({ code }) {
  //https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX
  const BtsSpotifyId = "3Nrfpe0tUJi4K4DXYWgMUX";

  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [artistDetails, setArtistDetails] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState(null);
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

  useEffect(() => {
    console.log(artistDetails);
  }, [artistDetails, accessToken]);
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
      name: "j-hope",
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
      name: "Jung Kook",
      spotifyId: "6HaGTQPmzraVmaVxvz6EUc",
    },
  ];

  const getArtist = (spotifyId) => {
    //get artist's info and status
    spotifyApi
      .getArtist(spotifyId)
      .then((res) => {
        setArtistDetails(res.body);
        // get artist top tracks here
        spotifyApi.getArtistTopTracks(spotifyId, "US").then((topTracksRes) => {
          console.log(topTracksRes.body);
          setArtistTopTracks(topTracksRes.body);
          //get artist albums here
          spotifyApi.getArtistAlbums(spotifyId).then((artistAlbumsRes) => {
            console.log(artistAlbumsRes.body);
          });
        });
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
      {artistDetails && <ArtistInfo artistDetails={artistDetails} />}
      {artistTopTracks && <ArtistTracks artistTopTracks={artistTopTracks} />}
    </Container>
  );
}
