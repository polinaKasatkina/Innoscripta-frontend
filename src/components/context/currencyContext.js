import React, { Component } from "react";

const CurrencyContext = React.createContext();

class CurrencyProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: "USD",
            usdToEuro : 0
        };

        this.toggleCurrency = this.toggleCurrency.bind(this);
        this.getCurrencyCourse = this.getCurrencyCourse.bind(this);
    }

    componentDidMount() {

        this.getCurrencyCourse();

    }

    toggleCurrency() {
        this.setState(prevState => {
            return {
                currency: prevState.currency === "USD" ? "EUR" : "USD"
            };
        });
    }

    getCurrencyCourse() {


        fetch('https://api.exchangeratesapi.io/latest?base=USD', {
            method: 'GET'
        })
            .then(response => {

                return response.json();
            })
            .then(data => {

                this.setState({
                    usdToEuro: data.rates.EUR
                });

            });

    }

    render() {
        return (
            <CurrencyContext.Provider
                value={{
          currency: this.state.currency,
          toggleCurrency: this.toggleCurrency,
          usdToEuro : this.state.usdToEuro
        }}
            >
                {this.props.children}
            </CurrencyContext.Provider>
        )
    }
}

const CurrencyConsumer = CurrencyContext.Consumer;

export { CurrencyProvider, CurrencyConsumer, CurrencyContext }
