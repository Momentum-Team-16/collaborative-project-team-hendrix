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
        <header>
          <button>
            <Link to="/new/card">New Post</Link>
          </button>
          <button>
            {!loginToken && <Link to="/login">Login</Link>}
            {loginToken && <Link to="/logout">Logout</Link>}
          </button>
          {loggedInUser && <button>{loggedInUser}</button>}
        </header>
        {cards.map(
          (card) => (
            <Card card={card} loginToken={loginToken} loggedInUser={loggedInUser} />
          )
        )}
      </>
    )
  );
}


export default Homepage;
