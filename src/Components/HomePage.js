import React, { Component } from 'react';
import TopBar from "./TopBar";
import Menu from "./Menu/Menu";

class HomePage extends Component {
    render() {
        return (
            <div style={{background: "#d6bf89"}}>
                <TopBar/>
                <Menu/>
            </div>
        );
    }
}

export default HomePage;