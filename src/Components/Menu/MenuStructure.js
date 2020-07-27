import React, { Component } from 'react';
import MenuItem from "./MenuItem";
import Grid from '@material-ui/core/Grid';

class MenuStructure extends Component {

    formGrid = () => {
        // should do a map here and do some calculations based on the list of items
        return (
            <div style={{display: "flex", justifyContent: "space-between", padding: "2%"}}>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
            </div>
        );
    }

    render() { 
        return (
            <div>
                {this.formGrid()}
                {this.formGrid()}
                {this.formGrid()}
            </div>
        );
    }
}
 
export default MenuStructure;