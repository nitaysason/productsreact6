import React, { useState, useContext } from 'react';
import axios from 'axios';
import MyContext from './MyContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const { logged, setlogged } = useContext(MyContext);

    const MY_SERVER = "http://127.0.0.1:8000/login";

    const handleLogin = () => {
        axios.post(MY_SERVER, { username, password })
            .then(res => {
                localStorage.setItem("token", res.data.access);
                localStorage.setItem("username", username);
                setlogged(true);
            })
            .catch(error => {
                setMsg(error.message);
            });
    };

    const handleLogout = () => {
        setlogged(false);
        localStorage.setItem("token", "");
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>
                            Login
                        </button>
                        {msg && <p className="text-danger mt-2">{msg}</p>}
                    </form>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6 offset-md-3">
                    {logged && (
                        <button type="button" className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
