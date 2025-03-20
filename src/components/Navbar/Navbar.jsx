import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar as BootstrapNavbar, Nav,  NavDropdown} from 'react-bootstrap';
import './Navbar.css';

export default function Navbar() {
    return (
        <div>
            <BootstrapNavbar expand="lg" className="navbar-custom">
                <Container>
                    <BootstrapNavbar.Brand href="#home">
                        <img src="Images/Logo.png" alt="Logo" className="logo" />
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <BootstrapNavbar.Collapse id="basic-navbar-nav">

                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/home" activeClassName="active-link">Home</Nav.Link>
                            {/* <Nav.Link href="#ai-trends">AI Trends</Nav.Link> */}
                            <NavDropdown title="AI Trends" id="ai-trends-dropdown">
                                <NavDropdown.Item href="#ai-trend-1">Hyper-Personalization</NavDropdown.Item>
                                <NavDropdown.Item href="#ai-trend-2">Generative AI</NavDropdown.Item>
                                <NavDropdown.Item href="#ai-trend-3">Decision Intelligence</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/gallery" activeClassName="active-link">Gallery</Nav.Link>
                            <Nav.Link as={NavLink} to="/login" activeClassName="active-link">Login</Nav.Link>
                            <Nav.Link  as={NavLink} to="/contact" activeClassName="active-link">Contact Us</Nav.Link>
                            <Nav.Link href="#courses">Courses</Nav.Link>
                        </Nav>

                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>


          
        </div>
    );
}

const navStyle = {
    background: '#333',
    padding: '10px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Roboto', sans-serif"
};

const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const liStyle = {
    margin: '0 15px'
};

const aStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'color 0.3s',
};

aStyle[':hover'] = {
    color: '#ff6347'
};

const activeStyle = {
    color: '#ff6389'
};

const iconStyle = {
    marginRight: '5px'
};




