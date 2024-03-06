import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from './MyContext';

const MyNav = () => {
    const { logged } = useContext(MyContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">My App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Register">Register</Link>
                        </li>
                        {logged && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/product-counter">Product Counter</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MyNav;
