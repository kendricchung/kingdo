import React, { Component } from "react";
import MenuItem from "./MenuItem";
import List from "@material-ui/core/List";

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
      <List style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        {this.state.sectionItems.map((item) => (
          <MenuItem
            key={item.id}
            addMenuItemToCart={this.props.addMenuItemToCart}
            itemInfo={item}
          ></MenuItem>
        ))}
      </List>
    );
  };

  render() {
    return this.formGrid();
  }
}

export default MenuStructure;
