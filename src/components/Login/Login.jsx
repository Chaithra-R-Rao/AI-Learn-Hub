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

                const base = '/AI-Learn-Hub';

                if (matchedUser.role === 'Admin') {
                    window.location.href = `${base}/admin-dashboard`;
                } else if (matchedUser.role === 'Teacher') {
                    window.location.href = `${base}/faculty-dashboard`;
                } else if (matchedUser.role === 'Student') {
                    window.location.href = `${base}/student-dashboard`;
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
        <div className="container-fluid login-container d-flex justify-content-center align-items-center py-5">
            <div className="login-card shadow-lg w-100" style={{ maxWidth: '900px' }}>
                <div className="row g-0">
                    {/* Left Section - Form */}
                    <div className="col-md-6 col-12 p-5 form-section">
                        <h2 className="fw-bold mb-3 text-center text-md-start">Login Here</h2>
                        <p className="text-muted mb-4 text-center text-md-start">Continue your Learning Journey</p>

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
                                <button type="submit" className="btn btn-custom rounded-pill w-100">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Section - Image */}
                    <div className="col-md-6 col-12 d-flex justify-content-center align-items-center image-section p-3">
                        <img
                            src={`${process.env.PUBLIC_URL}/Images/robot.png`}
                            alt="Robot"
                            className="img-fluid rounded"
                            style={{ maxHeight: '350px', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
