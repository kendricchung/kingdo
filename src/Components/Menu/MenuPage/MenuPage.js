import React, { Component } from "react";
import TopBar from "./TopBar";
import CartBar from "../../Cart/CartBar";
import Menu from "../Menu";
import ScrollToTop from "react-scroll-to-top";
import { Redirect } from "react-router-dom";

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
      foodTransportation: props.location.pathname.substring(1),
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
      this.state.foodTransportation !== "delivery" &&
      this.state.foodTransportation !== "pickup"
    ) {
      return <Redirect to="/404" />;
    }

    return (
      <div>
        <ScrollToTop
          smooth
          style={{
            position: "fixed",
            bottom: "11%",
            left: "46%",
            width: "9%",
            height: "6%",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#83858a",
          }}
          component={<h4 style={{ fontSize: 14 }}>Back to Top</h4>}
        />
        <TopBar />
        <Menu addMenuItemToCart={this.addMenuItemToCart} />
        <CartBar
          foodTransportationMethod={this.state.foodTransportation}
          cartAmount={this.state.cartAmount}
          cartItems={this.state.cartItems}
        />
      </div>
    );
  }
}

export default MenuPage;
