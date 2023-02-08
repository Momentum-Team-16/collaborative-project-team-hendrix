import "./App.css";
import React, { useEffect } from "react";
//import LogIn from "./LogIn";
import { useState } from "react";
//import NewPost from "./CreateCard";
import axios from "axios";
import { Link } from "react-router-dom"; //Route, Routes

function Homepage({ loginToken, loggedInUser }) {
  
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
            {!loginToken && (
              <Link to="/login">
                Login
              </Link>
            )}
            {loginToken && (
                <Link to="/logout">
                  Logout
                </Link>
            )}
          </button>
          {loggedInUser && (
            <button>{loggedInUser}</button>
          )}
          
        </header>
        
        {cards.map((card) => (
          <div className="post">
            {/* <p className="user-tag">{card.owner}</p> */}
            <CardOwner owner={card.owner} loggedInUser={loggedInUser}/>
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

function CardOwner ({owner, loggedInUser}){
  if(owner === loggedInUser || loggedInUser === null)
    return (<div className="user-tag">{owner}</div>)
  return (
      <div className="user-tag">{owner} <button>Follow?</button></div>
    ) 
  
}

export default Homepage;
