import React, { useContext, useState, useEffect } from 'react';
import MyContext from './MyContext';
import axios from 'axios';

const ProductCounter = () => {
    const { logged } = useContext(MyContext);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        if (logged) {
            const MY_SERVER = "http://127.0.0.1:8000/products/count";
            const TOKEN = localStorage.getItem("token");
            axios.get(MY_SERVER, { headers: { Authorization: `Bearer ${TOKEN}` } })
                .then(res => setProductCount(res.data.count))
                .catch(error => console.error('Error fetching product count:', error));
        }
    }, [logged]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-3">
                <div className="col-md-6">
                    {logged && (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Product Count</h5>
                                <p className="card-text">Total Products: {productCount}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCounter;
