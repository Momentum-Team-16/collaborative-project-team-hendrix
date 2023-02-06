import "./App.css";
import CreateCard from "./CreateCard";
import React from "react";
import LogIn from "./LogIn";
import { useState } from "react";
import NewPost from "./CreateCard";

function App() {
  const [loginToken, setToken] = useState(null);
  if (loginToken === null) {
    return <LogIn setToken={setToken} />;
  }
  return <NewPost loginToken={loginToken} />;
}

export default App;
