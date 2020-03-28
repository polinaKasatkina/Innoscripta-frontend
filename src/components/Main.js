import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import Product from './Product';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products : {}
        };
    }


    componentDidMount() {

        fetch('http://localhost:8000/api/getRandProducts', {
            method: 'GET'
        })
            .then(response => {

                return response.json();
            })
            .then(data => {

                this.setState({
                    products: data
                });

            });

    }


    render() {
        return (
            <Container className="main-page-container">
                <h2>Our popular menu items</h2>
                <Row>
                {this.state.products.length && this.state.products.map((product, i) => {
                    return <Product key={i} product={product} keyItem={i} />
                })}
                </Row>
            </Container>
        );
    }
}
