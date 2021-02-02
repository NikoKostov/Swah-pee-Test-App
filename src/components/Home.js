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

function Home({ state: data }) {
    // Gets the data from prop and fill it in to Card component
    const render = (cat) => {
        const catName = cat.config.url.substring(cat.config.url.lastIndexOf('/') + 1)
        return (
            <Col key={cat.config.url}>
                <Card style={{ width:'20rem' }} >
                    <Card.Body>
                        <Card.Title>{catName.toUpperCase()}</Card.Title>
                        <Card.Text>
                            Count: {cat.data.count}
                        </Card.Text>
                        <Link 
                            to={{
                                pathname: "/category/" + catName,
                            }} 
                        >
                            <Button variant="primary">Show all {catName}</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    return (
        <Container>
            <Row>
                {data.map(entity => render(entity))}
            </Row>
        </Container>
       

    )
}

export default Home
