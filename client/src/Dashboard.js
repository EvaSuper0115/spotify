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

  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [artistDetails, setArtistDetails] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);
  const members = [
    { name: "BTS", spotifyId: "3Nrfpe0tUJi4K4DXYWgMUX" },
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

  useEffect(() => {
    //only set access token if we have one, if we don't have, exit
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setLoaded(true);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return;
    setSearchResult([]);
    if (!accessToken) return;
    const searchTermwithBts = "bts" + " " + search;
    spotifyApi
      .searchTracks(searchTermwithBts)
      .then((res) => {
        console.log(res.body);
        setSearchResult(res.body.items);
      })
      .catch((err) => {
        console.log(err);
        window.location = "/";
      });
  }, [search, accessToken]);
  // Promise.all to make sure they are synchronous

  const getArtist = (spotifyId) => {
    if (!accessToken) return;
    setLoaded(false);
    if (accessToken) {
      Promise.all([
        //get artist's info and status
        spotifyApi.getArtist(spotifyId),
        // get artist top tracks here
        spotifyApi.getArtistTopTracks(spotifyId, "US"),
        //get artist albums here
        spotifyApi.getArtistAlbums(spotifyId),
      ])
        .then(([artistRes, topTracksRes, albumRes]) => {
          setArtistDetails(artistRes.body);
          setArtistTopTracks(topTracksRes.body);
          setArtistAlbums(albumRes.body);
        })
        .catch((err) => {
          console.log(err);
          window.location = "/";
        });
    }
  };
  if (loaded && accessToken) {
    getArtist("3Nrfpe0tUJi4K4DXYWgMUX");
  }

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

      {searchResult.map((result, index) => (
        <div key={index}>
          <img src={result.album.images[2].url} alt="track-image" />
          <p>{result.name}</p>
        </div>
      ))}
      {members.map((member, index) => (
        <Button key={index} onClick={() => getArtist(member.spotifyId)}>
          {member.name}
        </Button>
      ))}
      {artistDetails && (
        <ArtistInfo
          artistData={{
            artistDetails: artistDetails,
            artistTopTracks: artistTopTracks,
            artistAlbums: artistAlbums,
          }}
        />
      )}
    </Container>
  );
}
