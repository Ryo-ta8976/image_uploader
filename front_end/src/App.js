import React, { useState } from "react";
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

  function handleSubmit(e) {
    const params = new FormData();
    if (!imageFormData) return;
    params.append("image", imageFormData);

    axios.post(`/upload_image`, params, {headers: {'Content-Type': 'multipart/form-data' }}).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    return e.preventDefault();
  }

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
