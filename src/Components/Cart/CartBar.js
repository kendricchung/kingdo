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

    if (isMobile) {
      return (
        <div
          style={{
            backgroundColor: "#161c20",
            textAlign: "center",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: 50,
            width: "100%",
            boxShadow: "0px -1px 3px rgba(50, 50, 50, 0.50)",
            color: "white",
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
                paddingLeft: "10px",
                marginTop: "-5px",
              }}
            >
              <ShoppingCartIcon fontSize="medium" />
              <h4 style={{ paddingLeft: "10px" }}>
                {this.props.cartItems.length}
              </h4>
            </div>
            <Link
              onMouseEnter={this.handleMouseEnterViewCart}
              onMouseLeave={this.handleMouseLeavingViewCart}
              to={nextPath}
              style={{
                textDecoration: "none",
                color: this.state.mouseOverViewCart ? "grey" : "white",
                flexWrap: "wrap",
                marginTop: "-5px",
              }}
            >
              <h4>View Cart</h4>
            </Link>
            <div
              style={{
                marginTop: "-5px",
              }}
            >
              <h4
                style={{
                  paddingRight: "10px",
                }}
              >
                ${this.props.cartAmount}
              </h4>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundColor: "#161c20",
          textAlign: "center",
          position: "fixed",
          left: "0",
          bottom: "0",
          height: 70,
          width: "100%",
          boxShadow: "0px -1px 3px rgba(50, 50, 50, 0.50)",
          color: "white",
          minWidth: "1440px",
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
              paddingLeft: "20px",
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
              textDecoration: "none",
              color: this.state.mouseOverViewCart ? "grey" : "white",
              flexWrap: "wrap",
            }}
          >
            <h2>View Cart</h2>
          </Link>
          <h2
            style={{
              paddingRight: "20px",
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
