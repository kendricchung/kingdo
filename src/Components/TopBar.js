import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import RoomIcon from '@material-ui/icons/Room';
import Box from '@material-ui/core/Box';

class TopBar extends Component {
    render() {
        return (
            <Box boxShadow={2}>
                <div style={{
                        display: "flex", 
                        justifyContent: "space-between", 
                        backgroundColor: "white",
                        alignItems: "center"
                    }}>
                    <div style={{paddingLeft: "40px"}}>
                            <h2>OPEN FOR TAKE OUT</h2>
                            <h3>Payment is accepted upon pickup</h3>
                        </div>
                    <Button style={{ backgroundColor: "transparent"}} disableRipple={true}>
                        <div>
                            <h1>LOGO</h1>
                            <h3>Kingdo Restaurant</h3>
                        </div>
                    </Button>
                    <div style={{display: "flex", paddingRight: "40px", alignItems: "center"}}>
                        <div style={{paddingRight: "20px"}}>
                            <h3>7789999999</h3><h3>7789999997</h3>
                        </div>
                        <IconButton>
                            <RoomIcon></RoomIcon>
                        </IconButton>
                    </div>
                </div>
            </Box>
        );
    }
}

export default TopBar;