import React from 'react'
import { Container, Button } from 'react-bootstrap';
import './Header.css';
export default function Header() {
    return (
        <div>

            <Container fluid  className="text-center header-section">
                <h1 className="title">AILearnHub</h1>
                <p className="description">
                    We provide you with an exclusive opportunity to get a high-quality education and make your first steps in building a successful career.
                </p>
                <div className="buttons">
                    <Button variant="dark" className="me-3">Sign Up</Button>
                    <Button variant="light">Learn More</Button>
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
