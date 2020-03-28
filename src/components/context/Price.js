import React, { Component } from "react";
import { CurrencyConsumer } from './currencyContext';

class Price extends Component {
    render() {

        return (
            <CurrencyConsumer>
                {({ currency, usdToEuro }) => (
                    <p className="menu-item-container--price your-order-item--price">{currency === "USD" ? "$" + this.props.price : "\u20AC" + (this.props.price * usdToEuro).toFixed(1)  }</p>
                )}
            </CurrencyConsumer>

        );
    }
}

export default Price;
