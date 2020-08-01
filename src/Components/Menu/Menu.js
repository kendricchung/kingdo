import React, { Component } from "react";
import MenuSection from "./MenuSection";
import MenuButton from "./MenuButton";
import { Link, Element, Events, scrollSpy } from "react-scroll";

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
  {
    menuSectionName: "Beef and Port",
    menuSectionItems: [{ id: 16, name: "Mandarin Pork Chops", price: 15.95 }],
  },
];

const menuSections = ["Appetizers", "Soups", "Beef and Port"];

class Menu extends Component {
  componentDidMount() {
    Events.scrollEvent.register("begin");

    Events.scrollEvent.register("end");

    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    return (
      <div style={{ paddingBottom: "4%" }}>
        <div
          style={{
            padding: "2%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {menuSections.map((section) => (
            <Link
              activeClass="active"
              to={section}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              onSetActive={this.handleSetActive}
            >
              <MenuButton buttonName={section}></MenuButton>
            </Link>
          ))}
        </div>
        {menu.map((menuSection) => (
          <Element name={menuSection.menuSectionName}>
            <MenuSection
              addMenuItemToCart={this.props.addMenuItemToCart}
              menuSectionInfo={menuSection}
            ></MenuSection>
          </Element>
        ))}
      </div>
    );
  }
}

export default Menu;
