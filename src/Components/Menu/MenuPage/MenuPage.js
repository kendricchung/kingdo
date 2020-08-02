import React, { Component } from "react";
import TopBar from "./TopBar";
import CarBar from "../../Cart/CartBar";
import Menu from "../Menu";
import ScrollToTop from "react-scroll-to-top";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    const items = JSON.parse(sessionStorage.getItem("cartItems"));
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price;
    }

    this.state = {
      foodTransportation: props.location.pathname.substring(1),
      cartItems: sessionStorage.getItem("cartItems")
        ? JSON.parse(sessionStorage.getItem("cartItems"))
        : [],
      cartAmount: (Math.round(totalPrice * 100) / 100).toFixed(2),
    };
  }

  addMenuItemToCart = (cartItem) => {
    let currentCarItems = this.state.cartItems;
    let currentCartAmount = parseFloat(
      (Math.round(parseFloat(this.state.cartAmount, 10) * 100) / 100).toFixed(2)
    );
    currentCarItems.push(cartItem);
    currentCartAmount += cartItem.price;
    sessionStorage.setItem("cartItems", JSON.stringify(currentCarItems));
    this.setState({
      cartItems: currentCarItems,
      cartAmount: (Math.round(currentCartAmount * 100) / 100).toFixed(2),
    });
  };

  render() {
    // TODO: if it is anything else, rediect to 404 page
    return (
      <div style={{ backgroundColor: "#FFCCCB" }}>
        <ScrollToTop
          smooth
          style={{
            position: "fixed",
            bottom: "11%",
            left: "47.5%",
            width: "10%",
            height: "6%",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#83858a",
          }}
          component={<h4 style={{ fontSize: 14 }}>Back to Top</h4>}
        />
        <TopBar />
        <Menu addMenuItemToCart={this.addMenuItemToCart} />
        <CarBar
          foodTransportationMethod={this.state.foodTransportation}
          cartAmount={this.state.cartAmount}
          cartItems={this.state.cartItems}
        />
      </div>
    );
  }
}

export default MenuPage;
