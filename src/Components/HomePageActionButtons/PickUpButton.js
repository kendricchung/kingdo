import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

class PickUpButton extends Component {
    state = {
        redirectToPickUp: false
    }

    constructor(props) {
        super(props);
        this.state = {
            redirectToPickUp: false
        }
    }

    handleRedirecToPickUp = () => {
        this.setState({ redirectToPickUp: true });
    }

    render() {
        if (this.state.redirectToPickUp) {
            return <Redirect push to="/pickup"/>
        }

        return (
            <Button
                fullWidth
                label="Submit"
                color="#808080"
                variant="contained"
                size="large"
                onClick={this.handleRedirecToPickUp}
                buttonStyle={{ borderRadius: 10 }}
                style={{ borderRadius: 10, fontSize: 20 }}
            >
                Pick Up
            </Button>
        );
    }
}
 
export default PickUpButton;