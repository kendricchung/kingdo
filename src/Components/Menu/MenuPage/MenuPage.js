import React, { Component } from "react";
import TopBar from "./TopBar";
import CarBar from "../../Cart/CartBar";
import Menu from "../Menu";
import ScrollToTop from "react-scroll-to-top";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodTransportation: props.location.pathname.substring(1),
      cartItems: [],
      cartAmount: "0",
    };
  }

  addMenuItemToCart = (cartItem) => {
    let currentCarItems = this.state.cartItems;
    let currentCartAmount = parseInt(this.state.cartAmount, 10);
    currentCarItems.push(cartItem);
    currentCartAmount += cartItem.price;
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
            width: "6%",
            height: "6%",
            borderStyle: "solid",
            borderWidth: 1,
          }}
          component={<h4 style={{ fontSize: 14 }}>Back to Top</h4>}
        />
        <TopBar />
        <Menu addMenuItemToCart={this.addMenuItemToCart} />
        <CarBar
          cartAmount={this.state.cartAmount}
          cartItems={this.state.cartItems}
        />
      </div>
    );
  }
}

export default MenuPage;
