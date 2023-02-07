import "./App.css";
import React, { useEffect } from "react";
import LogIn from "./LogIn";
import { useState } from "react";
import NewPost from "./CreateCard";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";

function Homepage({ loginToken }) {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    axios
      .get("https://social-cards-wg2j.onrender.com/cards/")
      .then((res) => setCards(res.data));
  }, []);

  console.log(cards);

  return (
    cards && (
      <>
        <button>
          <Link to="/new/card">New Post</Link>
        </button>
        <button>
          {!loginToken && (
            <Link to="/login">
              Log <br />
              In
            </Link>
          )}
          {loginToken && (
            <Link to="/logout">
              Log <br />
              Out
            </Link>
          )}
        </button>
        {cards.map((card) => (
          <div className="post">
            <p className="user-tag">{card.owner}</p>
            <div className="canvas">
              <img
                style={{
                  border: `5px ${card.border_style} ${card.border_color}`,
                }}
                className="canvas-img"
                src={card.front_image}
                alt=""
              />
              <div
                className={card.text_align}
                style={{ color: `${card.text_color}` }}
              >
                {card.front_message}
              </div>
            </div>
          </div>
        ))}
      </>
    )
  );
}

export default Homepage;
