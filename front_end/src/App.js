import React, { useEffect, useState } from "react";
import "./App.css";
import ImageUploadBox from "./component/ImageUploadBox";
import axios from "axios";

function App() {
  const [imageFormData, setImageFormData] = useState();

  const handleSetImage = (e) => {
    if (!e.target.files) return;
    const image = e.target.files[0];
    setImageFormData(image);
  };

  function handleSubmit() {
    const params = new FormData();
    if (!imageFormData) return;
    console.log(imageFormData);
    params.append("image", imageFormData);

    axios.post(`http://localhost:3001/send_image`, params).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  // useEffect(() => {
  //   axios.get("http://localhost:3001/send_image").then((res) => {
  //     console.log(res.data);
  //   });
  // });

  return (
    <div className="App">
      <header className="App-header">
        <ImageUploadBox />
        <form onSubmit={handleSubmit}>
          <label>
            Upload file:
            <input
              type="file"
              name="file"
              accept=".png,.jpg"
              onChange={(e) => handleSetImage(e)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
