import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Container
} from 'react-bootstrap';

import CurrencyChange from './context/CurrencyChange';


export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currency : "USD"
        };

        this.toggleCurrency = this.toggleCurrency.bind(this);
    }

    toggleCurrency() {
        this.setState(state => ({
            currency:
                state.currency === "USD"
                    ? "EUR"
                    : "USD"
        }));

    };

    render() {
        return (
            <div>
                <Navbar bg="light" expand="md">
                    <Container>
                        <Navbar.Brand href="#home">Best Pizza</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/order">Order</Link>
                            </Nav>
                        </Navbar.Collapse>

                            <CurrencyChange toggleCurrency={this.props.toggleCurrency} />
                    </Container>
                </Navbar>
            </div>
        );
    }
}
