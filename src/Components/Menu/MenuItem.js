import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { isMobile } from "react-device-detect";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.itemInfo.id,
      name: props.itemInfo.name,
      price: props.itemInfo.price,
      isSpicy: props.itemInfo.isSpicy,
      chineseTranslation: props.itemInfo.chineseTranslation,
      menuItemNumber: props.itemInfo.menuItemNumber,
    };
  }

  render() {
    if (isMobile) {
      return (
        <ListItem style={{ marginLeft: "-10px" }}>
          <ListItemText>
            <div
              style={{
                display: "flex",
                maxWidth: "200px",
                alignItems: "center",
              }}
            >
              <WhatshotIcon
                fontSize="small"
                style={{
                  color: this.state.isSpicy ? "red" : "transparent",
                  paddingRight: "10px",
                }}
              />
              <h3 style={{ fontWeight: "normal", fontSize: 14 }}>
                {this.state.menuItemNumber}. {this.state.name}{" "}
                {`(${this.state.chineseTranslation})`}
              </h3>
            </div>
          </ListItemText>
          <ListItemSecondaryAction style={{ fontSize: 15 }}>
            ${this.state.price}
            <IconButton
              size="medium"
              style={{ color: "black" }}
              onClick={() =>
                this.props.addMenuItemToCart({
                  id: this.state.id,
                  name: this.state.name,
                  price: this.state.price,
                  menuItemNumber: this.state.menuItemNumber,
                })
              }
            >
              <AddIcon></AddIcon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    }
    return (
      <ListItem>
        <ListItemAvatar>
          <WhatshotIcon
            fontSize="large"
            style={{
              color: this.state.isSpicy ? "red" : "transparent",
            }}
          />
        </ListItemAvatar>
        <div>
          <ListItemText>
            <h3 style={{ fontWeight: "normal", fontSize: 22 }}>
              {this.state.menuItemNumber}. {this.state.name}{" "}
              {`(${this.state.chineseTranslation})`}
            </h3>
          </ListItemText>
        </div>
        <ListItemSecondaryAction style={{ fontSize: 22 }}>
          ${this.state.price}
          <IconButton
            size="medium"
            style={{ color: "black" }}
            onClick={() =>
              this.props.addMenuItemToCart({
                id: this.state.id,
                name: this.state.name,
                price: this.state.price,
                menuItemNumber: this.state.menuItemNumber,
              })
            }
          >
            <AddIcon></AddIcon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Item;
