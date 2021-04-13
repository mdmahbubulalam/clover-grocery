import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const AddProduct = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL,setImageURL] = useState(null);
    const onSubmit = data => {
        const eventData = {
            name: data.name,
            price:data.price,
            weight:data.weight,
            imageURL:imageURL
        }
        const url = `https://stormy-thicket-58401.herokuapp.com/addProduct`
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then (res => {
            history.push(`/`);
        })
    
};
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key','5ec90382132c3cc1482448c4c48cc5dd');
        imageData.append('image',event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    const history = useHistory();
    const handleAddProduct = () => {
        history.push(`/addProduct`);
    }
    const handleManageProduct = () => {
        history.push(`/manageProduct`);
    }
    return (
        <div className="container">
             <div className="d-flex justify-content-center">
                <button className="btn btn-success mr-3" onClick={handleAddProduct}>Add Product</button>
                <button className="btn btn-info" onClick={handleManageProduct}>Manage Product</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="mt-5">Product Name</label>
                <input type="text" name="name" {...register("name")} className="form-control" id="productName"  placeholder="Enter Product name"/>
                <label className="mt-2">Add Price</label>
                <input type="number" name="price" {...register("price")} className="form-control" id="addPrice" placeholder="Enter Product Price"/>
                <label className="mt-2">Add Weight</label>
                <input type="text" name="weight" {...register("weight")} className="form-control" id="addWeight" placeholder="Enter Product Weight"/>
                <input type="file" className="form-control mt-2" onChange={handleImageUpload} />
                <input className="btn btn-success mt-2" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;