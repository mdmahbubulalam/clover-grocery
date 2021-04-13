import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Home.css';
const Home = () => {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
    },[])
    return (
        <>
          {
            loading 
            ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only pr-5">Loading...</span>
                </div>
            </div> 
            :    
            <div className="row">
                {
                    products.map(product =><Products product={product}></Products>)
                }
            </div>
        }
        </>
    );
};

export default Home;