import "./App.css";
import React, { useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import NewPost from "./components/CreateCard";
import Homepage from "./components/Homepage";
import EditCard from "./components/EditCard";
import Card from "./components/Card";

import axios from "axios";
import { useNavigate, Route, Routes, Link, useParams } from "react-router-dom";
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
          element={<User loginToken={loginToken} loggedInUser={loggedInUser}/>}
        ></Route>

        <Route
          path="/edit/card"
          element={<EditCard loginToken={loginToken}/>}
        ></Route>

      </Routes>
    </div>
  );
}

function User({ loginToken, loggedInUser }) {
  const { username } = useParams();
  // return <p>hi {username}</p>;

  const [cards, setCards] = useState(null);
  useEffect(() => {
    axios
      .get(`https://social-cards-wg2j.onrender.com/cards/${username}`)
      .then((res) => setCards(res.data));
  }, [username]);

  return (
    cards && (
      <>
        <header className="homepage-nav">
          <button>
            <Link to="/new/card">New Post</Link>
          </button>
          <button>
            {!loginToken && <Link to="/login">Login</Link>}
            {loginToken && <Link to="/logout">Logout</Link>}
          </button>
          {loggedInUser && <button>{loggedInUser}</button>}
        </header>
        <div className="card-zone">
          {cards.map(
            (card) => (
              <Card card={card} loginToken={loginToken} loggedInUser={loggedInUser} />
            )
          )}
        </div>
      </>
    )
  );


}

function LogOut({ setToken, setLoggedInUser }) {
  const navigate = useNavigate();

  setToken(null);
  setLoggedInUser(null);
  navigate("/");
}

export default App;
