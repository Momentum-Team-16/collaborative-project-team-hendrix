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
  const [follow, setFollow] = useState(false);
  const [loggedInUser, setLoggedInUser] = useLocalStorageState(
    "cardsLoggedInUser",
    ""
  );

  useEffect(() => {
    axios
      .get(`https://social-cards-wg2j.onrender.com/users/`, {
        headers: {
          authorization: `token ${loginToken}`,
        },
      })
      .then((res) => {
        let followers = [];
        console.log(res.data[0]);
        res.data[0].followed_list.map((followed) => {
          followers.push(followed.followed);
        });
        console.log(followers);
        setFollow(followers);
        // console.log(res.data);
        // console.log("filtering for users");
        // const filterValue = owner;
        // const filteredUsers = user.filter((val) =>
        //   val.areas.includes(filterValue)
        // );
        // console.log(filteredUsers);
      });
  }, [loginToken]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              loginToken={loginToken}
              loggedInUser={loggedInUser}
              follow={follow}
            />
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
          element={<User follow={follow}loginToken={loginToken} loggedInUser={loggedInUser} />}
        ></Route>
        <Route
          path="/cards/:username/followed"
          element={
            <FollowedList
              loginToken={loginToken}
              loggedInUser={loggedInUser}
              follow={follow}
            />
          }
        ></Route>

        <Route
          path="/edit/card/:cardID/"
          element={<EditCard loginToken={loginToken} />}
        ></Route>
      </Routes>
    </div>
  );
}

function FollowedList({ loginToken, loggedInUser, follow }) {
  const { username } = useParams();
  return (
    <>
      <p>{username} is following:</p>
      <ul>
        {follow.map((f) => (
          <li>{f}</li>
        ))}
      </ul>
    </>
  );
}

function User({ loginToken, loggedInUser, follow }) {
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
        <button className="user-tag">
          <Link to={`/cards/${username}/followed`} className="links">following</Link>
        </button>
        <div className="card-zone">
          {cards.map((card) => (
            <Card
              follow={follow}
              card={card}
              loginToken={loginToken}
              loggedInUser={loggedInUser}
            />
          ))}
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
