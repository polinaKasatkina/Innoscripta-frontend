import React from "react";
import { CurrencyConsumer } from './currencyContext';

class CurrencyChange extends React.Component {
    render() {

        return (
            <CurrencyConsumer>
                { context => (
                    <select onChange={context.toggleCurrency}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    )

                }

            </CurrencyConsumer>
        );
    }
}

export default CurrencyChange;
