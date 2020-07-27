import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
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
          <CardMedia
            style={{ height: 180 }}
            image={require("./photo.jpg")}
          ></CardMedia>
          <CardContent>
            <Typography>{this.state.name}</Typography>
            <IconButton>
              <AddIcon></AddIcon>
            </IconButton>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default MenuItem;
