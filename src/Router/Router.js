import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../Components/HomePage";
import MenuPage from "../Components/Menu/MenuPage/MenuPage";
import Generic404Page from "../Components/Generic404Page";

const Router = () => {
  return (
    <Switch>
      <Route component={HomePage} exact path="/" />
      <Route component={MenuPage} exact path="/:type" />
      <Route path="/404" component={Generic404Page} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default Router;
