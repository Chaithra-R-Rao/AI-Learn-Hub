import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.get('http://localhost:5000/user-data');
            const users = response.data;

            const matchedUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (matchedUser) {
                localStorage.setItem('user', JSON.stringify(matchedUser));

                console.log('Login successful as', matchedUser.role);
                // Redirect or set user state
                if (matchedUser.role === 'Admin') {
                    window.location.href = '/admin-dashboard';
                }
                else if (matchedUser.role === 'Teacher') {
                    window.location.href = '/faculty-dashboard';
                } else if (matchedUser.role === 'Student') {
                    window.location.href = '/student-dashboard';
                }
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center mt-4 mb-4">
            <div className="login-card shadow-lg">
                <div className="row g-0">
                    {/* Left Section */}
                    <div className="col-md-6 p-5 form-section">
                        <h2 className="fw-bold mb-3">Login Here</h2>
                        <p className="text-muted mb-4">Continue your Learning Journey</p>

                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    className="form-control rounded-pill"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    className="form-control rounded-pill"
                                    placeholder="Your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="text-danger mb-3">{error}</div>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-custom rounded-pill">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="col-md-6 image-section">
                        <img
                            src={`${process.env.PUBLIC_URL}/Images/robot.png`}
                            alt="Robot"
                            className="img-fluid rounded-end"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
