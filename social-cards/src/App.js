import "./App.css";
import React, { useEffect } from "react";
import LogIn from "./components/LogIn";
import { useState } from "react";
import NewPost from "./components/CreateCard";
import Homepage from "./components/Homepage";
import axios from "axios";
import { useNavigate, Link, Route, Routes, useParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [loginToken, setToken] = useLocalStorageState("SocialCardsToken", "");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage loginToken={loginToken} />}></Route>
        <Route
          path="/new/card"
          element={<NewPost loginToken={loginToken} />}
        ></Route>
        <Route path="/login" element={<LogIn setToken={setToken} />}></Route>
        <Route path="/logout" element={<LogOut setToken={setToken} />}></Route>
        <Route
          path="/cards/:username"
          element={<User loginToken={loginToken} />}
        ></Route>
      </Routes>
    </div>
  );
}

function User({ loginToken }) {
  const { username } = useParams();
  return <p>hi {username}</p>;
}

function LogOut({ setToken }) {
  const navigate = useNavigate();
  setToken(null);
  navigate("/");
}

export default App;
