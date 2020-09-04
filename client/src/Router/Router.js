import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import HomePage from "../Components/HomePage";
import MenuPage from "../Components/Menu/MenuPage/MenuPage";
import CartPage from "../Components/Cart/CartPage";
import OrderConfirmationPage from "../Components/Checkout/OrderConfirmationPage";
import Checkout from "../Components/Checkout/Checkout";

const NoMatchPage = () => {
  return (
    <h1>
      Please return to the main page <Link to="/">here</Link>.
    </h1>
  );
};

const Root = () => {
  return (
    <Switch>
      <Route component={MenuPage} exact path="/:type" />
      <Route component={CartPage} exact path="/:type/cart" />
      <Route
        component={OrderConfirmationPage}
        exact
        path="/:type/cart/order/confirmed"
      />
      <Route
        component={Checkout}
        exact
        path="/:type/cart/order/confirmed/checkout"
      />
      <Route component={HomePage} exact path="/" />
      <Route component={NoMatchPage} />
    </Switch>
  );
};

export default Root;
