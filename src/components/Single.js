import React from 'react'
import { Container, Card, Button, CardDeck, Col } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function Single(props) {

    console.log(props);
    
    const { name } = useParams();
    
    console.log( name )
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

export default Single
