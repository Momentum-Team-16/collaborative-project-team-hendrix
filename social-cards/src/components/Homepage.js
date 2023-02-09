import "../App.css";
import Card from "./Card";
import React, { useEffect } from "react";
//import LogIn from "./LogIn";
import { useState } from "react";
//import NewPost from "./CreateCard";
import axios from "axios";
import { useNavigate, Link, Route, Routes } from "react-router-dom";

function Homepage({ loginToken, loggedInUser }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState(null);
  useEffect(() => {
    axios
      .get("https://social-cards-wg2j.onrender.com/cards/")
      .then((res) => setCards(res.data));
  }, []);

  return (
    cards && (
      <>
        <header className="homepage-nav">
          <button>
            <Link className="user-tag" to="/new/card">New Post</Link>
          </button>
          <button className="user-tag">
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


export default Homepage;
