import React, { Component }  from 'react';
import { Container, Row, Col, Jumbotron  } from 'react-bootstrap';


export default class OrderComplete extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={8}>
                            <Jumbotron fluid>
                                <Container>
                                    <h1>Thank you for your order!</h1>
                                    <p>
                                        Hope to see you soon.
                                    </p>
                                </Container>
                            </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    }
}
