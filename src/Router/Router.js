import React, { Component } from 'react';
import { Switch, Redirect, Route } from "react-router-dom";
import HomePage from "../Components/HomePage";
import PickUp from "../Components/PickUp/PickUp";
import Delivery from "../Components/Delivery/Delivery";

const Router = () => {
    return (
        <Switch>
            <Route component={HomePage} exact path="/"/>
            <Route component={PickUp} exact path="/pickup"/>
            <Route component={Delivery} exact path="/delivery"/>
        </Switch>
    );
}

export default Router;