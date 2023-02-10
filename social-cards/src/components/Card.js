import "../App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import EditCard from "./EditCard";

function Card({ loginToken, card, loggedInUser, follow }) {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = (card) => {
    if (!loginToken) {
      navigate("/login");
    }
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
        setLike(!like);
        setIsLiked(!isLiked);
        console.log("liked");
      });
  };

  return (
    <div className='post'>
      <CardHeader
        follow={follow}
        owner={card.owner}
        loggedInUser={loggedInUser}
        loginToken={loginToken}
        navigate={navigate}
      />

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
          style={{ color: `${card.text_color}`, fontFamily: `${card.font}` }}
        >
          {card.front_message}
        </div>
      </div>

      <div className='response-menu'>
        <button
          key={card.id}
          onClick={() => handleClick(card)}
          className='like'
        >
          ❤️ {card.likes_total + like}
        </button>
        <DeleteCard
          owner={card.owner}
          cardId={card.id}
          loginToken={loginToken}
          loggedInUser={loggedInUser}
          navigate={navigate}
        />
        {card.owner === loggedInUser && (
          <button className='user-tag'>
            <Link className='links' to={`/edit/card/${card.id}`}>
              edit
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}

function CardHeader({ owner, loggedInUser, navigate, loginToken, follow }) {
  const handleProfile = (owner) => {
    console.log(owner);
    navigate(`/cards/${owner}/`);
  };

  if (owner === loggedInUser || loggedInUser === null)
    return (
      <button
        key={owner}
        onClick={() => {
          handleProfile(owner);
        }}
        className='user-tag'
      >
        {owner}
      </button>
    );
  return (
    <div>
      <button
        key={owner}
        onClick={() => {
          handleProfile(owner);
        }}
        className='user-tag'
      >
        {owner}
      </button>
      <FollowButton follow={follow} loginToken={loginToken} owner={owner} />
    </div>
  );
}

function DeleteCard({ owner, cardId, loginToken, loggedInUser, navigate }) {
  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: `https://social-cards-wg2j.onrender.com/cards/${cardId}/`,
      headers: {
        authorization: `token ${loginToken}`,
      },
    }).then((res) => {
      navigate("/");
      (window.location.reload())
    });
  };

  if (owner !== loggedInUser || loggedInUser === null) return null;
  return (
    <button className='user-tag' onClick={handleDelete}>
      delete
    </button>
  );
}

function FollowButton({ owner, loginToken, follow }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isFollowingButton, setFollowingButton] = useState("")
  

  const handleUnfollow = (owner, loginToken) => {
    axios
      .delete(`https://social-cards-wg2j.onrender.com/unfollow/${owner}/`, {
        headers: {
          authorization: `token ${loginToken}`,
        },
      })
      .then((res) => console.log("unfollowed"));
  };
  const handleFollow = (owner, loginToken) => {
    if (!loginToken) {
      navigate("/login");
    }
    console.log(owner, loginToken);
    axios
      .post(
        `https://social-cards-wg2j.onrender.com/follower/${owner}/`,
        {},
        {
          headers: {
            authorization: `token ${loginToken}`,
          },
        }
      )
      .then((res) => console.log("followed"));
  };

  return (
    <>
      {follow.includes(owner) ? (
        <button
          className='user-tag'
          onClick={() => handleUnfollow(owner, loginToken)}
        >
          ¿unfollow 🥹?
        </button>
      ) : (
        <button
          className='user-tag'
          onClick={() => handleFollow(owner, loginToken)}
        >
          ¿follow 🤩?
        </button>
      )}
    </>
  );
}

export default Card;
