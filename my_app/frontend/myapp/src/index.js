import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProductCounter from './ProductCounter'; // Import the ProductCounter component
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Products from './Products';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<h1>Please select any component</h1>} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/Products' element={<Products />} />
                    <Route path='/product-counter' element={<ProductCounter />} /> {/* Add this line */}
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
