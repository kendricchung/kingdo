import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import ScrollToTop from "react-scroll-to-top";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import { isMobile } from "react-device-detect";

export const parseItemIntoStack = (items) => {
  let map = new Map();
  for (const item of items) {
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

  return [listOfItems, numberOfItemsCounter];
};

export const calculateAmountsGivenStackItems = (stackItems) => {
  if (stackItems.length === 0) {
    return [0, 0, 0];
  }
  let price = 0;
  stackItems.forEach((value) => {
    if (value.item.price > 0) {
      price +=
        value.quantity *
        parseFloat(
          (Math.round(parseFloat(value.item.price, 10) * 100) / 100).toFixed(2)
        );
    }
  });

  const subtotalPrice = parseFloat(
    (Math.round(parseFloat(price, 10) * 100) / 100).toFixed(2)
  );
  const taxPrice = parseFloat(
    (Math.round(subtotalPrice * 0.05 * 100) / 100).toFixed(2)
  );

  const totalPrice = parseFloat(
    (Math.round(parseFloat(subtotalPrice + taxPrice, 10) * 100) / 100).toFixed(
      2
    )
  );

  return [subtotalPrice, taxPrice, totalPrice];
};

class CartPage extends Component {
  constructor(props) {
    super(props);

    const storageCartItems = JSON.parse(sessionStorage.getItem("cartItems"))
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [];

    const [listOfItems, numberOfItemsCounter] = parseItemIntoStack(
      storageCartItems
    );

    const [
      subtotalPrice,
      taxPrice,
      totalPrice,
    ] = calculateAmountsGivenStackItems(listOfItems);

    let isMarketPrice = false;
    listOfItems.forEach((itemStack) => {
      if (itemStack.item.price < 0) {
        isMarketPrice = true;
        return;
      }
    });

    sessionStorage.setItem("totalPrice", totalPrice);
    sessionStorage.setItem("subtotalPrice", subtotalPrice);
    sessionStorage.setItem("taxPrice", taxPrice);

    this.state = {
      itemStack: listOfItems,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      totalNumberOfItems: numberOfItemsCounter,
      foodTransportationMethod: sessionStorage
        .getItem("foodTransportMethod")
        .includes("delivery")
        ? "delivery"
        : "pickup",
      redirectToOrderConfirmationPage: false,
      buttonDisabled: storageCartItems.length === 0 ? true : false,
      hasMarketPrice: isMarketPrice,
    };
  }

  handleRedirectToOrderConfirmationPage = () => {
    this.setState({ redirectToOrderConfirmationPage: true });
  };

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
    ] = calculateAmountsGivenStackItems(newStackItems);

    let isMarketPrice = false;
    newStackItems.forEach((value) => {
      if (value.item.price < 0) {
        isMarketPrice = true;
        return;
      }
    });

    sessionStorage.setItem("totalPrice", totalPrice);
    sessionStorage.setItem("subtotalPrice", subtotalPrice);
    sessionStorage.setItem("taxPrice", taxPrice);

    this.setState({
      buttonDisabled: newStackItems.length === 0,
      itemStack: newStackItems,
      totalNumberOfItems: newCartItems.length,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      hasMarketPrice: isMarketPrice,
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
    ] = calculateAmountsGivenStackItems(currentStackItems);

    sessionStorage.setItem("totalPrice", totalPrice);
    sessionStorage.setItem("subtotalPrice", subtotalPrice);
    sessionStorage.setItem("taxPrice", taxPrice);

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
    let isMarketPrice = this.state.hasMarketPrice;
    currentStackItems.forEach((value) => {
      if (value.item.id === itemId) {
        value.quantity--;
        if (value.quantity === 0) {
          removeItem = true;
          if (value.item.price < 0) {
            isMarketPrice = false;
          }
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
    ] = calculateAmountsGivenStackItems(updatedStackItems);

    sessionStorage.setItem("totalPrice", totalPrice);
    sessionStorage.setItem("subtotalPrice", subtotalPrice);
    sessionStorage.setItem("taxPrice", taxPrice);

    this.setState({
      buttonDisabled: updatedStackItems.length === 0,
      itemStack: updatedStackItems,
      totalNumberOfItems: newCartItems.length,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      hasMarketPrice: isMarketPrice,
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

    if (isMobile) {
      return (
        <div>
          <TopBar />
          <div>
            {this.state.itemStack.length === 0 ? (
              <div style={{ padding: 20 }}>
                <Typography variant="h5">
                  You currently don't have any items in your cart.
                </Typography>
                <Typography variant="h5">
                  Please add them from the menu page to proceed to checkout.
                </Typography>
              </div>
            ) : (
              this.state.itemStack.map((value) => (
                <div style={{ padding: "20px" }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" style={{ fontSize: 20 }}>
                        {value.item.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        style={{ fontSize: 18 }}
                      >
                        {value.item.price < 0
                          ? "Market Price"
                          : `$${value.item.price}`}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        style={{ fontSize: 16 }}
                      >
                        Quantity:
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <Typography style={{ fontSize: 20, padding: 10 }}>
                          {value.quantity}
                        </Typography>
                        <IconButton
                          size="medium"
                          color="inherit"
                          onClick={() =>
                            this.handleIncreaseQuantityByOne(value.item.id)
                          }
                        >
                          <AddCircleIcon />
                        </IconButton>
                        <IconButton
                          size="medium"
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
                        size="medium"
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
          <div style={{ padding: "20px" }}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ fontSize: 20 }}
                >
                  Order Summary
                </Typography>
                <span style={{ padding: "10%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      Items:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      {this.state.totalNumberOfItems}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      Subtotal:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      ${this.state.subtotalPrice}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      Tax (GST):
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      ${this.state.taxPrice}
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      Total:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      ${this.state.totalPrice}
                    </Typography>
                  </div>
                  {this.state.hasMarketPrice ? (
                    <Typography
                      component="h2"
                      style={{ fontSize: 13, paddingTop: "10px" }}
                    >
                      {`One of your items is listed a market price. This means
                        that we cannot calculate it at the moment and you will
                        receive the total amount paid upon ${
                          this.state.foodTransportationMethod === "delivery"
                            ? "delivery"
                            : "pick up"
                        }.\nIf you would like to know more about the market 
                        price of your item, please call the restaurant at the phone number above.`}
                    </Typography>
                  ) : null}
                </span>
              </CardContent>
              <div
                style={{
                  paddingBottom: "2%",
                  paddingRight: "2%",
                  paddingLeft: "2%",
                }}
              >
                <Button
                  fullWidth
                  disabled={this.state.buttonDisabled}
                  onClick={this.handleRedirectToOrderConfirmationPage}
                  variant="contained"
                  style={{
                    backgroundColor: this.state.buttonDisabled
                      ? "grey"
                      : "green",
                    fontSize: 14,
                    color: "black",
                    borderWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  Confirm Order
                </Button>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div>
        <ScrollToTop
          smooth
          style={{
            position: "fixed",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#83858a",
          }}
        />
        <TopBar />
        <div
          style={{
            display: "flex",
            minWidth: "1440px",
            justifyContent: "space-between",
          }}
        >
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
                <div style={{ width: "500px", padding: "30px" }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {value.item.name}
                      </Typography>
                      <Typography color="textSecondary" variant="h6">
                        {value.item.price < 0
                          ? "Market Price"
                          : `$${value.item.price}`}
                      </Typography>
                      <Typography color="textSecondary">Quantity:</Typography>
                      <div style={{ display: "flex" }}>
                        <Typography style={{ fontSize: 20, padding: 10 }}>
                          {value.quantity}
                        </Typography>
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={() =>
                            this.handleIncreaseQuantityByOne(value.item.id)
                          }
                        >
                          <AddCircleIcon />
                        </IconButton>
                        <IconButton
                          size="large"
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
                        size="large"
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
              paddingRight: "30px",
              paddingTop: "30px",
              width: "600px",
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ fontSize: 30 }}
                >
                  Order Summary
                </Typography>
                <span style={{ padding: "10%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="h2" style={{ fontSize: 20 }}>
                      Items:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 20 }}>
                      {this.state.totalNumberOfItems}
                    </Typography>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="h2" style={{ fontSize: 20 }}>
                      Subtotal:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 20 }}>
                      ${this.state.subtotalPrice}
                    </Typography>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="h2" style={{ fontSize: 20 }}>
                      Tax (GST):
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 20 }}>
                      ${this.state.taxPrice}
                    </Typography>
                  </div>
                  <div
                    style={{
                      paddingTop: window.outerHeight * 0.02,
                      paddingBottom: window.outerHeight * 0.02,
                    }}
                  >
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
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      Total:
                    </Typography>
                    <Typography component="h2" style={{ fontSize: 30 }}>
                      ${this.state.totalPrice}
                    </Typography>
                  </div>
                  {this.state.hasMarketPrice ? (
                    <Typography
                      component="h2"
                      style={{ fontSize: 17, paddingTop: "20px" }}
                    >
                      {`One of your items is listed a market price. This means
                        that we cannot calculate it at the moment and you will
                        receive the total amount paid upon ${
                          this.state.foodTransportationMethod === "delivery"
                            ? "delivery"
                            : "pick up"
                        }.\nIf you would like to know more about the market 
                        price of your item, please call the restaurant at the phone number above.`}
                    </Typography>
                  ) : null}
                </span>
              </CardContent>
              <div
                style={{
                  paddingBottom: "2%",
                  paddingRight: "2%",
                  paddingLeft: "2%",
                }}
              >
                <Button
                  fullWidth
                  disabled={this.state.buttonDisabled}
                  onClick={this.handleRedirectToOrderConfirmationPage}
                  variant="contained"
                  style={{
                    backgroundColor: this.state.buttonDisabled
                      ? "grey"
                      : "green",
                    fontSize: 20,
                    color: "black",
                    borderWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
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
