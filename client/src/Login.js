import React from "react";
import { Container } from "react-bootstrap";
import "./Login.css";
export default function Login() {
  const client_id = "625a81e04da040f08e7974a7487b85b2";
  const redirect_uri = "http://localhost:3000/";
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
  return (
    <Container className="buttonContainer">
      <a
        className="loginButton btn-large
    "
        href={AUTH_URL}
      >
        Login with Spotify
      </a>
    </Container>
  );
}
