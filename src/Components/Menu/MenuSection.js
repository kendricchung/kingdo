import React, { Component } from "react";
import MenuStructure from "./MenuStructure";

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
        <h2 style={{ paddingLeft: "2%" }}>{this.state.sectionName}</h2>
        <MenuStructure items={this.state.sectionItems} />
      </div>
    );
  }
}

export default MenuSection;
