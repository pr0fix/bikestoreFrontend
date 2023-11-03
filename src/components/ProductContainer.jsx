import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Productcontainer() {

    const [productList, setProductList] = useState([]);
    const REST_URL = 'http://localhost:8080/api/products'
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        listProducts();
    }, []);

    const listProducts = () => {
        axios.get(`${REST_URL}`)
            .then((response) => {
                setProductList(response.data._embedded.products);
                console.log(response.data._embedded.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
                setLoading(false);
            });
    }

    const renderProducts = productList.map((product, index) => (
        <li key={index}>
            {product.name}
            <p>
                {product.description}</p>
        </li>
    ));



    return (
        <div>
            <h1>Product list</h1>

            {loading ? <p>Loading...</p> : <ul> {renderProducts}</ul>}

        </div>
    )
}