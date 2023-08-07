const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();

app.post("./login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:8888/callback",
    clientId: "625a81e04da040f08e7974a7487b85b2",
    clientSecret: "05a358ab6bb248728320395a90275d64",
  });
  spotifyApi.authorizationCodeGrant(code).then((data) => {
    res
      .json({
        accessToken: data.body.access_token,
        requestToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
      .catch(() => {
        res.sendStatus(400);
      });
  });
});
