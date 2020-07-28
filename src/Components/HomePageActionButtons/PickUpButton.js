import React, { Component } from 'react';
import Button from "@material-ui/core/Button";

class PickUpButton extends Component {
    state = {  }
    render() { 
        return (
            <Button
                fullWidth
                label="Submit"
                color="primary"
                variant="contained"
                size="large"
                buttonStyle={{ borderRadius: 10 }}
                style={{ borderRadius: 10, fontSize: 20 }}
            >
                Pick Up
            </Button>
        );
    }
}
 
export default PickUpButton;