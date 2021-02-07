import React, { useState } from "react";
import ImageUploadBox from "./ImageUploadBox";
import axios from "axios";
import { Progress } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Textarea } from "@chakra-ui/react"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useToasts } from 'react-toast-notifications'

function Upload () {
  const [imageFormData, setImageFormData] = useState();
  const [status, setStatus] = useState(false);
  const [result, setResult] = useState(false);
  const [url, setUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { addToast } = useToasts();

  const handleSetImage = (e) => {
    if (!e.target.files) return;
    const image = e.target.files[0];
    setImageFormData(image);
  };

  function handleSubmit(e) {
    setStatus(true);
    const params = new FormData();
    if (!imageFormData) return;
    params.append("image", imageFormData);

    axios.post(`/upload_image`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result);
        }
        reader.readAsDataURL(imageFormData);
        setUrl(res.data);
        setResult(true);
        setStatus(false);
    });
    return e.preventDefault();
  }

  if(result){
    return (
    <div>
      <img src={uploadedImage} alt='description' />
      <Textarea defaultValue={url}></Textarea>
      <CopyToClipboard text={url}
          onCopy={() => addToast('クリップボードにコピーしました', {
            appearance: 'success',
            autoDismiss: true,
          })}>
          <Button>Copy to clipboard with button</Button>
      </CopyToClipboard>
      <Button onClick={() => setResult(false)}>アップロードに戻る</Button>
    </div>
    )
  }else{
    return (
      <div>
        {status && <Progress size="md" isIndeterminate/> }
        {!status &&
          <div>
            <ImageUploadBox
              setUrl={setUrl}
              setResult={setResult}
              setStatus={setStatus}
              setUploadedImage={setUploadedImage}
            />
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
          </div>
        }
      </div>
    );
  }
}

export default Upload