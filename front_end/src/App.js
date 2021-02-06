import React from "react";
import "./App.css";
import Upload from "./component/Upload"
import { ToastProvider } from 'react-toast-notifications'


function App () {
  return (
    <div>
      <header>
        <ToastProvider>
          <Upload />
        </ToastProvider>
      </header>
    </div>
  );
}

export default App;
