import React, { Component } from "react";
import HomePageTitle from "./HomePageTitle";
import Center from "react-center";
import PickUpButton from "./HomePageActionButtons/PickUpButton";
import DeliveryButton from "./HomePageActionButtons/DeliveryButton";
import background from "./background-photo.jpg";

class HomePage extends Component {
  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          top: 0,
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100%",
          position: "fixed",
        }}
      >
        <div style={{ paddingTop: "15%" }}>
          <Center>
            <HomePageTitle />
          </Center>
          <div
            style={{ display: "flex", paddingRight: "30%", paddingLeft: "30%" }}
          >
            <DeliveryButton />
            <div style={{ width: "10%" }}></div>
            <PickUpButton />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
