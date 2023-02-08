import "../App.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import token from "../token.json";
import he from "he";
import { useNavigate, Link, Route, Routes } from "react-router-dom";

function LogIn({setToken, setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://social-cards-wg2j.onrender.com/auth/token/login", {
        username: `${username}`,
        password: `${password}`,
      })
      .then((res) => {
        setToken(res.data.auth_token);
        setLoggedInUser(username)
        navigate(-1);
      })
      .catch((e) => setError(e));
  };
  return (
    <div className="login">
      {error && <p>{error.message}</p>}
      <form onSubmit={handleSubmit} className="login-field">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
