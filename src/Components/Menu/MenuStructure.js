import React, { Component } from "react";
import MenuItem from "./MenuItem";
import Grid from "@material-ui/core/Grid";

class MenuStructure extends Component {
  state = {
    sectionItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      sectionItems: props.items,
    };
  }
  formGrid = () => {
    // should do a map here and do some calculations based on the list of items
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "100%",
          flexWrap: "wrap",
        }}
      >
        {this.state.sectionItems.map((item) => (
          <MenuItem
            addMenuItemToCart={this.props.addMenuItemToCart}
            itemInfo={item}
          ></MenuItem>
        ))}
      </div>
    );
  };

  render() {
    return this.formGrid();
  }
}

export default MenuStructure;
