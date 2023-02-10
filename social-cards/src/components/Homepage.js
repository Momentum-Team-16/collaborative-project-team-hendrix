import "../App.css";
import Card from "./Card";
import React, { useEffect } from "react";
//import LogIn from "./LogIn";
import { useState } from "react";
//import NewPost from "./CreateCard";
import axios from "axios";
import { useNavigate, Link, Route, Routes } from "react-router-dom";

function Homepage({ loginToken, loggedInUser, follow }) {
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
      {loginToken && <h2 className="banner">¡Welcome! {loggedInUser}</h2>}
        <header className="homepage-nav">
          <button className="user-tag">
            <Link className="links" to="/new/card">
              New Post
            </Link>
          </button>
          <button className="user-tag">
            {!loginToken && (
              <Link className="links" to="/login">
                Login
              </Link>
            )}
            {loginToken && (
              <Link className="links" to="/logout">
                Logout
              </Link>
            )}
          </button>
          {/* {loggedInUser && (
            <button className="user-tag"> ¡Welcome! {loggedInUser}</button>
          )} */}
          {loginToken &&( <button className="user-tag">
            <Link className="links" to="/following">following</Link>
          </button>)}
        </header>
        <div className="card-zone">
          {cards.map((card) => (
            <Card
              card={card}
              loginToken={loginToken}
              loggedInUser={loggedInUser}
              follow={follow}
            />
          ))}
        </div>
      </>
    )
  );
}

export default Homepage;
