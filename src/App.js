import './App.css';
import React, { useState, useEffect } from 'react';
import Category from './components/Category'
import Home from './components/Home'
import Single from './components/Single'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {

  const [catData, setcatData] = useState([]);
  
  // Gets first page of the categories and store them in state which is passed as prop to the Home component //
  
  useEffect(() => {  
    const categories = ["people", "planets"];
    let catReqs = []
    for (let i in categories) {
      catReqs.push(axios(`https://swapi.py4e.com/api/${categories[i]}`))
    }
    axios
    .all(catReqs)
    .then(axios.spread((catOne, catTwo) => {
      setcatData(state => [...state, catOne])
      setcatData(state => [...state, catTwo])
    }))
    .catch(err => console.log(err))

  },[])

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch> 
          <Route exact path="/">
            <Home state={catData}/>
          </Route>
          <Route path="/category/:name">
            <Category />
          </Route>
          <Route path="/single/:name">
            <Single />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
