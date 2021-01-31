import React, { useState } from "react";
import ImageUploadBox from "./ImageUploadBox";
import axios from "axios";
import { Progress } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { withRouter } from 'react-router';

function Upload(props) {
  const [imageFormData, setImageFormData] = useState();
  const [status, setStatus] = useState(false);

  const handleSetImage = (e) => {
    if (!e.target.files) return;
    const image = e.target.files[0];
    setImageFormData(image);
  };

  function handleSubmit (e) {
    setStatus(true);
    const params = new FormData();
    if (!imageFormData) return;
    params.append("image", imageFormData);

    axios.post(`/upload_image`, params, {headers: {'Content-Type': 'multipart/form-data' }}).then((res) => {
      console.log(res.data);
      props.history.push('/result')
    });
    return e.preventDefault();
  }

  return (
    <div>
      {status && <Progress size="md" isIndeterminate/> }
      {!status &&
        <div>
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
        </div>}
    </div>
  );
}

export default withRouter(Upload)