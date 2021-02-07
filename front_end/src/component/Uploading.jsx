import React from "react";
import { Progress, Box } from "@chakra-ui/react"


function Upload () {
  return(
    <Box
        bg="white"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="lg"
        w="40%"
        mx="auto"
        px="10px"
        mt="50px"
        h="500px"
        boxShadow="lg"
    >
        Uploading...
        <Progress size="md" isIndeterminate/>
    </Box>
  )
}

export default Upload