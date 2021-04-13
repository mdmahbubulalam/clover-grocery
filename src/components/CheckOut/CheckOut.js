import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';

const CheckOut = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {id} = useParams();
    const [products,setProducts] = useState([]);
    useEffect(()=> {
        fetch('https://stormy-thicket-58401.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    const product = products.find(product => product._id === id);

    const history = useHistory();
    const handleCheckOut = () => {
        history.push(`/orders`);
    }

    const onSubmit = data => {
        const orderData = {
            email: loggedInUser.email,
            productName: product?.name,
            productWeight: product?.weight,
            productPrice:product?.price,
            date: new Date().toDateString('dd/mm/yyyy')
        }

        const url = `https://stormy-thicket-58401.herokuapp.com/addOrder`
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(res => {
            history.push(`/orders`)
        })
    }
    
    return (
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product?.name}</td>
                        <td>{product?.weight}</td>
                        <td>TK.{product?.price}</td>
                    </tr>
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <button type="submit" className="btn btn-success" >Check Out</button>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;