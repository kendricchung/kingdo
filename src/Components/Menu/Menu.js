import React, { Component } from "react";
import MenuSection from "./MenuSection";
import { Link, Element, Events, scrollSpy } from "react-scroll";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";

import { menu } from "./AllMenuItems";
import { featuredItems } from "./AllFeaturedItems";

const useStyles = makeStyles((theme) => ({
  root: {
    width: isMobile ? 150 : 300,
    maxHeight: isMobile ? 200 : 500,
  },
  media: {
    height: isMobile ? 100 : 230,
  },
  text: {
    fontSize: isMobile ? 12 : 18,
  },
}));

function FeaturedItemCard({ addMenuItemToCart, itemInfo }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={itemInfo.pathToPhoto}
        title={itemInfo.name}
      />
      <CardContent>
        <Typography gutterBottom className={classes.text}>
          {itemInfo.name}
        </Typography>
        <Typography gutterBottom>{itemInfo.chineseTranslation}</Typography>
        <Typography gutterBottom>${itemInfo.price}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
          onClick={() =>
            addMenuItemToCart({
              id: itemInfo.id,
              name: itemInfo.name,
              price: itemInfo.price,
              menuItemNumber: itemInfo.menuItemNumber,
            })
          }
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

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
    if (isMobile) {
      return (
        <div style={{ paddingBottom: 75 }}>
          <div style={{ padding: 10 }}>
            <h4 style={{ textTransform: "none", fontWeight: 400 }}>
              Please select a section to go to:
            </h4>
            <FormControl fullWidth style={{ paddingBottom: 20 }}>
              <Select onChange={this.handleSelect}>
                {menu.map((section) => (
                  <MenuItem
                    value={section.menuSectionName}
                    style={{ fontSize: 12 }}
                  >
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
              hidden={this.state.selectedMenuSection ? false : true}
            >
              <Button
                label={`Go to ${this.state.selectedMenuSection}`}
                variant="contained"
                size="large"
                style={{
                  fontSize: 14,
                  fontWeight: "bolder",
                  backgroundColor: "#161c20",
                  borderWidth: 1,
                  borderColor: "black",
                  borderStyle: "solid",
                  color: "white",
                }}
              >
                Go to {this.state.selectedMenuSection}
              </Button>
            </Link>
          </div>
          <MenuSection
            key={featuredItems.menuSectionName}
            addMenuItemToCart={this.props.addMenuItemToCart}
            menuSectionInfo={featuredItems}
          ></MenuSection>
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

    return (
      <div style={{ paddingBottom: 100, minWidth: "1440px" }}>
        <div style={{ padding: 30 }}>
          <h2 style={{ textTransform: "none", fontWeight: 400 }}>
            Please select a section to go to:
          </h2>
          <FormControl fullWidth size="medium" style={{ paddingBottom: 20 }}>
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
            hidden={this.state.selectedMenuSection ? false : true}
          >
            <Button
              label={`Go to ${this.state.selectedMenuSection}`}
              variant="contained"
              size="large"
              style={{
                fontSize: 18,
                fontWeight: "bolder",
                backgroundColor: "#161c20",
                borderWidth: 2,
                borderColor: "black",
                borderStyle: "solid",
                color: "white",
              }}
            >
              Go to {this.state.selectedMenuSection}
            </Button>
          </Link>
        </div>
        <div style={{ padding: 20 }}>
          <h2 style={{ paddingLeft: 10, fontSize: 32 }}>FEATURED</h2>
          <Divider
            style={{
              height: "1px",
              width: "96%",
              left: "2%",
              position: "absolute",
              backgroundColor: "black",
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {featuredItems.menuSectionItems.map((featuredItem) => (
              <div style={{ padding: 20 }}>
                <FeaturedItemCard
                  key={featuredItem.id}
                  itemInfo={featuredItem}
                  addMenuItemToCart={this.props.addMenuItemToCart}
                />
              </div>
            ))}
          </div>
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
