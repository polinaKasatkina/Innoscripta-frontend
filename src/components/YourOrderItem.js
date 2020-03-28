import React, { Component } from 'react';
import { Row, Image } from 'react-bootstrap';

import NumberSpinner from './NumberSpinner';
import Price from './context/Price';

export default class YourOrderItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li>
                <Row>

                    <span className="remove-item"
                          onClick={() => this.props.removeItem(this.props.item)}>x
                    </span>

                    <Image src={'/images/' + this.props.item.name.toLowerCase().replace(/ /g, '-') + '.jpg'} fluid
                           rounded/>
                    <div className="your-order-item">
                        <Row>
                            <p className="your-order-item--title">{this.props.item.name}</p>
                            <Price price={this.props.item.price} />
                        </Row>
                        <NumberSpinner quantity={this.props.item.quantity} updateCart={this.props.updateCart}
                                       product={this.props.item}/>
                    </div>



                </Row>

            </li>
        );
    }
}
