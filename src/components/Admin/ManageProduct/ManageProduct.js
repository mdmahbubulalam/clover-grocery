import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const ManageProduct = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=> {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    const history = useHistory();
    const handleAddProduct = () => {
        history.push(`/addProduct`);
    }
    const handleManageProduct = () => {
        history.push(`/manageProduct`);
    }
    
    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/delete/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(result => {
            history.push(`/`);
        })
    }
    return (
        <div className="container">
             <div className="d-flex justify-content-center">
                <button className="btn btn-success mr-3" onClick={handleAddProduct}>Add Product</button>
                <button className="btn btn-info" onClick={handleManageProduct}>Manage Product</button>
            </div>
            <table class="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            products.map(product => 
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.weight}</td>
                                <td>{product.price}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>Delete</button></td>
                            </tr>
                                
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProduct;