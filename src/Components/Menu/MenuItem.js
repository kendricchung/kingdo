import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import WhatshotIcon from "@material-ui/icons/Whatshot";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.itemInfo.id,
      name: props.itemInfo.name,
      price: props.itemInfo.price,
      isSpicy: props.itemInfo.isSpicy,
      chineseTranslation: props.itemInfo.chineseTranslation,
    };
  }

  render() {
    return (
      <ListItem>
        <ListItemAvatar>
          <WhatshotIcon
            fontSize="large"
            style={{ color: this.state.isSpicy ? "red" : "transparent" }}
          />
        </ListItemAvatar>
        <div>
          <ListItemText>
            <h3 style={{ fontWeight: "normal" }}>{this.state.name}</h3>
          </ListItemText>
          <ListItemText>
            <h3 style={{ fontWeight: "normal" }}>
              {this.state.chineseTranslation}
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

export default MenuItem;
