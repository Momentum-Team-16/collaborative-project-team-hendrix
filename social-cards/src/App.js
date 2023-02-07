import "./App.css";
import CreateCard from "./CreateCard";
import React, { useEffect } from "react";
import LogIn from "./LogIn";
import { useState } from "react";
import NewPost from "./CreateCard";
import axios from "axios";

function App() {
  const [loginToken, setToken] = useState(null);
  const [newPost, setNewPost] = useState(false);

  if (newPost === true) {
    if (loginToken === null) {
      return <LogIn setToken={setToken} />;
    }
    return <NewPost setNewPost={setNewPost} loginToken={loginToken} />;
  }

  return (
    <div className='App'>
      <button onClick={() => setNewPost(true)}>New Post</button>
      <Homepage loginToken={loginToken} />
    </div>
  );
  //
}

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
        {cards.map((card) => (
          <div className='canvas'>
            <img
              style={{
                border: `5px ${card.border_style} ${card.border_color}`,
              }}
              className='canvas-img'
              src={card.front_image}
              alt=''
            />
            <div
              className={card.text_align}
              style={{ color: `${card.text_color}` }}
            >
              {card.front_message}
            </div>
          </div>
        ))}
      </>
    )
  );
}

export default App;
