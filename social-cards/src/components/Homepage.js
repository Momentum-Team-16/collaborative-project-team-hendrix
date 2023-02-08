import "../App.css";
import Card from "./Card";
import React, { useEffect } from "react";
import LogIn from "./LogIn";
import { useState } from "react";
import NewPost from "./CreateCard";
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

  console.log(cards);

  const [like, setLiked] = useState([]);

  const handleProfile = (card) => {
    navigate(`/cards/${card.owner}`);
  };

  const handleClick = (card) => {
    console.log(card.id);
    axios
      .get(`https://social-cards-wg2j.onrender.com/like/${card.id}`, {
        headers: {
          authorization: `token ${loginToken}`,
        },
      })
      // need to come back to this and make sure likes show on render
      .then((res) => console.log("liked"));
  };
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
            (<CardOwner owner={card.owner} loggedInUser={loggedInUser} />),
            (<Card card={card} loginToken={loginToken} />)
          )
        )}
      </>
    )
  );
}
function CardOwner({ owner, loggedInUser }) {
  if (owner === loggedInUser || loggedInUser === null)
    return <div className="user-tag">{owner}</div>;
  return (
    <div className="user-tag">
      {owner} <button>Follow?</button>
    </div>
  );
}

export default Homepage;
