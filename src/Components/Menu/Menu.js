import React, { Component } from "react";
import MenuSection from "./MenuSection";

const menu = [
  {
    menuSectionName: "Appetizers",
    menuSectionItems: [
      { id: 7, name: "Lettuce Wrap (Chicken)", price: 14.95 },
      { id: 8, name: "Lettuce Wrap (Beef)", price: 14.95 },
      { id: 9, name: "Lettuce Wrap (Seafood)", price: 14.95 },
      { id: 10, name: "BBQ Pork", price: 8.95 },
      { id: 7, name: "Lettuce Wrap (Chicken)", price: 14.95 },
    ],
  },
  {
    menuSectionName: "Soups",
    menuSectionItems: [{ id: 15, name: "wonton soup", price: 10.95 }],
  },
];

class Menu extends Component {
  render() {
    return (
      <div style={{ paddingBottom: "4%" }}>
        {menu.map((menuSection) => (
          <MenuSection menuSectionInfo={menuSection}></MenuSection>
        ))}
      </div>
    );
  }
}

export default Menu;
