import "./App.css";
import React, { useEffect, useState } from "react";
import { LogIn, Register } from "./components/LogIn";
import NewPost from "./components/CreateCard";
import Homepage from "./components/Homepage";
import EditCard from "./components/EditCard";
import Card from "./components/Card";

import axios from "axios";
import { useNavigate, Route, Routes, Link, useParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [loginToken, setToken] = useLocalStorageState("SocialCardsToken", "");
  const [follow, setFollow] = useState([]);
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
      });
  }, [loginToken]);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Homepage
              loginToken={loginToken}
              loggedInUser={loggedInUser}
              follow={follow}
            />
          }
        ></Route>
        <Route
          path='/new/card'
          element={<NewPost loginToken={loginToken} />}
        ></Route>
        <Route
          path='/login'
          element={
            <LogIn setToken={setToken} setLoggedInUser={setLoggedInUser} />
          }
        ></Route>
        <Route
          path='/logout'
          element={
            <LogOut setToken={setToken} setLoggedInUser={setLoggedInUser} />
          }
        ></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route
          path='/cards/:username'
          element={
            <User
              follow={follow}
              loginToken={loginToken}
              loggedInUser={loggedInUser}
            />
          }
        ></Route>
        <Route
          path='/cards/:username/followed'
          element={
            <FollowedList
              loginToken={loginToken}
              loggedInUser={loggedInUser}
              follow={follow}
            />
          }
        ></Route>

        <Route
          path='/edit/card/:cardID/'
          element={<EditCard loginToken={loginToken} />}
        ></Route>
        <Route
          path='/following'
          element={
            <Following
              follow={follow}
              loginToken={loginToken}
              loggedInUser={loggedInUser}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

function Following({ loginToken, loggedInUser, follow }) {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    axios
      .get("https://social-cards-wg2j.onrender.com/cards/followed/", {
        headers: {
          authorization: `token ${loginToken}`,
        },
      })
      .then((res) => {
        setCards(res.data);
      });
  }, [loginToken]);

  return (
    cards && (
      <div>
        <h1 className='banner'>You are Following:</h1>
        <button className='links'  >
          <Link to='/'>Home</Link>
        </button>
        <div className='card-zone'>
          {cards.map((card) => (
            <Card
              follow={follow}
              card={card}
              loginToken={loginToken}
              loggedInUser={loggedInUser}
            />
          ))}
        </div>
      </div>
    )
  );
}

function FollowedList({ loginToken, loggedInUser, follow }) {
  const { username } = useParams();
  return (
    <>
      <h1 className='banner'>{username} is following:</h1>
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
        <h1 className="banner">{username}</h1>
        <header className='homepage-nav'>
          <button className='user-tag'>
            <Link to='/' className='links'>
              Home
            </Link>
          </button>
          <button className='user-tag'>
            <Link to='/new/card' className='links'>
              New Post
            </Link>
          </button>
          <button className='user-tag'>
            {!loginToken && (
              <Link to='/login' className='links'>
                Login
              </Link>
            )}
            {loginToken && (
              <Link to='/logout' className='links'>
                Logout
              </Link>
            )}
          </button>
          {/* {loggedInUser && <button>{loggedInUser}</button>} */}
          <button className='user-tag'>
            <Link to={`/cards/${username}/followed`} className='links'>
              {username} is following
            </Link>
          </button>
        </header>
        <div className='card-zone'>
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
