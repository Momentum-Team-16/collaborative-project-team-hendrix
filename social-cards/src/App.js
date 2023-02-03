import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import token from "./token.json";
import he from "he";

console.log(token.token);
function App() {
  const [loginToken, setToken] = useState(null);

  if (loginToken === null) {
    return <LogIn setToken={setToken} />;
  }
  return (
    <div className="App">
      <NewPost loginToken={loginToken} />
    </div>
  );
}

// function Canvas({ canvasImg }) {
//   drawImage(canvasImg);
//   return (
//     <>
//       <canvas className='canvas'></canvas>
//     </>
//   );
// }

function NewPost({ loginToken }) {
  const [canvasImg, setCanvasImg] = useState(null);
  return (
    <div className="new-post">
      <div className="buttons">
        <SaveButton loginToken={loginToken} canvasImg={canvasImg} />
        <FrontImageButton />
        <AddTextButton />
        <NextButton />
      </div>
      <ImageCanvas canvasImg={canvasImg} />
      <SearchBar setCanvasImg={setCanvasImg} />
    </div>
  );
}

function ImageCanvas({ canvasImg }) {
  // const canvasRef = useRef(null)
  // const canvas = canvasRef.current
  // const ctx = canvas.getContext('2d')

  // ctx.drawImage( <img src={canvasImg} alt="pls work"/>,0,0)

  return (
    <div className="canvas">
      <img className="canvas-img" src={canvasImg} alt="" />
    </div>
  );
  // return <canvas ref={canvasRef} />
  // console.log(canvasImg)
  // return (
  //   <canvas id="canvas"></canvas>)
}

function LogIn({ setToken }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://social-cards-wg2j.onrender.com/auth/token/login", {
        username: `${username}`,
        password: `${password}`,
      })
      .then((res) => {
        setToken(res.data.auth_token);
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-field">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

// TOOLBAR @ TOP STARTS HERE
function AddTextButton() {}

function FrontImageButton() {}

function NextButton() {}

function SaveButton({ loginToken, canvasImg }) {
  const handleClick = (e) => {
    console.log(canvasImg);
    axios.post(
      "https://social-cards-wg2j.onrender.com/cards/me/",
      {
        title: "test",
        front_image: `${canvasImg}`,
      },
      {
        headers: {
          authorization: `token ${loginToken}`,
        },
      }
    );
  };
  return <button onClick={handleClick}>Save</button>;
}

function SearchBar({ setCanvasImg }) {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div className="wrapper">
        <FrontCard
          token={token.token}
          query={query}
          setCanvasImg={setCanvasImg}
        />
      </div>
    </>
  );
}

function FrontCard({ token, query, setCanvasImg }) {
  const [img, setImg] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/search/photos?query=${query}`, {
        headers: {
          Authorization: `${token}`,
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setImg(
          res.data.results.map((obj) => ({
            imgUrl: obj.urls.thumb,
          }))
        );
      });
  }, [token, query]);

  const handleClick = (i) => {
    setCanvasImg(i.imgUrl);
  };

  // if (canvasImg != null) {
  //   return (
  //     <>
  //       <Canvas canvasImg={canvasImg} />
  //       <SearchBar />
  //       <div className='homepage'>
  //         {img.map((i) => (
  //           <img
  //             onClick={() => handleClick(i)}
  //             className='front-card'
  //             src={i.imgUrl}
  //             alt='work please'
  //           />
  //         ))}
  //       </div>
  //     </>
  //   );
  // }

  return (
    img.length > 0 && (
      <div className="return-box">
        <ul key={query} className="search-returns">
          {img.map((i) => (
            <div className="search-wrapper">
              <img
                key={i.imgUrl}
                className="search-element"
                onClick={() => handleClick(i)}
                src={i.imgUrl}
                alt="work please"
              />
            </div>
          ))}
        </ul>
      </div>
    )
  );
}

export default App;
