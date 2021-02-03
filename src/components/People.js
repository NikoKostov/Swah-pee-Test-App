import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, CardDeck, Col } from 'react-bootstrap'

function People() {

  const [ fullList, setFullList ] = useState([]);
  
  useEffect(() => {
    setFullList([]);
    async function fetchLoad() {
      axios
      .get('https://swapi.py4e.com/api/people')
      .then(res => {
        let count = res.data.count;
        let allPagesReq = [];
        let numOfPages = Math.ceil(count / 10);
        for (let i=1; i <= numOfPages; i++) {
          let singlePageReq = axios(`https://swapi.py4e.com/api/people?page=${i}`);
          allPagesReq.push(singlePageReq)
        }
        return axios.all(allPagesReq)
      })
      .then(allReq => allReq.map( sinRes => setFullList(state => [...state, ...sinRes.data.results])))
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
        <Container > 
          <CardDeck>
            {fullList.map(entity =>  render(entity))}
          </CardDeck>
        </Container>
    );
 
}

export default People;