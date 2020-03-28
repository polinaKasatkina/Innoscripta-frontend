import React, { Component }  from 'react';
import { Container, Row, Col, Table, Image, Alert } from 'react-bootstrap';

import OrderForm from './OrderForm';
import Price from './context/Price';

import CartPersister from '../classes/CartPersister';

export default class OrderPlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            errorMessage : ''
        };

        this.cartPersister = new CartPersister();

        this.saveOrder = this.saveOrder.bind(this);
    }

    componentDidMount() {
        this.cartPersister.restoreCart().then(cart => {
            this.setState({
                cart : cart
            });
        });
    }

    saveOrder(e) {
        e.preventDefault();

        const form = e.target;
        const data = new FormData(form);

        data.append('cart', JSON.stringify(this.state.cart));

        fetch('http://localhost:8000/api/order/save', {
            method: 'POST',
            body: data
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                 if (data.status === 'success') {
                     window.location.href = "/order-complete"
                 } else {
                     this.setState({
                        errorMessage: 'Something gone wrong. Try again later.'
                     });

                     localStorage.removeItem('cart');
                 }
            });

    }

    render() {

        let total = 0;

        return (
            <Container className="order-place-container">
                <Row>
                    <Col md={12}>
                        <h2>Your order</h2>

                        {this.state.cart.length > 0 ?
                            <Table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.cart.map((cartItem, i) => {

                                        total += (cartItem.price * cartItem.quantity);

                                    return <tr key={i}>
                                        <td>
                                            <Image
                                                src={'/images/' + cartItem.name.toLowerCase().replace(/ /g, '-') + '.jpg'}
                                                fluid
                                                rounded/>
                                        </td>
                                        <td>{cartItem.name}</td>
                                        <td>{cartItem.quantity}</td>
                                        <td><Price price={cartItem.price} /></td>
                                        <td>{cartItem.price * cartItem.quantity}</td>
                                    </tr>
                                })}
                                <tr>
                                    <th colSpan="4" className="text-right">Delivery:</th>
                                    <td><Price price={10} /></td>
                                </tr>
                                <tr>
                                    <th colSpan="4" className="text-right">Total:</th>
                                    <td><Price price={total + 10} /></td>
                                </tr>
                                </tbody>

                            </Table>
                            : <p>Your cart is empty. Go to <a href="/order">order page</a>.</p>
                        }

                    </Col>
                </Row>
                {this.state.errorMessage ? <Alert variant="danger">
                    {this.state.errorMessage}
                </Alert> : null}
                <OrderForm saveOrder={this.saveOrder} />
            </Container>
        );
    }
}
