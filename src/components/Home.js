import { Card, Button, Row } from 'react-bootstrap'
import { Link, } from "react-router-dom";

function Home({ state: data }) {
    // Gets the data from prop and fill it in to Card component
    const render = (cat) => {
        const catName = cat.config.url.substring(cat.config.url.lastIndexOf('/') + 1)
        return (
                <Card style={{ width:'14rem' }} className="m-4" key={catName}>
                    <Card.Body >
                        <Card.Title className="text-primary">{catName.toUpperCase()}</Card.Title>
                        <Card.Text>
                            Number of items: {cat.data.count}
                        </Card.Text>
                        <Link 
                            to={{ //Sends category name via the Link 
                                pathname: "/category/" + catName,
                            }} 
                        >
                            <Button variant="primary" className="float-right">Show all {catName}</Button>
                        </Link>
                    </Card.Body>
                </Card>
        )
    }

    return (
            <Row className="d-flex justify-content-center">
                {data.map(entity => render(entity))}
            </Row>
    )
}

export default Home
