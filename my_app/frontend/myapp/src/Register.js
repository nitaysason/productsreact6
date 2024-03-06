import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const MY_SERVER = "http://127.0.0.1:8000/register";

    const handleRegister = () => {
        axios.post(MY_SERVER, { username, password, email })
            .then(res => console.log("Registration successful"))
            .catch(error => console.error("Registration failed:", error));
    };

    return (
        <div className="container">
            <hr />
            <h1>Register</h1>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input id="username" className="form-control" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
