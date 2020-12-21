import React from 'react';
import { Box, Button } from "@chakra-ui/core";
import { useDropzone } from "react-dropzone";
import image from "../assets/image/image.svg";

export default function ImageUploadBox() {
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

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
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
        <ul>
          {files}
        </ul>
      </div>
    </Box>
  );
}