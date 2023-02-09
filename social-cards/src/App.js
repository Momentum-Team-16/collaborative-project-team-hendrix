import "./App.css";
import React, { useEffect } from "react";
import LogIn from "./components/LogIn";
//import { useState } from "react";
import NewPost from "./components/CreateCard";
import Homepage from "./components/Homepage";
//import axios from "axios";
import { useNavigate, Route, Routes, useParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [loginToken, setToken] = useLocalStorageState("SocialCardsToken", "");
  const [loggedInUser, setLoggedInUser] = useLocalStorageState(
    "cardsLoggedInUser",
    ""
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Homepage loginToken={loginToken} loggedInUser={loggedInUser} />
          }
        ></Route>
        <Route
          path="/new/card"
          element={<NewPost loginToken={loginToken} />}
        ></Route>
        <Route
          path="/login"
          element={
            <LogIn setToken={setToken} setLoggedInUser={setLoggedInUser} />
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <LogOut setToken={setToken} setLoggedInUser={setLoggedInUser} />
          }
        ></Route>
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

function LogOut({ setToken, setLoggedInUser }) {
  const navigate = useNavigate();

  setToken(null);
  setLoggedInUser(null);
  navigate("/");
}

export default App;
