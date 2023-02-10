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

  // useEffect(() => {
  //   axios
  //     .get(`https://social-cards-wg2j.onrender.com/users/`, {
  //       headers: {
  //         authorization: `token ${loginToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       let followers = [];
  //       console.log(res.data[0]);
  //       res.data[0].followed_list.map((followed) => {
  //         followers.push(followed.followed);
  //       });
  //       console.log(followers);
  //       setFollow(followers);
  //       // console.log(res.data);
  //       // console.log("filtering for users");
  //       // const filterValue = owner;
  //       // const filteredUsers = user.filter((val) =>
  //       //   val.areas.includes(filterValue)
  //       // );
  //       // console.log(filteredUsers);
  //     });
  // }, [loginToken]);

  // follow && follow.map((f) => console.log(f.followed_list));

  return (
    cards && (
      <>
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
          {loggedInUser && (
            <a className="user-tag"> ¡Welcome! {loggedInUser}</a>
          )}
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
