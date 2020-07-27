import React, { Component } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

class CarBar extends Component {
    state = {
        numberOfItemsInCart: 0,
        totalPaymentAmount: 0.00
    }

    render() { 
        return (
            <div style={{
                backgroundColor: "white",
                textAlign: "center",                
                paddingBottom: "2%",
                position: "fixed",
                left: "0",
                bottom: "0",
                height: "4%",
                width: "100%",
                boxShadow: "0px -1px 3px rgba(50, 50, 50, 0.50)"
            }}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{display: "flex", alignItems: "center", paddingLeft: "1%", fontSize: 20}}>
                            <ShoppingCartIcon fontSize="large"/>
                            <h4 style={{paddingLeft: "10%"}}>{this.state.numberOfItemsInCart}</h4>
                        </div>
                        <div style={{paddingRight: "1%", fontSize: 20}}>Total Amount: ${this.state.totalPaymentAmount}</div>
                    </div>
            </div>
        );
    }
}
 
export default CarBar;