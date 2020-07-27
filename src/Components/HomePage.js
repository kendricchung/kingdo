import React, { Component } from 'react';
import TopBar from "./TopBar";

class HomePage extends Component {
    render() {
        return (
            <div style={{background: "#d6bf89"}}>
                <TopBar></TopBar>
                <h1>Hello World!</h1>
            </div>
        );
    }
}

export default HomePage;