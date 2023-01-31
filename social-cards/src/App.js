import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import token from "./token.json";

console.log(token.token);
function App() {
  return (
    <div className='App'>
      <FrontCard token={token.token} />
    </div>
  );
}

function FrontCard({ token }) {
  const [img, setImg] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.unsplash.com/search/photos?query=mountains", {
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
  }, [token]);
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
