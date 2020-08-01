import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";

class CarBar extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          textAlign: "center",
          paddingBottom: "1.5%",
          position: "fixed",
          left: "0",
          bottom: "0",
          height: "4%",
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
              width: "11%",
            }}
          >
            <ShoppingCartIcon fontSize="large" />
            <h2 style={{ paddingLeft: "10%" }}>
              {this.props.cartItems.length}
            </h2>
          </div>
          <Button
            style={{ backgroundColor: "transparent", width: "11%" }}
            disableRipple={true}
          >
            <h3>View Cart</h3>
          </Button>

          <h2
            key={this.props.cartAmount}
            style={{
              fontSize: 20,
              width: "11%",
            }}
          >
            Total Amount: ${this.props.cartAmount}
          </h2>
        </div>
      </div>
    );
  }
}

export default CarBar;
