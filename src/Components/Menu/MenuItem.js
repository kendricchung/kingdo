import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
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
          width: window.outerWidth*0.2,
          paddingLeft: window.outerWidth*0.02,
          paddingRight: window.outerWidth*0.02, 
          paddingTop: window.outerHeight*0.02,
          paddingBottom: window.outerHeight*0.02,
        }}
      >
        <Card style={{ height: window.outerHeight*0.18, }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardContent>
              <Typography>{this.state.name}</Typography>
              <Typography>{this.state.price}</Typography>
            </CardContent>
            <Button
            style={{height: window.outerHeight*0.18,}}
              onClick={() =>
                this.props.addMenuItemToCart({
                  id: this.state.id,
                  name: this.state.name,
                  price: this.state.price,
                })
              }
            >
              <AddIcon></AddIcon>
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default MenuItem;
