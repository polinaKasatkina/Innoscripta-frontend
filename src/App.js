import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from './components/Navigation';
import Main  from './components/Main';
import Order from './components/Order';
import OrderComplete from './components/OrderComplete';
import OrderPlace from './components/OrderPlace';

import { CurrencyProvider } from "./components/context/currencyContext";


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: "USD"
        };

        this.toggleCurrency = this.toggleCurrency.bind(this);
    }

    toggleCurrency() {
        this.setState(state => ({
            currency: state.currency === "USD"
                ? "EUR"
                : "USD"
        }));

    };


    render() {
        return (

            <div className="container-fluid">
                <div className="row">
                    <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
                        <Router>
                            <CurrencyProvider>
                                <Navigation toggleCurrency={this.toggleCurrency}/>

                                <div className="main-content-container container-fluid px-4">
                                    <Switch>
                                        <Route path="/order-place">
                                            <OrderPlace />
                                        </Route>
                                        <Route path="/order-complete">
                                            <OrderComplete />
                                        </Route>
                                        <Route path="/order">
                                            <Order />
                                        </Route>
                                        <Route path="/">
                                            <Main />
                                        </Route>
                                    </Switch>
                                </div>
                            </CurrencyProvider>
                        </Router>
                    </main>
                </div>
            </div>

        );
    }

}
