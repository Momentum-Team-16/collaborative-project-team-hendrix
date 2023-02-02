import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import token from "./token.json";
import he from "he";

console.log(token.token);
function App() {
  return (
    <div className='App'>
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

function NewPost (){
  const [canvasImg, setCanvasImg] = useState(null);
  return(
    <div className="new-post">
      <div className="buttons">
        <FrontImageButton />
        <AddTextButton />
        <NextButton/>
      </div>
      <ImageCanvas canvasImg={canvasImg}/>
      <SearchBar />
      <FrontCard setCanvasImg={setCanvasImg}/>
      
    </div>
  )
}

function ImageCanvas({canvasImg}){
  // const canvasRef = useRef(null)
  // const canvas = canvasRef.current
  // const ctx = canvas.getContext('2d')

  // ctx.drawImage( <img src={canvasImg} alt="pls work"/>,0,0)


  // return <canvas ref={canvasRef} />
  console.log(canvasImg)
  return (
    <canvas id="canvas"></canvas>
  )
}

function AddTextButton(){

}

function FrontImageButton(){

}

function NextButton(){

}

function SearchBar() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
  };
  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <input
          className='search-bar'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Search</button>
      </form>
      <FrontCard token={token.token} query={query} />
    </div>
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
    console.log("Clicked")
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
      <div className='homepage'>
        {img.map((i) => (
          <img
            onClick={() => handleClick(i)}
            className='front-card'
            src={i.imgUrl}
            alt='work please'
          />
        ))}
      </div>
    )
  );
}

export default App;
