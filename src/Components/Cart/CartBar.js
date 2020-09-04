import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, Redirect } from "react-router-dom";
import cartBarBackground from "../kingdo_background.png";
import { isMobile } from "react-device-detect";

class CartBar extends Component {
  state = {
    mouseOverViewCart: false,
  };

  handleMouseEnterViewCart = () => {
    this.setState({ mouseOverViewCart: true });
  };

  handleMouseLeavingViewCart = () => {
    this.setState({ mouseOverViewCart: false });
  };

  render() {
    const nextPath = sessionStorage
      .getItem("foodTransportMethod")
      .includes("delivery")
      ? "/delivery/cart"
      : "/pickup/cart";

    return (
      <div
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, -0.5), rgba(0, 0, 0, -0.5) ), url(${cartBarBackground})`,
          textAlign: "center",
          position: "fixed",
          left: "0",
          bottom: "0",
          height: isMobile ? 50 : 70,
          width: "100%",
          boxShadow: "0px -1px 3px rgba(50, 50, 50, 0.50)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "1%",
              width: "15%",
            }}
          >
            <ShoppingCartIcon fontSize="large" />
            <h2 style={{ paddingLeft: "10%" }}>
              {this.props.cartItems.length}
            </h2>
          </div>
          <Link
            onMouseEnter={this.handleMouseEnterViewCart}
            onMouseLeave={this.handleMouseLeavingViewCart}
            to={nextPath}
            style={{
              width: "15%",
              textDecoration: "none",
              color: this.state.mouseOverViewCart ? "grey" : "black",
              flexWrap: "wrap",
            }}
          >
            <h2>View Cart</h2>
          </Link>
          <h2
            style={{
              width: "15%",
            }}
          >
            ${this.props.cartAmount}
          </h2>
        </div>
      </div>
    );
  }
}

export default CartBar;
