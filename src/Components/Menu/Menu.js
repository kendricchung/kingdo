import React, { Component } from "react";
import MenuSection from "./MenuSection";
import { Link, Element, Events, scrollSpy } from "react-scroll";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import buttonBackground from "../kingdo_background.png";
import { isMobile } from "react-device-detect";

const menu = [
  {
    // APPETIZERS
    menuSectionName: "CHINESE HERE - APPTIZERS",
    menuSectionItems: [
      {
        id: 1,
        name: "Three Kind Appetizer Combinations",
        price: 32.8,
        isSpicy: true,
        menuItemNumber: 1,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 2,
        name: "New King Do Apptizer Combinations",
        price: 36.8,
        isSpicy: false,
        menuItemNumber: 2,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 3,
        name: "Braised Crispy Squab",
        price: 0.0, // TODO: need to change this for later
        isSpicy: false,
        menuItemNumber: 3,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 4,
        name: "D.F. Crab Claws Wrapper with Minced Shrimp",
        price: 5.95,
        isSpicy: false,
        menuItemNumber: 4,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 5,
        name: "Cold Marinated Jellyfish and Pork Hock",
        price: 19.95,
        isSpicy: false,
        menuItemNumber: 5,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 6,
        name: "Deep-Fried Assorted Meat Combinations",
        price: 28.8,
        isSpicy: false,
        menuItemNumber: 6,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 7,
        name: "Lettuce Wrap (Chicken)",
        price: 14.95,
        isSpicy: false,
        menuItemNumber: 7,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 8,
        name: "Lettuce Wrap (Beef)",
        price: 14.95,
        isSpicy: false,
        menuItemNumber: 7,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 9,
        name: "Lettuce Wrap (Seafood)",
        price: 16.95,
        isSpicy: false,
        menuItemNumber: 7,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 10,
        name: "Spring Roll (1pc)",
        price: 1.65,
        isSpicy: false,
        menuItemNumber: 8,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 11,
        name: "Deep-Fried Wonton",
        price: 9.5,
        isSpicy: false,
        menuItemNumber: 9,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 12,
        name: "B.B.Q Pork",
        price: 8.95,
        isSpicy: false,
        menuItemNumber: 10,
        chineseTranslation: "chineseTranslation",
      },
    ],
  },
  {
    menuSectionName: "CHINESE HERE - SOUPS",
    menuSectionItems: [
      {
        id: 13,
        name: "Szechuan Hot-and-Sour Soup",
        price: 10.5,
        isSpicy: true,
        menuItemNumber: 11,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 14,
        name: "Crabmeat with Fish Maw Soup",
        price: 13.95,
        isSpicy: false,
        menuItemNumber: 12,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 15,
        name: "Crabmeat with Cream Corn Soup",
        price: 11.5,
        isSpicy: false,
        menuItemNumber: 13,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 16,
        name: "Minced Chicken and Cream Corn Soup",
        price: 10.5,
        isSpicy: false,
        menuItemNumber: 14,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 17,
        name: "Wonton Soup",
        price: 10.95,
        isSpicy: false,
        menuItemNumber: 15,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 18,
        name: "War Wonton Soup (Large)",
        price: 18.95,
        isSpicy: false,
        menuItemNumber: 16,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 19,
        name: "Minced Beef and Egg White Soup",
        price: 10.95,
        isSpicy: false,
        menuItemNumber: 17,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 20,
        name: "Seafood and Dry Scallop Soup",
        price: 13.8,
        isSpicy: false,
        menuItemNumber: 18,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 21,
        name: "Assorted Seafood and Tofu Soup (Large)",
        price: 19.8,
        isSpicy: false,
        menuItemNumber: 19,
        chineseTranslation: "chineseTranslation",
      },
    ],
  },
  {
    menuSectionName: "CHINESE HERE - BEEF AND PORK",
    menuSectionItems: [
      {
        id: 22,
        name: "Sliced Pork Sauteed with Cabbage",
        price: 13.95,
        isSpicy: true,
        menuItemNumber: 20,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 23,
        name: "Shredded Pork with Hot Garlic Sauce",
        price: 13.5,
        isSpicy: true,
        menuItemNumber: 21,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 24,
        name: "Sweet-and-Sour Pork with Pineapple",
        price: 12.95,
        isSpicy: false,
        menuItemNumber: 22,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 25,
        name: "Sweet-and-Sour Pork (Boneless)",
        price: 12.95,
        isSpicy: false,
        menuItemNumber: 23,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 26,
        name: "Honey Garlic Boneless Pork",
        price: 13.95,
        isSpicy: false,
        menuItemNumber: 24,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 27,
        name: "Dry Garlic Boneless Pork",
        price: 13.95,
        isSpicy: false,
        menuItemNumber: 25,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 28,
        name: "Mandarin Pork Chops",
        price: 15.95,
        isSpicy: false,
        menuItemNumber: 26,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 29,
        name: "Deep-Fried Spicy Pork Chops",
        price: 15.75,
        isSpicy: true,
        menuItemNumber: 27,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 30,
        name: "Dry Garlic Spareribs",
        price: 13.95,
        isSpicy: false,
        menuItemNumber: 28,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 31,
        name: "Deep-Fried Spicy Dry Spareribs",
        price: 13.95,
        isSpicy: true,
        menuItemNumber: 29,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 32,
        name: "Steamed Spareribs in Black Bean Sauce",
        price: 16.25,
        isSpicy: false,
        menuItemNumber: 30,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 33,
        name: "Steamed Pork Patty with Salted Fish",
        price: 15.95,
        isSpicy: false,
        menuItemNumber: 31,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 34,
        name: "Sliced Beef with Black Bean Sauce",
        price: 14.75,
        isSpicy: false,
        menuItemNumber: 32,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 35,
        name: "Stir-Fried Beef with Green Onions",
        price: 14.95,
        isSpicy: false,
        menuItemNumber: 33,
        chineseTranslation: "chineseTranslation",
      },
      {
        id: 36,
        name: "Beef with Satay Sauce",
        price: 14.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 34,
      },
      {
        id: 37,
        name: "Curried Beef",
        price: 14.75,
        isSpicy: true,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 35,
      },
      {
        id: 38,
        name: "Pan-Fried Beef Tenderloin with Gourmet Sauce",
        price: 15.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 36,
      },
      {
        id: 39,
        name: "Pan-Fried Beef Tenderloin with Black Pepper Sauce",
        price: 15.95,
        isSpicy: true,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 37,
      },
      {
        id: 40,
        name: "Shredded Beef with Ginger Sauce",
        price: 14.75,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 38,
      },
      {
        id: 41,
        name: "Mongolian Beef",
        price: 14.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 39,
      },
      {
        id: 42,
        name: "Beef with Broccoli",
        price: 12.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 40,
      },
      {
        id: 43,
        name: "Beef with Gai Lai (Chinese Broccoli)",
        price: 15.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 41,
      },
      {
        id: 44,
        name: "Beef with Oyster Sauce",
        price: 13.75,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 42,
      },
      {
        id: 45,
        name: "Beef with Tomatoes",
        price: 14.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 43,
      },
      {
        id: 46,
        name: "Beef with Snow Peas",
        price: 14.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 45,
      },
      {
        id: 47,
        name: "Beef Brisket with Daikon",
        price: 18.8,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 46,
      },
      {
        id: 48,
        name: "Mixed Vegetable and Beef",
        price: 12.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 47,
      },
      {
        id: 49,
        name: "Beef in Chili Sauce",
        price: 19.8,
        isSpicy: true,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 48,
      },
      {
        id: 50,
        name: "Sliced Beef with Green Bean in Black Bean Sauce",
        price: 14.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 49,
      },
    ],
  },
  {
    menuSectionName: "CHINESE HERE - CHICKEN AND DUCK",
    menuSectionItems: [
      {
        id: 51,
        name: "Szechuan Chicken",
        price: 13.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 50,
      },
    ],
  },
  {
    menuSectionName: "CHINESE HERE - CHICKEN AND DUCK",
    menuSectionItems: [
      {
        id: 51,
        name: "Szechuan Chicken",
        price: 13.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 50,
      },
    ],
  },
  {
    menuSectionName: "CHINESE HERE - CHICKEN AND DUCK",
    menuSectionItems: [
      {
        id: 51,
        name: "Szechuan Chicken",
        price: 13.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 50,
      },
    ],
  },
  {
    menuSectionName: "CHINESE HERE - CHICKEN AND DUCK",
    menuSectionItems: [
      {
        id: 51,
        name: "Szechuan Chicken",
        price: 13.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 50,
      },
    ],
  },
  {
    menuSectionName: "CHINESE HERE - CHICKEN AND DUCK",
    menuSectionItems: [
      {
        id: 51,
        name: "Szechuan Chicken",
        price: 13.95,
        isSpicy: false,
        chineseTranslation: "chineseTranslation",
        menuItemNumber: 50,
      },
    ],
  },
];

class Menu extends Component {
  state = {
    selectedMenuSection: null,
  };

  componentDidMount() {
    Events.scrollEvent.register("begin");

    Events.scrollEvent.register("end");

    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  handleSelect = (event) => {
    this.setState({ selectedMenuSection: event.target.value });
  };

  render() {
    return (
      <div style={{ paddingBottom: 100 }}>
        <div style={{ padding: 30 }}>
          <FormControl fullWidth style={{ paddingBottom: 20 }}>
            <InputLabel> Menu Sections (required) </InputLabel>
            <Select onChange={this.handleSelect}>
              {menu.map((section) => (
                <MenuItem value={section.menuSectionName}>
                  {section.menuSectionName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Link
            activeClass="active"
            to={this.state.selectedMenuSection}
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            key={this.state.selectedMenuSection}
          >
            <Button
              label={`Go to ${
                this.state.selectedMenuSection
                  ? this.state.selectedMenuSection
                  : "..."
              }`}
              color="#808080"
              variant="contained"
              size={isMobile ? "medium" : "large"}
              style={{
                fontSize: isMobile ? 15 : 18,
                fontWeight: "bolder",
                backgroundImage: `url(${buttonBackground})`,
                borderWidth: 2,
                borderColor: "black",
                borderStyle: "solid",
              }}
            >
              Go to{" "}
              {this.state.selectedMenuSection
                ? this.state.selectedMenuSection
                : "..."}
            </Button>
          </Link>
        </div>

        {menu.map((menuSection) => (
          <Element
            key={menuSection.menuSectionName}
            name={menuSection.menuSectionName}
          >
            <MenuSection
              key={menuSection.menuSectionName}
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
