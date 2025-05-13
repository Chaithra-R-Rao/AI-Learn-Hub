import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      {/* Icon Section */}
      <div className="icon-section">
        <div>
          <i className="fas fa-info-circle" id="img-icon"></i>
          <div className="line"></div>

          <h5 className="mt-4">About</h5>
          <p>Learn more about our website, team, and purpose.</p>
          <ul>
            <li><Link to="/#header">About</Link></li>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/#mentors">Mentors</Link></li>
          </ul>
        </div>

        <div>
          <i className="fas fa-link" id="img-icon"></i>
          <div className="line"></div>

          <h5 className="mt-4">Quick Links</h5>
          <p>Navigate easily to our key pages with quick links.</p>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/courses/supervised">Courses</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <i className="fas fa-share-alt" id="img-icon"></i>
          <div className="line"></div>
          <h5 className="mt-4">Follow Us</h5>
          <p>Connect with us on social media and stay updated.</p>
          <ul>
            <li><a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 Copyright: Website designed and developed by Chaithra</p>
      </div>
    </footer>
  );
}
