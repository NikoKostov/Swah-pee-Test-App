import './App.css';
import React, { useState, useEffect } from 'react';
import Planets from './components/Planets'
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
    .then(allReq => allReq
      .map(sinRes => setcatData(state => [...state, sinRes])))
    .catch(err => console.log(err))

  },[])
  console.log(catData)
  
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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/planets">
            <Planets />
          </Route>
          <Route path="/people">
            <People />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
