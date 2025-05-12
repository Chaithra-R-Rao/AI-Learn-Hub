import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getDashboardLink = () => {
        if (!user) return '/';
        switch (user.role) {
            case 'Admin':
                return '/admin-dashboard';
            case 'Teacher':
                return '/faculty-dashboard';
            case 'Student':
                return '/student-dashboard';
            default:
                return '/';
        }
    };
    return (
        <div>
            <Container fluid className="text-center header-section">
                <h1 className="title">AILearnHub</h1>
                <p className="description">
                    We provide you with an exclusive opportunity to get a high-quality education and <br />make your first steps in building a successful career.
                </p>
                <div className="buttons p-3">
                    {!user ? (
                        <Button as={Link} to="/signup" variant="dark" className="me-3">Sign Up</Button>
                    ) : (
                        <Button as={Link} to={getDashboardLink()} variant="dark" className="me-3">
                            Go to Dashboard
                        </Button>
                    )}
                    <Button as={Link} to="/#services" variant="light">Learn More</Button>
                </div>
                <div className="social-links mt-4">
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-youtube"></i>
                    <i className="bi bi-pinterest"></i>
                </div>
            </Container>
        </div>
    )
}
