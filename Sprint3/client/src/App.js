/** @format */

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Upload from "./components/Upload/Upload";

function App() {
  const defaultPrevent = (event) => {
    event.preventDefault();
  };

  return (
    <BrowserRouter>
      <Header defaultPrevent={defaultPrevent} />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/upload" component={Upload} />
        <Route path="/videos/:id" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
