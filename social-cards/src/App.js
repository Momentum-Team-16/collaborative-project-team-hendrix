import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import token from "./token.json";
import placeholder from "./no-cover-image.png";
import he from "he";

function App() {
  return (
    <div className="App">
      <NewPost />
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

function NewPost() {
  const [canvasImg, setCanvasImg] = useState(placeholder);
  const [bottomHalf, setBottomHalf] = useState("front-image");
  const [borderColor, setBorderColor] = useState("black");
  const [borderStyle, setBorderStyle] = useState("none");

  return (
    <div className="new-post">
      <div className="navbar">
        <FrontImageButton setBottomHalf={setBottomHalf} />
        <AddTextButton setBottomHalf={setBottomHalf} />
        <BorderButton setBottomHalf={setBottomHalf} />
      </div>
      <ImageCanvas
        canvasImg={canvasImg}
        borderColor={borderColor}
        borderStyle={borderStyle}
      />
      <BottomHalf
        bottomHalf={bottomHalf}
        setCanvasImg={setCanvasImg}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        borderStyle={borderStyle}
        setBorderStyle={setBorderStyle}
      />
    </div>
  );
}

//RENDERS THE BOTTOM HALF OF THE NEW POST PAGE
function BottomHalf(props) {
  switch (props.bottomHalf) {
    case "front-image":
      return <SearchBar setCanvasImg={props.setCanvasImg} />;
    case "add-text":
      return <TextSelect />;
    case "border-select":
      return (
        <BorderSelect
          borderColor={props.borderColor}
          setBorderColor={props.setBorderColor}
          borderStyle={props.propsborderStyle}
          setBorderStyle={props.setBorderStyle}
        />
      );
    default:
      return;
  }
}

// NAVBAR BUTTONS
const FrontImageButton = ({ setBottomHalf }) => (
  <button onClick={() => setBottomHalf("front-image")}>Front</button>
);
const AddTextButton = ({ setBottomHalf }) => (
  <button onClick={() => setBottomHalf("text-select")}>Text</button>
);
const BorderButton = ({ setBottomHalf }) => (
  <button onClick={() => setBottomHalf("border-select")}>Border</button>
);

//NEW POST IMAGE
function ImageCanvas(props) {
  if (props.borderStyle === "none") {
    return (
      <div className="canvas">
        <img className="canvas-img" src={props.canvasImg} alt="" />
      </div>
    );
  } else {
    console.log(props.borderColor);
    return (
      <div className="canvas">
        <img
          style={{ border: `5px ${props.borderStyle} ${props.borderColor}` }}
          className="canvas-img"
          src={props.canvasImg}
          alt=""
        />
      </div>
    );
  }
}

//NEW POST IMAGE SEARCH
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

//RENDERING NEW POST SEARCH RESULTS
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
            imgUrl: obj.urls.small,
          }))
        );
      });
  }, [token, query]);

  const handleClick = (i) => {
    setCanvasImg(i.imgUrl);
  };

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
                alt="search result"
              />
            </div>
          ))}
        </ul>
      </div>
    )
  );

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
}

//New post Text Font selection and Input?
function TextSelect() {
  return (
    <div>
      <select>
        <option value="fruit">Fruit</option>
        <option value="vegetable">Vegetable</option>
        <option value="meat">Meat</option>
      </select>
    </div>
  );
}

//Customize Border Color and Style
function BorderSelect(props) {
  return (
    <div className="border-select">
      <>
        <label htmlFor="border-style">
          Pick a Border Style
          <select
            value={props.borderStyle}
            onChange={(e) => props.setBorderStyle(e.target.value)}
          >
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value-="dotted">Dotted</option>
            <option value="Double">Double</option>
          </select>
        </label>
        
        <label htmlFor="border-color">
          Pick a Border Color
          <select
            value={props.borderColor}
            onChange={(e) => props.setBorderColor(e.target.value)}
          >
            <option value="black">Black</option>
            <option value-="red">Red</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
            <option value="white">White</option>
          </select>
        </label>
      </>
    </div>
  );
}

export default App;
