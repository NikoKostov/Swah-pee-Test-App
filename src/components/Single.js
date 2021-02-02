import axios from 'axios';
import React, { useState, useEffect }  from 'react'

function Single() {

    const [ entInfo, setEntInfo ] = useState([]);


    // Takes a API link to current entity from Link element and reformat it and put in state
    let entLink = "https://" + window.location.href.substring(window.location.href.indexOf("swapi"));

    useEffect(() => {

        axios
        .get(entLink)
        .then(res => {
            let entArr = Object.entries(res.data)
            setEntInfo(entArr)})
        .catch(err => console.log(err))
        
    }, [entLink])
    
    //TODO style the page


    //Renders entity info
    let render = (item) => {
        return (
            
            <li className="list-group-item" key={item[0]}> {`${item[0]}: ${item[1]}`} </li>
            
        )
    }
    
    return (
        <div>
            <ul className="list-group">
                {entInfo.map(entity =>  render(entity))}
            </ul>
        </div>
    )
}

export default Single
