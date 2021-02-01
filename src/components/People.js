import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap'

function People() {

  let [ fullList, setFullList ] = useState([]);
  
  useEffect(() => {
    setFullList([]);
    async function fetchLoad() {
      axios
      .get('https://swapi.py4e.com/api/planets')
      .then(res => {
        let count = res.data.count;
        let allPagesReq = [];
        let numOfPages = Math.ceil(count / 10);
        for (let i=1; i <= numOfPages; i++) {
          let singlePageReq = axios(`https://swapi.py4e.com/api/planets?page=${i}`);
          allPagesReq.push(singlePageReq)
        }
        return axios.all(allPagesReq)
      })
      .then(allReq => allReq.map( sinRes => setFullList(state => [...state, ...sinRes.data.results])))
    }
    fetchLoad();
  }, []);
  console.log(fullList)
    return (
        <Container>
            {fullList.map(item => ( 
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{ item.name }</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
 
}

export default People;
