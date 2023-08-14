import React from "react";
import { useState } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import "./searchForm.css";
export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("top 10");
  return (
    <Container className="searchFormContainer">
      <Form.Control
        autoFocus="true"
        className="searchForm"
        type="search"
        placeholder="search BTS music by genre, mood or album etc."
        value={search}
        onChange={(keyword) => setSearch(keyword.target.value)}
      />
    </Container>
  );
}
