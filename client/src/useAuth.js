import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [requestToken, setRequestToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        console.log(res.data);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);
}
