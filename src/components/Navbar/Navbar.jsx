import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import {
    BsHouseDoor, BsGraphUp, BsImages, BsEnvelope, BsBoxArrowInRight,
    BsBoxArrowRight, BsPersonGear, BsPersonSquare, BsClipboardCheck
} from 'react-icons/bs';
import './Navbar.css';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <div>
            <BootstrapNavbar expand="lg" className="navbar-custom">
                <Container>
                    <BootstrapNavbar.Brand href="/">
                        <img
                            src={`${process.env.PUBLIC_URL}/Images/logo.png`}
                            alt="Logo"
                            className="logo"
                            style={{ height: '40px' }}
                        />
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <BootstrapNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto nav-items-custom">
                            <Nav.Link as={NavLink} to="/">
                                <BsHouseDoor className="me-2" /> Home
                            </Nav.Link>

                            <NavDropdown
                                title={
                                    <span><BsGraphUp className="me-2" /> AI Trends</span>
                                }
                                id="ai-trends-dropdown"
                            >
                                <NavDropdown.Item as={NavLink} to="/courses/supervised">
                                    Supervised Learning
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/courses/unsupervised">
                                    Unsupervised Learning
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/courses/semisupervised">
                                    Semi-Supervised Learning
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={NavLink} to="/gallery">
                                <BsImages className="me-2" /> Gallery
                            </Nav.Link>

                            <Nav.Link as={NavLink} to="/contact">
                                <BsEnvelope className="me-2" /> Contact Us
                            </Nav.Link>

                            {!user && (
                                <Nav.Link as={NavLink} to="/login">
                                    <BsBoxArrowInRight className="me-2" /> Login
                                </Nav.Link>
                            )}

                            {user && (
                                <>
                                    {user.role === 'Admin' && (
                                        <Nav.Link as={NavLink} to="/admin-dashboard">
                                            <BsPersonGear className="me-2" />Dashboard
                                        </Nav.Link>
                                    )}
                                    {user.role === 'Teacher' && (
                                        <Nav.Link as={NavLink} to="/faculty-dashboard">
                                            <BsPersonSquare className="me-2" />Dashboard
                                        </Nav.Link>
                                    )}
                                    {user.role === 'Student' && (
                                        <>
                                            <Nav.Link as={NavLink} to="/student-dashboard">
                                                <BsPersonSquare className="me-2" />Dashboard
                                            </Nav.Link>
                                            <Nav.Link as={NavLink} to="/quiz">
                                                <BsClipboardCheck className="me-2" /> Quiz
                                            </Nav.Link>
                                        </>
                                    )}
                                    <Nav.Link onClick={handleLogout}>
                                        <BsBoxArrowRight className="me-2" /> Logout
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        </div>
    );
}