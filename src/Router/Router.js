import React, { Component } from 'react';
import { Switch, Redirect, Route } from "react-router-dom";
import HomePage from "../Components/HomePage";

const Router = () => {
    return (
        <Switch>
            <Route component={HomePage} exact path="/"/>
        </Switch>
    );
}

export default Router;