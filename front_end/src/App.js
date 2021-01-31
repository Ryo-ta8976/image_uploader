import React from "react";
import "./App.css";
import Upload from "./component/Upload"
import Result from "./component/Result"
import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <div>
      <header>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact children={<Upload />} />
            <Route path="/result" exact children={<Result />} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
