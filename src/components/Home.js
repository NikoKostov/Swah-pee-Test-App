import React, { useState, useEffect } from 'react';
import Category from './Category'
import { Container, Card, Button, Col, Row } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

function Home({ state }) {

    console.log(state)

    const [iState, setIState] = useState();

    useEffect(() => {
        setIState(state)
    },[state])

    console.log(iState)
    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ width:'18rem' }} >
                        <Card.Body>
                            <Card.Title>Cat1</Card.Title>
                            <Card.Text>
                            Conut: {}
                            </Card.Text>
                            <Link 
                                to={{
                                    pathname: "/people",
                                }} 
                            >
                            <Button variant="primary">People</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width:'18rem' }} >
                        <Card.Body>
                            <Card.Title>Cat2</Card.Title>
                            <Card.Text>
                            Year of birh: 
                            </Card.Text>
                            <Link 
                                to={{
                                    pathname: "/planets",
                                }} 
                            >
                            <Button variant="primary">Planets</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
       

    )
}

export default Home
