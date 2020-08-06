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
    };
  }

  render() {
    return (
      <ListItem>
        <ListItemAvatar>
          <WhatshotIcon
            style={{ color: this.state.isSpicy ? "red" : "transparent" }}
          />
        </ListItemAvatar>
        <div>
          <ListItemText primary={this.state.name} />
          <ListItemText primary="Chinese goes here" />
        </div>
        <ListItemSecondaryAction>
          {this.state.price}
          <IconButton
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
