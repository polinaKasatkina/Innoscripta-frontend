import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Price from './context/Price';


import NumberSpinner from './NumberSpinner';

class Product extends Component {

    render() {

        let btnBlock = '';

        if (this.props.keyItem && this.props.keyItem === 4) {
            btnBlock = <Col md={4}>
                <div className="main-text">
                <p>Create your order right now</p>
                <Link className="btn btn-dark" to="/order">Order now!</Link>
                </div>
            </Col>
        }

        return (
            <React.Fragment>
                {btnBlock}
                <Col md={4}>
                    <div className="menu-item-container">
                        <Image src={'/images/' + this.props.product.name.toLowerCase().replace(/ /g, '-') + '.jpg'} fluid rounded/>
                        <p className="menu-item-container--name">{this.props.product.name}</p>
                        <p className="menu-item-container--desc">{this.props.product.description}</p>
                        <Row>
                            <Col md={6}>
                                <Price price={this.props.product.price} />
                            </Col>
                            <Col md={6} className="text-right">
                                <span className={"menu-item-container--category " + this.props.product.category.name.toLowerCase()}>{this.props.product.category.name}</span>
                            </Col>
                        </Row>
                        {
                            this.props.order
                            ? this.props.quantity === 0
                                ? <button className="btn btn-dark  btn-block btn-lg" onClick={() => this.props.addToCart(this.props.product)}>Add to
                                    Cart</button>
                                : <NumberSpinner quantity={this.props.quantity} updateCart={this.props.addToCart} product={this.props.product} />
                            : null
                        }
                    </div>
                </Col>
            </React.Fragment>
        )
    }

}

//Product.contextType = currencyContextConsumer;

export default Product;
