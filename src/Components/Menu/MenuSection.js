import React, { Component } from 'react';
import MenuStructure from "./MenuStructure";

class MenuSection extends Component {
    render() { 
        return (
            <div>
                <h2 style={{paddingLeft: "2%"}}>Section title</h2>
                <MenuStructure/>
            </div>
            
        );
    }
}
 
export default MenuSection;