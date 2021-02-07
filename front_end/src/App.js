import React from "react";
import "./App.css";
import Upload from "./component/Upload"
import { ToastProvider } from 'react-toast-notifications'
import { ChakraProvider } from "@chakra-ui/react"


function App () {
  return (
    <div>
      <header>
        <ToastProvider>
          <ChakraProvider>
            <Upload />
          </ChakraProvider>
        </ToastProvider>
      </header>
    </div>
  );
}

export default App;
