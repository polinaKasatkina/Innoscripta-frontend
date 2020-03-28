import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import YourOrder from './YourOrder';
import Product from './Product';

import CartPersister from '../classes/CartPersister';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: {},
            cart: [],
            totals : 0
        };

        this.cartPersister = new CartPersister();

        this.addToCart = this.addToCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.calculateTotals = this.calculateTotals.bind(this);
    }

    addToCart(product, newValue = null) {

        var index = this.state.cart.findIndex(x=> x.id === product.id);

        if (index !== -1) {

            let updatedQuantity = newValue !== null ? newValue : this.state.cart[index].quantity;

            if (updatedQuantity <= 0) {
                this.removeItem(product);
                return;
            }

            this.setState({
                cart: [
                    ...this.state.cart.slice(0,index),
                    Object.assign({}, this.state.cart[index], {quantity: updatedQuantity}),
                    ...this.state.cart.slice(index+1)
                ]
            }, () => this.cartPersister.saveCart(this.state.cart));

        } else {

            let cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            };

            let cart = this.state.cart;
            cart.push(cartItem);

            this.setState({
                cart: cart
            });

        }

        this.cartPersister.saveCart(this.state.cart);
        this.calculateTotals();

    }

    removeItem(product) {

        var array = [...this.state.cart]; // make a separate copy of the array
        var index = this.state.cart.findIndex(x=> x.id === product.id);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({
                cart: array
            },() => this.cartPersister.saveCart(this.state.cart));
        }
        this.calculateTotals();

    }


    calculateTotals() {

        let total = 0;

        if (this.state.cart.length > 0) {

            this.state.cart.forEach((cartItem) => {

                total += cartItem.price * cartItem.quantity;

            });

        }

        this.setState({
           totals: total
        });
    }


    componentDidMount() {
        fetch('http://localhost:8000/api/allProducts', {
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

        this.cartPersister.restoreCart().then(cart => {
            this.setState({
                cart : cart
            }, () => this.calculateTotals());
        });

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={8}>

                        <Row>

                            {this.state.products.length && this.state.products.map((product, i) => {

                                var index = this.state.cart.findIndex(x=> x.id === product.id);
                                let quantity = index !== -1 ? this.state.cart[index].quantity : 0;

                                return <Product key={i}
                                                product={product}
                                                order={true}
                                                addToCart={this.addToCart}
                                                quantity={quantity}
                                                />
                            })}

                        </Row>

                    </Col>
                    <YourOrder cart={this.state.cart} removeItem={this.removeItem} updateCart={this.addToCart} total={this.state.totals} />
                </Row>
            </Container>
        );
    }
}

export default Order;
