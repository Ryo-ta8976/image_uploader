import React from "react";
import { Button, Box, Input, Image, Text } from "@chakra-ui/react"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useToasts } from 'react-toast-notifications'
import { CheckCircleIcon } from '@chakra-ui/icons'


function Upload (props) {
    const { addToast } = useToasts();

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
            textAlign="center"
            py="20px"
        >
            <CheckCircleIcon w={8} h={8} color="green.500" />
            <Text textAlign="center" my="10px">Uploaded Successfully!</Text>
            <Image mx="auto" borderRadius="lg" w="sm" src={props.uploadedImage} alt='description' />
            <Box my="20px">
                <Input w="70%" size="sm" my="10px" defaultValue={props.url}></Input>
                <CopyToClipboard text={props.url}
                    onCopy={() => addToast('クリップボードにコピーしました', {
                    appearance: 'success',
                    autoDismiss: true,
                    })}>
                    <Button size="sm" bg="skyblue">copy</Button>
                </CopyToClipboard>
                <Button onClick={() => props.setResult(false)}>アップロードに戻る</Button>
            </Box>
        </Box>
    )
}

export default Upload