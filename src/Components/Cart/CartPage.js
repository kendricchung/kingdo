import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import ScrollToTop from "react-scroll-to-top";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(sessionStorage.getItem("cartItems")),
    };
  }
  render() {
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
            borderColor: "#83858a",
          }}
          component={<h4 style={{ fontSize: 14 }}>Back to Top</h4>}
        />
        <TopBar />
      </div>
    );
  }
}

export default CartPage;
