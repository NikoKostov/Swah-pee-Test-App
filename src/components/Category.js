import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, CardDeck, Col } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function Category() {

  const [ fullList, setFullList ] = useState([]);

  const { name } = useParams();

  useEffect(() => {
    setFullList([]);
    async function fetchLoad() {
      axios
      .get(`https://swapi.py4e.com/api/${name}`)
      .then(res => {
        let count = res.data.count;
        let allPagesReq = [];
        let numOfPages = Math.ceil(count / 10);
        for (let i=1; i <= numOfPages; i++) {
          let singlePageReq = axios(`https://swapi.py4e.com/api/${name}?page=${i}`);
          allPagesReq.push(singlePageReq)
        }
        return axios.all(allPagesReq)
      })
      .then(allReq => allReq
        .map( sinRes => setFullList(state => [...state, ...sinRes.data.results])))
    }
    fetchLoad();
  }, []);


  console.log(fullList)


  let render = (item) => {
    return (
        <Col className="container-fluid mt-4" key={item.name}>
          <Card style={{ width:'18rem' }} >
              <Card.Body>
                  <Card.Title>{ item.name }</Card.Title>
                  <Card.Text>
                  Year of birh: {item.birth_year}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
              </Card.Body>
          </Card>
        </Col>
    )
       
  }
    return (
        <Container>
          <h1>{ name }</h1> 
          <CardDeck>
            
            {fullList.map(entity =>  render(entity))}
          </CardDeck>
        </Container>
    );
 
}

export default Category;