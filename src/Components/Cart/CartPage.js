import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import ScrollToTop from "react-scroll-to-top";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

class CartPage extends Component {
  constructor(props) {
    super(props);
    let map = new Map();
    const storageCartItems = JSON.parse(sessionStorage.getItem("cartItems"))
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [];
    for (const item of storageCartItems) {
      if (!map.has(item.id)) {
        map.set(item.id, [item]);
      } else {
        let listOfItemsWithGivenId = map.get(item.id);
        listOfItemsWithGivenId.push(item);
        map.set(item.id, listOfItemsWithGivenId);
      }
    }

    let listOfItems = [];
    map.forEach((value, key) => {
      listOfItems.push({
        quantity: value.length,
        item: value[0],
      });
    });

    let price = 0;
    listOfItems.forEach((value) => {
      price +=
        value.quantity *
        parseFloat(
          (Math.round(parseFloat(value.item.price, 10) * 100) / 100).toFixed(2)
        );
    });

    const subtotalPrice = parseFloat(
      (Math.round(parseFloat(price, 10) * 100) / 100).toFixed(2)
    );
    const taxPrice = parseFloat(
      (Math.round(subtotalPrice * 0.05 * 100) / 100).toFixed(2)
    );

    const totalPrice = parseFloat(
      (
        Math.round(parseFloat(subtotalPrice + taxPrice, 10) * 100) / 100
      ).toFixed(2)
    );
    this.state = {
      cartItems: storageCartItems,
      itemStack: listOfItems,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      foodTransportationMethod: props.location.pathname.includes("delivery")
        ? "delivery"
        : "pickup",
      redirectToOrderConfirmationPage: false,
      buttonDisabled: storageCartItems.length === 0 ? true : false,
    };
  }

  handleRedirectToOrderConfirmationPage = () => {
    this.setState({ redirectToOrderConfirmationPage: true });
  };

  calculateAmountsGivenStackItems(stackItems) {
    let price = 0;
    stackItems.forEach((value) => {
      price +=
        value.quantity *
        parseFloat(
          (Math.round(parseFloat(value.item.price, 10) * 100) / 100).toFixed(2)
        );
    });

    const subtotalPrice = parseFloat(
      (Math.round(parseFloat(price, 10) * 100) / 100).toFixed(2)
    );
    const taxPrice = parseFloat(
      (Math.round(subtotalPrice * 0.05 * 100) / 100).toFixed(2)
    );

    const totalPrice = parseFloat(
      (
        Math.round(parseFloat(subtotalPrice + taxPrice, 10) * 100) / 100
      ).toFixed(2)
    );

    return [subtotalPrice, taxPrice, totalPrice];
  }

  handleRemoveItems = (itemId) => {
    let currentStackItems = this.state.itemStack;
    let currentCartItems = this.state.cartItems;
    // This creates the new stack of items
    let newStackItems = [];
    currentStackItems.forEach((value) => {
      if (value.item.id !== itemId) {
        newStackItems.push(value);
      }
    });
    // This creates the new cart items
    let newCartItems = [];
    currentCartItems.forEach((value) => {
      if (value.id !== itemId) {
        newCartItems.push(value);
      }
    });
    // Set to session storage
    sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));

    // Calculate the new amounts
    const [
      subtotalPrice,
      taxPrice,
      totalPrice,
    ] = this.calculateAmountsGivenStackItems(newStackItems);

    this.setState({
      itemStack: newStackItems,
      cartItems: newCartItems,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });
  };

  handleChangeQuantity = (item, newQuantity, oldQuantity) => {
    if (item && newQuantity && oldQuantity) {
      let currentCartItems = this.state.cartItems;
      let currentStackItems = this.state.itemStack;
      let newCartItems = [];
      let numberOfItemsLeft = oldQuantity - newQuantity;

      if (numberOfItemsLeft >= 0) {
        let numberOfItemsToRemove = numberOfItemsLeft;
        for (let i = 0; i < currentCartItems.length; i++) {
          if (currentCartItems[i].id === item.id && numberOfItemsToRemove > 0) {
            delete currentCartItems[i];
            numberOfItemsToRemove--;
          }
        }
        currentCartItems.forEach((value) => {
          if (value !== null) {
            newCartItems.push(value);
          }
        });
      } else if (numberOfItemsLeft < 0) {
        let numberToAdd = Math.abs(numberOfItemsLeft);
        newCartItems = currentCartItems;
        for (let i = 0; i < numberToAdd; i++) {
          newCartItems.push(item);
        }
      }

      currentStackItems.forEach((value) => {
        if (value.item.id === item.id) {
          if (numberOfItemsLeft > 0) {
            value.quantity -= numberOfItemsLeft;
          } else {
            value.quantity += Math.abs(numberOfItemsLeft);
          }
        }
      });

      sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));

      const [
        subtotalPrice,
        taxPrice,
        totalPrice,
      ] = this.calculateAmountsGivenStackItems(currentStackItems);

      this.setState({
        itemStack: currentStackItems,
        cartItems: newCartItems,
        subtotalPrice: subtotalPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });
    }
  };

  render() {
    if (this.state.redirectToOrderConfirmationPage) {
      return (
        <Redirect
          push
          to={{
            pathname: `/${this.state.foodTransportationMethod}/cart/order/confirmed`,
            state: "token",
          }}
        />
      );
    }

    return (
      <div>
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
        <div style={{ display: "flex" }}>
          <div>
            {this.state.itemStack.length === 0 ? (
              <div style={{ padding: 40 }}>
                <Typography variant="h5" component="h2">
                  You currently don't have any items in your cart.
                </Typography>
                <Typography variant="h5" component="h2">
                  Please add them from the menu page to proceed to checkout.
                </Typography>
              </div>
            ) : (
              this.state.itemStack.map((value) => (
                <div style={{ padding: "13%", width: "200%" }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {value.item.name}
                      </Typography>
                      <Typography color="textSecondary">
                        ${value.item.price}
                      </Typography>
                      <Typography color="textSecondary">Quantity:</Typography>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(event) =>
                          this.handleChangeQuantity(
                            value.item,
                            parseInt(event.target.value, 10),
                            value.quantity
                          )
                        }
                        defaultValue={value.quantity}
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => this.handleRemoveItems(value.item.id)}
                      >
                        Remove Item
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))
            )}
          </div>
          <div
            style={{
              width: "45%",
              position: "fixed",
              right: 0,
              padding: 40,
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ fontSize: 40 }}
                >
                  Order Summary
                </Typography>
                <span style={{ padding: "10%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      Items:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      {this.state.cartItems.length}
                    </Typography>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      Subtotal:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      ${this.state.subtotalPrice}
                    </Typography>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      Tax (GST):
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      ${this.state.taxPrice}
                    </Typography>
                  </div>
                  <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <div
                      style={{
                        width: "100%",
                        height: 2,
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="h2" style={{ fontSize: 40 }}>
                      Total:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 40 }}>
                      ${this.state.totalPrice}
                    </Typography>
                  </div>
                </span>
              </CardContent>
              <div style={{ padding: "2%" }}>
                <Button
                  fullWidth
                  disabled={this.state.buttonDisabled}
                  onClick={this.handleRedirectToOrderConfirmationPage}
                  variant="contained"
                  style={{
                    padding: "2%",
                    fontSize: 20,
                    color: "white",
                    backgroundColor: this.state.buttonDisabled
                      ? "grey"
                      : "green",
                  }}
                >
                  Confirm Order
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
