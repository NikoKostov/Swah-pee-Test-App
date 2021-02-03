import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, CardDeck, Col } from 'react-bootstrap'
import { Link, useParams} from 'react-router-dom';
import { Pagination } from './Pagination';
function Category() {

  const [ fullList, setFullList ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ entsPerPage] = useState(9);
  
  const { name } = useParams();

  useEffect(() => {
    setFullList([]);
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
    
  }, [name]);

  const lastEntIndex = currentPage * entsPerPage;
  const firstEntIndex = lastEntIndex - entsPerPage;
  const currentEnts = fullList.slice(firstEntIndex, lastEntIndex);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  let render = (item) => {
    return (
        <Col md="4" key={item.name}>
          <Card className="mt-4">
              <Card.Body>
                  <Card.Title className="jedi-font">{ item.name }</Card.Title>
                  <Link 
                    to={{
                      pathname: "/single/" + item.url.replace(/(^\w+:|^)\/\//, ''),
                      state: { data: item },
                    }}>
                    <Button variant="primary" className="float-right">Details</Button>
                  </Link>
              </Card.Body>
          </Card>
        </Col>
    )
  }
    return (
      <>  
        <div className="d-flex justify-content-center p-0">
          {loading ? <h3 className="text-light bg-primary text-wrap p-2 mt-5">Loading...</h3> : <h1 className="text-primary mt-3"> { name.toUpperCase() }</h1> }
        </div>
          <CardDeck> 
              {currentEnts.map(entity =>  render(entity))}
          </CardDeck>
          <Pagination entsPerPage={entsPerPage} totalEnts={fullList.length} paginate={paginate}/>
      </>
    );
      
}

export default Category;