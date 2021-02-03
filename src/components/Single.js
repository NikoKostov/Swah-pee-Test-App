import axios from 'axios';
import React, { useState, useEffect }  from 'react'
import { Card } from 'react-bootstrap'
function Single() {

    const [ entInfo, setEntInfo ] = useState([]);


    // Takes a API link to current entity from Link element reformat it and put in the state
    let entLink = "https://" + window.location.href.substring(window.location.href.indexOf("swapi"));

    useEffect(() => {
        axios
        .get(entLink)
        .then(res => {
            let entArr = Object.entries(res.data)
            setEntInfo(entArr)})
        .catch(err => console.log(err))
        
    }, [entLink])
    

    //Renders entity info
    const render = () => {
        const infoList = []
        const inf = () => { 
            for ( let i = 1; i <= 7; i++ ) {
                infoList.push(entInfo[i] ? 
                <div className="d-flex justify-content-around">
                    <h4 className="m-0">
                        <span className="badge badge-primary">
                            {entInfo[i][0].charAt(0).toUpperCase() + entInfo[i][0].slice(1).split('_').join(' ') + ' :'}
                        </span>
                    </h4>
                    <h5 >
                        <span className="bg-warning badge badge-info text-dark">{entInfo[i][1]}</span>
                    </h5>
                </div>
                : "loading..." )
            }
        }
        inf()
        return (
            
        <Card style={{ width: '30rem' }}>
            <Card.Header > <h2 className="text-primary">{entInfo[0] ? entInfo[0][1]: "loading..."}</h2></Card.Header>
            <Card.Body>
                    {infoList.map((item, index) => <span key={index} >{ item }<br/></span>)}
            </Card.Body>
          </Card>
            
        )
    }
    
    return (
        <div className="d-flex justify-content-center mt-4">
                {render()}
        </div>
    )
}

export default Single
