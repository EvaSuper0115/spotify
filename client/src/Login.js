import React from "react";

export default function Login() {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=625a81e04da040f08e7974a7487b85b2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
  return (
    <div
      className="Login
    "
    ></div>
  );
}
