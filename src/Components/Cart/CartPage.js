import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import ScrollToTop from "react-scroll-to-top";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class CartPage extends Component {
  constructor(props) {
    super(props);
    let map = new Map();
    const storageCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
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
      cartItems: JSON.parse(sessionStorage.getItem("cartItems")),
      itemStack: listOfItems,
      subtotalPrice: subtotalPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
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
        <div style={{ display: "flex" }}>
          <div>
            {this.state.itemStack.map((value) => (
              <div style={{ padding: "13%", width: "300%" }}>
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
                      variant="outlined"
                      size="small"
                      defaultValue={value.quantity}
                    />
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary">
                      Remove Item
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
          <div
            style={{
              width: "45%",
              position: "fixed",
              right: 0,
              padding: "2%",
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
                  <div style={{ paddingTop: 40, paddingBottom: 40 }}>
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
                  variant="contained"
                  style={{
                    padding: "2%",
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "green",
                  }}
                >
                  Place Order
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
