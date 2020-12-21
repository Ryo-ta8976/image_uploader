import React, { useEffect } from "react";
import "./App.css";
import ImageUploadBox from "./component/ImageUploadBox";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("http://localhost:3001/send_image").then((res) => {
      console.log(res.data);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <ImageUploadBox />
      </header>
    </div>
  );
}

export default App;
