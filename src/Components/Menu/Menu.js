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
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { menu } from "./AllMenuItems";
import { featuredItems } from "./AllFeaturedItems";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    maxHeight: 500,
  },
  media: {
    height: 230,
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
        <Typography gutterBottom variant="h6" component="h2">
          {itemInfo.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          {itemInfo.chineseTranslation}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          ${itemInfo.price}
        </Typography>
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
            {featuredItems.map((featuredItem) => (
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
