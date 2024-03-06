import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MyContext from './MyContext';

const Products = () => {
    const MY_SERVER = "http://127.0.0.1:8000/products";
    const [products, setProducts] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [msg, setMsg] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [refresh, setRefresh] = useState(true);
    const [productCount, setProductCount] = useState(0);
    const { logged } = useContext(MyContext);

    useEffect(() => {
        const TOKEN = localStorage.getItem("token");
        axios.get(MY_SERVER, { headers: { Authorization: `Bearer ${TOKEN}` } })
            .then(res => {
                setProducts(res.data);
                setProductCount(res.data.length);
            })
            .catch(error => {
                setMsg(error.message);
            });
    }, [refresh]);

    useEffect(() => {
        // Load selected product IDs from localStorage on component mount
        const storedSelectedProductIds = localStorage.getItem("selectedProductIds");
        if (storedSelectedProductIds) {
            setSelectedProductIds(JSON.parse(storedSelectedProductIds));
        }
    }, []);

    useEffect(() => {
        // Update localStorage whenever selectedProductIds state changes
        localStorage.setItem("selectedProductIds", JSON.stringify(selectedProductIds));
    }, [selectedProductIds]);

    const handleAdd = () => {
        const TOKEN = localStorage.getItem("token");
        axios.post(MY_SERVER, { desc, price }, { headers: { Authorization: `Bearer ${TOKEN}` } })
            .then(() => {
                setRefresh(!refresh);
                setProductCount(productCount + 1);
                setDesc("");
                setPrice(0);
            })
            .catch(error => {
                setMsg(error.message);
            });
    };

    const handleUpd = (id) => {
        const TOKEN = localStorage.getItem("token");
        axios.put(MY_SERVER + "/" + id, { desc, price }, { headers: { Authorization: `Bearer ${TOKEN}` } })
            .then(() => {
                setRefresh(!refresh);
                setDesc("");
                setPrice(0);
            })
            .catch(error => {
                setMsg(error.message);
            });
    };

    const handleDelete = (id) => {
        const TOKEN = localStorage.getItem("token");
        axios.delete(MY_SERVER + "/" + id, { headers: { Authorization: `Bearer ${TOKEN}` } })
            .then(() => {
                setRefresh(!refresh);
                setProductCount(productCount - 1);
            })
            .catch(error => {
                setMsg(error.message);
            });
    };

    const handleSelect = (id) => {
        setSelectedProductIds([...selectedProductIds, id]);
    };

    const handleDeleteSelected = (id) => {
        setSelectedProductIds(selectedProductIds.filter(productId => productId !== id));
    };

    return (
        <div className="container">
            {logged ? `Welcome, ${localStorage.getItem('username')}` : "Please login"}
            <h1>{msg}</h1>
            <hr />
            <h2>Products ({productCount})</h2>
            <div className="row">
                {products.map(prod => (
                    <div className="col-md-4 mb-4" key={prod.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{prod.desc}</h5>
                                <p className="card-text">Price: {prod.price}</p>
                                <button className="btn btn-danger mr-2" onClick={() => handleDelete(prod.id)}>Delete</button>
                                <button className="btn btn-primary mr-2" onClick={() => handleUpd(prod.id)}>Update</button>
                                <button className="btn btn-success" onClick={() => handleSelect(prod.id)}>Add to List</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            <h2>Selected Products ({selectedProductIds.length})</h2>
            <div className="row">
                {selectedProductIds.map(productId => {
                    const selectedProduct = products.find(prod => prod.id === productId);
                    return (
                        <div className="col-md-4 mb-4" key={productId}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{selectedProduct.desc}</h5>
                                    <p className="card-text">Price: {selectedProduct.price}</p>
                                    <button className="btn btn-danger mr-2" onClick={() => handleDeleteSelected(productId)}>Delete</button>
                                    <button className="btn btn-primary" onClick={() => handleUpd(productId)}>Update</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <hr />
            <h2>Add a new product</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="desc">Description:</label>
                        <input id="desc" className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input id="price" className="form-control" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <button className="btn btn-success" onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default Products;
