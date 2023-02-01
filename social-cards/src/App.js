import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import token from "./token.json";
import he from "he";

console.log(token.token);
function App() {
  return (
    <div className='App'>
      <SearchBar />
    </div>
  );
}
function SearchBar() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Search</button>
      </form>
      <FrontCard token={token.token} query={query} />
    </>
  );
}
function FrontCard({ token, query }) {
  const [img, setImg] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/search/photos?query=${query}`, {
        headers: {
          Authorization: `${token}`,
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
  return (
    img.length > 0 && (
      <div className='homepage'>
        {img.map((i) => (
          <img className='front-card' src={i.imgUrl} alt='work please' />
        ))}
      </div>
    )
  );
}

export default App;
