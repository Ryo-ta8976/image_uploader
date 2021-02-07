import React, {useCallback} from 'react';
import { Box, Image, Text } from "@chakra-ui/core";
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

  return (
    <Box
      bg="white"
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
      w="40%"
      mx="auto"
      mt="50px"
      h="500px"
      boxShadow="lg"
    >
      <Box mt="20px">
        <Text fontSize="2xl" textAlign="center">
          {property.title}
        </Text>
        <Text  color="gray.500" textAlign="center" fontSize="md">
          {property.sentence}
        </Text>
      </Box>

      <Box h="80%" w="100%" className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <Box w="80%"　bg="blue.50" border="2px" borderColor="blue.200" borderRadius="lg"　borderStyle="dotted" mt="40px" mx="auto" paddingTop="20px" paddingBottom="20px">
            <Image bg="blue" mx="auto" src={image} alt="description"/>
            <Box mt="10px">
              <Text textAlign="center">Drag & Drop your image</Text>
              <Text textAlign="center">or Click here</Text>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
}