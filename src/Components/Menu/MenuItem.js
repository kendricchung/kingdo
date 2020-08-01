import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.itemInfo.id,
      name: props.itemInfo.name,
      price: props.itemInfo.price,
    };
  }

  render() {
    return (
      <div
        style={{
          width: "20%",
          padding: "2%",
        }}
      >
        <Card style={{ height: "95%" }}>
          <CardContent>
            <Typography>{this.state.name}</Typography>
            <Typography>{this.state.price}</Typography>
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default MenuItem;
