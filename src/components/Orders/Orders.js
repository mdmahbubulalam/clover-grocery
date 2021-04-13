import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders,setOrders] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/orders?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrders(data))
    } ,[])
    return (
        <div>
            <p>You have ordered {orders.length} product. Your email address is - <b>{loggedInUser.email}</b></p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Weight</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Order Date</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orders.map(order => 
                        <tr>
                            <td>{order.productName}</td>
                            <td>{order.productWeight}</td>
                            <td>TK.{order.productPrice}</td>
                            <td>{order.date}</td>
                        </tr>
                    )
                }
                    
                </tbody>
            </table>
            
        </div>
    );
};

export default Orders;