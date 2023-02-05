import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import token from "./token.json";
import placeholder from "./no-cover-image.png";
import he from "he";

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

function NewPost() {
  const [canvasImg, setCanvasImg] = useState(placeholder);
  const [bottomHalf, setBottomHalf] = useState('front-image')
  const [selectedBorder, setSelectedBorder] = useState("none")

  return (
    <div className='new-post'>
      <div className='buttons'>
        <FrontImageButton setBottomHalf={setBottomHalf}/>
        <AddTextButton setBottomHalf={setBottomHalf}/>
        <BorderButton setBottomHalf={setBottomHalf}/>
      </div>
      <ImageCanvas 
        canvasImg={canvasImg}
        selectedBorder={selectedBorder} />
      <BottomHalf 
        bottomHalf={bottomHalf}
        setCanvasImg={setCanvasImg}
        selectedBorder={selectedBorder}
        setSelectedBorder={setSelectedBorder}/>
      
    </div>
  );
}

function BottomHalf({bottomHalf, setCanvasImg, selectedBorder, setSelectedBorder}){
  switch (bottomHalf){
    case 'front-image':
      return (<SearchBar setCanvasImg={setCanvasImg} />);
    case 'add-text':
      return (<TextSelect />)
    case 'border-select':
      return (
        <BorderSelect
          selectedBorder={selectedBorder}
          setSelectedBorder={setSelectedBorder}/>)
    default:
      return
  }

}

// TOOLBAR @ TOP STARTS HERE
const FrontImageButton = ({setBottomHalf}) => (<button onClick={() => setBottomHalf('front-image')}>Front</button> )
const AddTextButton = ({setBottomHalf}) => (<button onClick={() => setBottomHalf('text-select')}>Text</button>)
const BorderButton = ({setBottomHalf}) => (<button onClick={() => setBottomHalf('border-select')}>Border</button>)

function ImageCanvas({canvasImg, selectedBorder }) {
  if(selectedBorder === "none"){
    return (
      <div className='canvas'>
        <img className='canvas-img' src={canvasImg} alt='' />
      </div>
    );
  } else {
    console.log(selectedBorder)
    return (
      <div className='canvas'>
        <img style={{border:`5px solid ${selectedBorder}`}} className='canvas-img' src={canvasImg} alt='' />
      </div>
    );
  }
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


function TextSelect(){
  return (
 
    <div>
       <select>
         <option value="fruit">Fruit</option>
         <option value="vegetable">Vegetable</option>
         <option value="meat">Meat</option>
       </select>
     </div>
  )
}

function BorderSelect(props){
  return (
    <div className="border-select">
      <label htmlFor="border-color">Pick a Border Color
        <select 
            value={props.selectedBorder}
            onChange={e => props.setSelectedBorder(e.target.value)}>
          <option value="black">Black</option>
          <option value-="red">Red</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
          <option value="white">White</option>
          <option value="none">None</option>
        </select>
      </label>
    </div>
  )

}

export default App;
