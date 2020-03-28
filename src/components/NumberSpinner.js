import React, { Component } from 'react';
import { Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';

export default class NumberSpinner extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(e) {

        let newValue = e.currentTarget.dataset.dir !== undefined
            ?
            e.currentTarget.dataset.dir === 'up'
                ? this.props.quantity + 1
                : this.props.quantity - 1
            : e.target.value;

        this.props.updateCart(this.props.product, newValue);

    }

    render() {

        return (
            <Row>
                <Col md={4}>Qty: </Col>
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend >
                            <Button variant="outline-secondary" onClick={this.inputChange} data-dir="dwn">-</Button>
                        </InputGroup.Prepend>
                        <FormControl className="text-center" type="text" value={this.props.quantity}
                                     onChange={this.inputChange}/>
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.inputChange} data-dir="up">+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>


        )
    }

}
