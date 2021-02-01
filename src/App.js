import './App.css';
import React, { useState, useEffect } from 'react';
import Category from './components/Category'
import Home from './components/Home'
import People from './components/People'
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
  
  useEffect(() => {
    const categories = ["people", "planets"];
    let catReqs = []
    for (let i in categories) {
      catReqs.push(axios(`https://swapi.py4e.com/api/${categories[i]}`))
    }
    axios
    .all(catReqs)
    .then(axios.spread((people, planets) => {
      setcatData(state => [...state, people])
      setcatData(state => [...state, planets])

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
            <li>
              <Link to="/planets">Planets</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home state={catData}/>
          </Route>
          <Route path="/:name">
            <Category />
          </Route>
          <Route path="/people">
            <People />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
