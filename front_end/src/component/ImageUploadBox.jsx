import React, {useCallback} from 'react';
import { Box } from "@chakra-ui/core";
import { useDropzone } from "react-dropzone";
import image from "../assets/image/image.svg";
import axios from "axios";
import { useToasts } from 'react-toast-notifications'

export default function ImageUploadBox(props) {
  const { addToast } = useToasts();
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Upload your image",
    sentence: "File should be Jpeg, Png,...",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,

  };
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
        const params = new FormData();
        if (!file) return;
        params.append("image", file);

        axios.post(`/upload_image`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res) => {
            let reader = new FileReader();
            reader.onloadend = () => {
              props.setUploadedImage(reader.result);
            }
            reader.readAsDataURL(file);
            props.setUrl(res.data);
            props.setResult(true);
            props.setStatus(false);
        })
        .catch(() => addToast('画像のアップロードに失敗しました', {
          appearance: 'error',
          autoDismiss: true,
        }));
        return;
    })
  }, [addToast, props]);

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
  const files = acceptedFiles.map(file => (
    <li>{file.path}</li>
  ));

  return (
    <Box
      bg="white"
      borderWidth="1px"
      overflow="hidden"
      color="black"
      rounded="5px"
      height="600px"
      width="500px">
      <Box p="4">
        <Box>
          {property.title}
        </Box>
        {property.sentence}
      </Box>

      <div className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <div>
            <img src={image} alt="description"/>
            <p>Drag & Drop your image here</p>
          </div>
          {/* <input>Button</input> */}
        </div>
      </div>
    </Box>
  );
}