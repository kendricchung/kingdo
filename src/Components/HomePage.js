import React, { Component } from 'react';
import HomePageTitle from "./HomePageTitle";
import Center from "react-center";
import PickUpButton from "./HomePageActionButtons/PickUpButton";
import DeliveryButton from "./HomePageActionButtons/DeliveryButton";

class HomePage extends Component {
    render() {
        return (
            <Center>
                <div style={{width: "100%", height: "100%"}}>
                    <HomePageTitle/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingRight: "30%", paddingLeft: "30%"}}>
                        <DeliveryButton/>
                        <div style={{width: "10%"}}></div>
                        <PickUpButton/>
                    </div>
                </div>
            </Center>
        );
    }
}

export default HomePage;