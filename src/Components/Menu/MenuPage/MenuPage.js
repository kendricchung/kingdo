import React, { Component } from "react";
import TopBar from "./TopBar";
import CartBar from "../../Cart/CartBar";
import Menu from "../Menu";
import { Link } from "react-router-dom";
import Center from "react-center";
import { Helmet } from "react-helmet";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    const items = JSON.parse(sessionStorage.getItem("cartItems"))
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [];
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price;
    }
    this.state = {
      foodTransportation: sessionStorage
        .getItem("foodTransportMethod")
        .includes("delivery")
        ? "delivery"
        : "pickup",
      cartItems: items,
      cartAmount: (Math.round(totalPrice * 100) / 100).toFixed(2),
    };
  }

  addMenuItemToCart = (cartItem) => {
    let currentCartItems = this.state.cartItems;
    let currentCartAmount = parseFloat(
      (Math.round(parseFloat(this.state.cartAmount, 10) * 100) / 100).toFixed(2)
    );
    currentCartItems.push(cartItem);
    currentCartAmount += cartItem.price;
    sessionStorage.setItem("cartItems", JSON.stringify(currentCartItems));
    this.setState({
      cartItems: currentCartItems,
      cartAmount: (Math.round(currentCartAmount * 100) / 100).toFixed(2),
    });
  };

  render() {
    if (
      !this.state.foodTransportation.includes("delivery") &&
      !this.state.foodTransportation.includes("pickup")
    ) {
      return (
        <Center>
          <h1>
            Please return to the main page <Link to="/">here</Link>.
          </h1>
        </Center>
      );
    }

    return (
      <div>
        <Helmet>
          <title>King Do Restaurant | Menu</title>
        </Helmet>
        <TopBar />
        <Menu addMenuItemToCart={this.addMenuItemToCart} />
        <CartBar
          cartAmount={this.state.cartAmount}
          cartItems={this.state.cartItems}
        />
      </div>
    );
  }
}

export default MenuPage;
