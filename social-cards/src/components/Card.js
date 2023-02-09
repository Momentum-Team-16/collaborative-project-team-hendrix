import "../App.css";
import React, { useEffect } from "react";
import LogIn from "./LogIn";
import { useState } from "react";
import NewPost from "./CreateCard";
import axios from "axios";
import { useNavigate, Link, Route, Routes } from "react-router-dom";

function Card({ loginToken, card }) {
  const navigate = useNavigate();
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleProfile = (card) => {
    navigate(`/cards/${card.owner}`);
  };

  const handleClick = (card) => {
    console.log(card);
    console.log(card.id);
    axios
      .get(`https://social-cards-wg2j.onrender.com/like/${card.id}`, {
        headers: {
          authorization: `token ${loginToken}`,
        },
      })
      // need to come back to this and make sure likes show on render
      .then((res) => {
        setLike(1);
        setIsLiked(!isLiked);
        console.log("liked");
      });
  };

  return (
    <div className="post">
      <button
        key={card.owner}
        onClick={() => handleProfile}
        className="user-tag"
      >
        {card.owner}
      </button>
      <button key={card.id} onClick={() => handleClick(card)} className="like">
        💔 {card.likes_total + like}
      </button>
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
  );
}

export default Card;
