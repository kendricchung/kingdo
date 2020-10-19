import React, { Component } from "react";
import MenuItem from "./MenuItem";
import List from "@material-ui/core/List";
import { isMobile } from "react-device-detect";

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
    return (
      <List
        style={{
          paddingLeft: isMobile ?? "2%",
          paddingRight: isMobile ?? "2%",
        }}
      >
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
