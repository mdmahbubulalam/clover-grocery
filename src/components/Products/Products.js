import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Products = (props) => {
    const history = useHistory();
    const handleBuyNow = (id) => {
        history.push(`/checkOut/${id}`);
    }
    return (
        <div className="col-md-4 mt-3 mb-3">
        {/* <h3>{event.name} <button onClick={() => deleteEvent(event._id)}>Delete</button></h3>    */}
            <Card className="text-center">
                <Card.Header>
                    <Card.Img variant="top" className="" src= {props.product.imageURL}/>
                </Card.Header>
                <Card.Text className="mb-3 mt-1">
                    <p className="font-weight-bold">{props.product.name} - {props.product.weight}</p>
                    <span className="font-weight-bold text-success">TK.{props.product.price}</span> <button style={{ marginLeft: '100px' }} className="btn btn-success btn-sm" onClick={() => handleBuyNow(props.product._id)}>Buy Now</button>
                </Card.Text>
            </Card>
        </div>
    );
};

export default Products;