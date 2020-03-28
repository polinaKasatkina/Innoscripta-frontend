import React, { Component }  from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';


export default class OrderForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            email : '',
            phone : '',
            address : ''
        };

        this.validator = new SimpleReactValidator();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(e) {

        this.setState({
           [e.target.name] : e.target.value
        });

    }

    onSubmit(e) {

        e.preventDefault();

        if (this.validator.allValid()) {

            this.props.saveOrder(e);

        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="First name" name="first_name" onChange={this.handleInputChange}  />
                                {this.validator.message('first_name', this.state.first_name, 'required|string|max:128')}
                            </Col>
                            <Col>
                                <Form.Control placeholder="Last name" name="last_name" onChange={this.handleInputChange} />
                                {this.validator.message('last_name', this.state.last_name, 'required|string|max:128')}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="Email" name="email" onChange={this.handleInputChange} />
                                {this.validator.message('email', this.state.email, 'required|email')}
                            </Col>
                            <Col>
                                <Form.Control placeholder="Phone" name="phone" onChange={this.handleInputChange} />
                                {this.validator.message('phone', this.state.phone, 'required|phone')}
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="Address" name="address" onChange={this.handleInputChange} />
                                {this.validator.message('address', this.state.address, 'required|string')}
                            </Col>
                        </Form.Row>
                        <Button variant="dark" type="submit" className="pull-right">
                            Confirm order
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}
