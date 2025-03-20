import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
 
const Login = () => {
    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="login-card shadow-lg">
                <div className="row g-0">
                    {/* Left Section */}
                    <div className="col-md-6 p-5 form-section">
                        <h2 className="fw-bold mb-3">Login Here</h2>
                        <p className="text-muted mb-4">Continue your Learning Journey</p>
 
                        <form>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="form-control rounded-pill"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    className="form-control rounded-pill"
                                    placeholder="Your email"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-custom rounded-pill">
                                Login
                            </button>
                        </form>
                    </div>
 
                    {/* Right Section */}
                    <div className="col-md-6 image-section">
                        <img
src="/Images/Robot.png"
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