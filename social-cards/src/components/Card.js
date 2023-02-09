import "../App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import EditCard from "./EditCard"


function Card({ loginToken, card, loggedInUser }) {
  const navigate = useNavigate();
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // const handleProfile = (owner) => {
  //   navigate(`/cards/${owner}/`);
  // };


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


  // const handleEdit = (card.id) => {
  //   navigate()

  // };


  return (
    <div className="post">

      <CardHeader 
        owner={card.owner} 
        loggedInUser={loggedInUser} 
        navigate={navigate}/>
        
{/* BUTTON THAT TAKES YOU TO PROFILE
      <button
        key={card.owner}
        onClick={() => handleProfile(card.owner)}
        className="user-tag"
      >
        {card.owner}
      </button> */}
      
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
      
      <div className="response-menu">
        <button key={card.id} onClick={() => handleClick(card)} className="like">❤️ {card.likes_total + like}</button>
        <DeleteCard 
          owner={card.owner} 
          cardId={card.id} 
          loginToken={loginToken} 
          loggedInUser={loggedInUser} 
          navigate={navigate}/>
        <button>
            <Link to="/edit/card">Edit</Link>
          </button>
        {/* <EditCard card={card} loginToken={loginToken}/>  */}
      </div>
    </div>
  );
}

function CardHeader({ owner, loggedInUser, navigate }) {
  

  const handleProfile = (owner) => {
    console.log(owner)
    navigate(`/cards/${owner}/`);
  };

  if (owner === loggedInUser || loggedInUser === null)
    return (
      <button
        key={owner}
        onClick={()=>{handleProfile(owner)}}
        className="user-tag">
        {owner}
      </button>)
  return (
    <div>
      <button key={owner} onClick={()=>{handleProfile(owner)}} className="user-tag">{owner}</button>
      <button>Follow?</button>
    </div>
  );
}

function DeleteCard ({owner, cardId, loginToken, loggedInUser, navigate }){
  const handleDelete = () => {
    axios({
      method: 'DELETE',
      url: `https://social-cards-wg2j.onrender.com/cards/${cardId}/`,       
      headers: {
          authorization: `token ${loginToken}`,
      },
    }).then((res) => {
        navigate("/");
      });
  };

  if (owner !== loggedInUser || loggedInUser === null)
    return null;
  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )

}


export default Card;
