import React, { Component } from 'react';
import TopBar from "./TopBar";
import Menu from "./Menu/Menu";
import CartBar from "../Components/Cart/CartBar";

class HomePage extends Component {
    render() {
        return (
            <div style={{background: "#d6bf89"}}>
                <TopBar/>
                <Menu/>
                <CartBar/>
            </div>
        );
    }
}

export default HomePage;