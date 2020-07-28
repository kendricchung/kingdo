import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

class DeliveryButton extends Component {
    state = {
        redirectToDelivery: false
    }

    constructor(props) {
        super(props);
        this.state = {
            redirectToDelivery: false
        }
    }

    handleRedirecToDelivery = () => {
        this.setState({ redirectToDelivery: true });
    }

    render() {
        if (this.state.redirectToDelivery) {
            return <Redirect push to="/delivery"/>
        }

        return (
            <Button
                fullWidth
                label="Submit"
                color="#808080"
                variant="contained"
                size="large"
                onClick={this.handleRedirecToDelivery}
                buttonStyle={{ borderRadius: 10 }}
                style={{ borderRadius: 10, fontSize: 20 }}
            >
                Delivery
            </Button>
        );
    }
}
 
export default DeliveryButton;