import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, CardDeck, Col } from 'react-bootstrap'
import { Link, useParams} from 'react-router-dom';
import { Pagination } from './Pagination';
function Category() {

  const [ fullList, setFullList ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ entsPerPage, setEntsPerPage ] = useState(6);
  
  const { name } = useParams();

  useEffect(() => {
    
    setFullList([]);
    async function fetchLoad() {
      setLoading(true);
      axios
      .get(`https://swapi.py4e.com/api/${name}`)
      .then(res => {
        let count = res.data.count;
        let allPagesReq = [];
        let numOfPages = Math.ceil(count / 10);
        for (let i = 1; i <= numOfPages; i++) {
          let singlePageReq = axios(`https://swapi.py4e.com/api/${name}?page=${i}`);
          allPagesReq.push(singlePageReq)
        }
        return axios.all(allPagesReq)
        
      })
      .then(allReq => allReq
        .map(sinRes => setFullList(state => [...state, ...sinRes.data.results])))
      .then(() => setLoading(false))
      .catch(err => console.log(err))
    }
    
    fetchLoad();
  }, [name]);

  const lastEntIndex = currentPage * entsPerPage;
  const firstEntIndex = lastEntIndex - entsPerPage;
  const currentEnts = fullList.slice(firstEntIndex, lastEntIndex);

  console.log(fullList.length)
  const paginate = (pageNum) => setCurrentPage(pageNum);

  let render = (item) => {
    return (
        <Col className="container-fluid mt-4" key={item.name}>
          <Card style={{ width:'18rem' }} >
              <Card.Body>
                  <Card.Title>{ item.name }</Card.Title>
                  <Link 
                    to={{
                      pathname: "/single/" + item.url.replace(/(^\w+:|^)\/\//, ''),
                      state: { data: item },
                    }} 
                  >
                    <Button variant="primary"> Details {}</Button>
                  </Link>
              </Card.Body>
          </Card>
        </Col>
    )
  }
    return (
        <Container>
          {loading ? <p>Loading...</p> : <h1 className="text-primary"> { name.toUpperCase() }</h1> }
          <CardDeck>
            {currentEnts.map(entity =>  render(entity))}
          </CardDeck>
          <Pagination entsPerPage={entsPerPage} totalEnts={fullList.length} paginate={paginate}/>
        </Container>
    );
      
}

export default Category;