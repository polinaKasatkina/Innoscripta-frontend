import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import YourOrderItem from './YourOrderItem';
import Price from './context/Price';

export default class YourOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        let cart = this.props.cart;

        return (
            <Col md={4}>
                <div className="your-order-block">
                    <p className="your-order-block--title">Your order</p>
                    {cart.length > 0 && (
                        <ul className="your-order-block--list">
                            {cart.map((cartItem, i) => {
                                return <YourOrderItem key={i} item={cartItem}
                                                      removeItem={this.props.removeItem}
                                                      updateCart={this.props.updateCart}/>
                            })}
                        </ul>
                    )}


                    {this.props.total > 0 && (
                        <Row>
                            <Col md={12}>
                                <div className="text-right"><strong>Delivery: </strong><Price price={10}/></div>
                            </Col>
                            <Col md={12}>
                                <div className="text-right"><strong>Total: </strong><Price price={this.props.total + 10}/>
                                </div>
                            </Col>
                        </Row>
                    )}
                    <div className="text-right">
                        <Link className="btn btn-dark" to="/order-place">Place order</Link>
                    </div>
                </div>
            </Col>
        );
    }
}
