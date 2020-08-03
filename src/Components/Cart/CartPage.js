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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";

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
    let numberOfItemsCounter = 0;
    let listOfItems = [];
    map.forEach((value, key) => {
      listOfItems.push({
        quantity: value.length,
        item: value[0],
      });
      numberOfItemsCounter += value.length;
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
      itemStack: listOfItems,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      totalNumberOfItems: numberOfItemsCounter,
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
    if (stackItems.length === 0) {
      return [0, 0, 0];
    }
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
    // This creates the new stack of items
    let newStackItems = [];
    currentStackItems.forEach((value) => {
      if (value.item.id !== itemId) {
        newStackItems.push(value);
      }
    });
    // This creates the new cart items
    let newCartItems = [];
    newStackItems.forEach((value) => {
      for (let i = 0; i < value.quantity; i++) {
        newCartItems.push(value.item);
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
      buttonDisabled: newStackItems.length === 0,
      itemStack: newStackItems,
      totalNumberOfItems: newCartItems.length,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });
  };

  handleIncreaseQuantityByOne = (itemId) => {
    let currentStackItems = this.state.itemStack;
    currentStackItems.forEach((value) => {
      if (value.item.id === itemId) {
        value.quantity++;
        return;
      }
    });

    let newCartItems = [];
    currentStackItems.forEach((value) => {
      for (let i = 0; i < value.quantity; i++) {
        newCartItems.push(value.item);
      }
    });

    // Set to session storage
    sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));

    // Calculate the new amounts
    const [
      subtotalPrice,
      taxPrice,
      totalPrice,
    ] = this.calculateAmountsGivenStackItems(currentStackItems);

    this.setState({
      itemStack: currentStackItems,
      totalNumberOfItems: newCartItems.length,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });
  };

  handleDecreaseQuantityByOne = (itemId) => {
    let currentStackItems = this.state.itemStack;
    let newStackItems = [];
    let removeItem = false;
    currentStackItems.forEach((value) => {
      if (value.item.id === itemId) {
        value.quantity--;
        if (value.quantity === 0) {
          removeItem = true;
        }
        return;
      }
    });
    let updatedStackItems = [];

    if (removeItem && currentStackItems.length > 1) {
      currentStackItems.forEach((value) => {
        if (value.item.id !== itemId) {
          newStackItems.push(value);
        }
      });
      updatedStackItems = newStackItems;
    } else if (!removeItem && currentStackItems.length > 0) {
      updatedStackItems = currentStackItems;
    }

    let newCartItems = [];
    currentStackItems.forEach((value) => {
      for (let i = 0; i < value.quantity; i++) {
        newCartItems.push(value.item);
      }
    });
    // Set to session storage
    sessionStorage.setItem("cartItems", JSON.stringify(newCartItems));
    // Calculate the new amounts
    const [
      subtotalPrice,
      taxPrice,
      totalPrice,
    ] = this.calculateAmountsGivenStackItems(updatedStackItems);

    this.setState({
      buttonDisabled: updatedStackItems.length === 0,
      itemStack: updatedStackItems,
      totalNumberOfItems: newCartItems.length,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });
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
                      <div style={{ display: "flex" }}>
                        <Typography style={{ fontSize: 20, padding: 10 }}>
                          {value.quantity}
                        </Typography>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            this.handleIncreaseQuantityByOne(value.item.id)
                          }
                        >
                          <AddCircleIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            this.handleDecreaseQuantityByOne(value.item.id)
                          }
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => this.handleRemoveItems(value.item.id)}
                      >
                        Delete
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
                      {this.state.totalNumberOfItems}
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
