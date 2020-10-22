import React, { Component } from "react";
import MenuStructure from "./MenuStructure";
import Divider from "@material-ui/core/Divider";
import { isMobile } from "react-device-detect";

class MenuSection extends Component {
  state = {
    sectionName: "",
    sectionItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      sectionName: props.menuSectionInfo.menuSectionName,
      sectionItems: props.menuSectionInfo.menuSectionItems,
    };
  }
  render() {
    return (
      <div>
        <h2 style={{ paddingLeft: "2%", fontSize: isMobile ? 18 : 30 }}>
          {this.state.sectionName}
        </h2>
        <Divider
          style={{
            height: "1px",
            width: "96%",
            left: "2%",
            position: "absolute",
            backgroundColor: "black",
          }}
        />
        <MenuStructure
          addMenuItemToCart={this.props.addMenuItemToCart}
          items={this.state.sectionItems}
        />
      </div>
    );
  }
}

export default MenuSection;
