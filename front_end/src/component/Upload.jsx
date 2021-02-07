import React, { useState } from "react";
import ImageUploadBox from "./ImageUploadBox";
import { Box } from "@chakra-ui/react"
import Result from "./Result";
import Uploading from "./Uploading";


function Upload () {
  const [status, setStatus] = useState(false);
  const [result, setResult] = useState(false);
  const [url, setUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  if(result){
    return <Result uploadedImage={uploadedImage} url={url} setResult={setResult} />
  }else{
    return (
      <Box w="100%" h="80%">
        {status && <Uploading />}
        {!status &&
          <div>
            <ImageUploadBox
              setUrl={setUrl}
              setResult={setResult}
              setStatus={setStatus}
              setUploadedImage={setUploadedImage}
            />
          </div>
        }
      </Box>
    );
  }
}

export default Upload