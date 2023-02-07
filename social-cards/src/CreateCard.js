import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import token from "./token.json";
import placeholder from "./no-cover-image.png";
import he from "he";

// function Canvas({ canvasImg }) {
//   drawImage(canvasImg);
//   return (
//     <>
//       <canvas className='canvas'></canvas>
//     </>
//   );
// }

function NewPost({ loginToken, setNewPost }) {
  const [canvasImg, setCanvasImg] = useState(placeholder);
  const [frontText, setFrontText] = useState(null);
  const [frontTextColor, setFrontTextColor] = useState("black");
  const [textAlign, setTextAlign] = useState("center");

  const [bottomHalf, setBottomHalf] = useState("front-image");
  const [borderColor, setBorderColor] = useState("black");
  const [borderStyle, setBorderStyle] = useState("none");
  return (
    <div className='new-post'>
      <div className='navbar'>
        <SaveButton
          loginToken={loginToken}
          canvasImg={canvasImg}
          frontText={frontText}
          frontTextColor={frontTextColor}
          textAlign={textAlign}
          borderColor={borderColor}
          borderStyle={borderStyle}
          setNewPost={setNewPost}
        />
        <FrontImageButton setBottomHalf={setBottomHalf} />
        <BorderButton setBottomHalf={setBottomHalf} />
        <AddTextButton setBottomHalf={setBottomHalf} />
      </div>
      <ImageCanvas
        canvasImg={canvasImg}
        borderColor={borderColor}
        borderStyle={borderStyle}
        frontText={frontText}
        frontTextColor={frontTextColor}
        textAlign={textAlign}
      />
      <BottomHalf
        bottomHalf={bottomHalf}
        setCanvasImg={setCanvasImg}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        borderStyle={borderStyle}
        setBorderStyle={setBorderStyle}
        setFrontText={setFrontText}
        frontTextColor={frontTextColor}
        setFrontTextColor={setFrontTextColor}
        textAlign={textAlign}
        setTextAlign={setTextAlign}
      />
    </div>
  );
}

// NAVBAR BUTTONS
const FrontImageButton = ({ setBottomHalf }) => (
  <button onClick={() => setBottomHalf("front-image")}>Front</button>
);
const AddTextButton = ({ setBottomHalf }) => (
  <button onClick={() => setBottomHalf("add-text")}>Text</button>
);
const BorderButton = ({ setBottomHalf }) => (
  <button onClick={() => setBottomHalf("border-select")}>Border</button>
);

function SaveButton({
  loginToken,
  canvasImg,
  frontText,
  frontTextColor,
  textAlign,
  borderColor,
  borderStyle,
  setNewPost,
}) {
  const handleClick = (e) => {
    console.log(canvasImg);
    console.log(frontText, frontTextColor, borderColor);
    axios.post(
      "https://social-cards-wg2j.onrender.com/cards/me/",
      {
        title: "test",
        front_image: `${canvasImg}`,
        front_message: `${frontText}`,
        text_color: `${frontTextColor}`,
        border_color: `${borderColor}`,
        text_align: `${textAlign}`,
        border_style: `${borderStyle}`,
      },
      {
        headers: {
          authorization: `token ${loginToken}`,
        },
      }
    );
    setNewPost(false);
  };
  return <button onClick={handleClick}>Save</button>;
}

//RENDERS THE BOTTOM HALF OF THE NEW POST PAGE
function BottomHalf(props) {
  switch (props.bottomHalf) {
    case "front-image":
      return <SearchBar setCanvasImg={props.setCanvasImg} />;
    case "add-text":
      return (
        <TextInput
          setFrontText={props.setFrontText}
          frontTextColor={props.frontTextColor}
          setFrontTextColor={props.setFrontTextColor}
          setTextAlign={props.setTextAlign}
        />
      );
    case "border-select":
      return (
        <BorderSelect
          borderColor={props.borderColor}
          setBorderColor={props.setBorderColor}
          borderStyle={props.borderStyle}
          setBorderStyle={props.setBorderStyle}
        />
      );
    default:
      return;
  }
}

//NEW POST IMAGE
function ImageCanvas(props) {
  if (props.borderStyle === "none") {
    return (
      <div className='canvas'>
        <img className='canvas-img' src={props.canvasImg} alt='' />
        <div
          className={props.textAlign}
          style={{ color: `${props.frontTextColor}` }}
        >
          {props.frontText}
        </div>
      </div>
    );
  } else {
    return (
      <div className='canvas'>
        <img
          style={{ border: `5px ${props.borderStyle} ${props.borderColor}` }}
          className='canvas-img'
          src={props.canvasImg}
          alt=''
        />
        <div
          className={props.textAlign}
          style={{ color: `${props.frontTextColor}` }}
        >
          {props.frontText}
        </div>
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
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='search-bar'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div className='wrapper'>
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
      <div className='return-box'>
        <ul key={query} className='search-returns'>
          {img.map((i) => (
            <div className='search-wrapper'>
              <img
                key={i.imgUrl}
                className='search-element'
                onClick={() => handleClick(i)}
                src={i.imgUrl}
                alt='search result'
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
function TextInput(props) {
  const [textInputField, setTextInputField] = useState("Input text here!");
  const [displayAlign, setDisplayAlign] = useState("");

  const handleText = (e) => {
    e.preventDefault();
    setTextInputField(e.target.value);
    props.setFrontText(e.target.value);
  };

  const handleAlignment = (e) => {
    setDisplayAlign(e.target.value);
    props.setTextAlign(e.target.value);
  };
  return (
    <div className='text-customizer'>
      <div className='front-input'>
        <input onChange={handleText} value={textInputField} />
      </div>
      <label htmlFor='text-color'>
        <select
          value={props.frontTextColor}
          onChange={(e) => props.setFrontTextColor(e.target.value)}
        >
          <option value='black'>Black</option>
          <option value-='red'>Red</option>
          <option value='green'>Green</option>
          <option value='purple'>Purple</option>
          <option value='blue'>Blue</option>
          <option value='yellow'>Yellow</option>
          <option value='orange'>Orange</option>
          <option value='pink'>Pink</option>
          <option value='white'>White</option>
        </select>
      </label>

      <label htmlFor='text-alignment'>
        <select value={displayAlign} onChange={handleAlignment}>
          <option value='center'>Center</option>
          <option value='top'>Top</option>
          <option value='bottom'>Bottom</option>
        </select>
      </label>
    </div>
  );
}

//Customize Border Color and Style
function BorderSelect(props) {
  return (
    <div className='border-select'>
      <>
        <label htmlFor='border-style'>
          Pick a Border Style
          <select
            value={props.borderStyle}
            onChange={(e) => props.setBorderStyle(e.target.value)}
          >
            <option value='none'>None</option>
            <option value='solid'>Solid</option>
            <option value-='dotted'>Dotted</option>
            <option value='double'>Double</option>
          </select>
        </label>

        <label htmlFor='border-color'>
          Pick a Border Color
          <select
            value={props.borderColor}
            onChange={(e) => props.setBorderColor(e.target.value)}
          >
            <option value='black'>Black</option>
            <option value-='red'>Red</option>
            <option value='green'>Green</option>
            <option value='purple'>Purple</option>
            <option value='blue'>Blue</option>
            <option value='yellow'>Yellow</option>
            <option value='orange'>Orange</option>
            <option value='pink'>Pink</option>
            <option value='white'>White</option>
          </select>
        </label>
      </>
    </div>
  );
}

export default NewPost;
