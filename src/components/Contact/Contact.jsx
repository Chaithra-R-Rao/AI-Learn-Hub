import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import './Contact.css'; // Make sure your styles are loaded

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Send data to backend
    try {
      await axios.post('http://localhost:5000/user-contact', formData); // Adjust backend URL as needed

      // 2. Send email using EmailJS
      const emailParams = {
        from_name: 'AILearnHub',
        to_name: formData.name,
        to_email: formData.email,
        message: `Thank you ${formData.name} for contacting us. We'll get back to you shortly!`,
      };

      await emailjs.send(
        'service_j34toeg',     // Replace with your EmailJS service ID
        'template_6s5eoug',    // Replace with your EmailJS template ID
        emailParams,
        'Q126QojCp6qTVDN7w'         // Replace with your EmailJS public key (user ID)
      );

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="contact-container d-flex justify-content-center align-items-center p-5">
      <div className="row w-100">
        <div className="col-md-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5605750487507!2d74.85202737404889!3d12.871634017064183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b1c504f06a5%3A0x9720c6a220d4ecd3!2sImpelsys%20Private%20Limited!5e0!3m2!1sen!2sin!4v1733467012599!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 2 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>

        <div className="col-md-6 p-4">
          <h2 className="text-center mb-4">Hold on, type hello!</h2>
          <p className="text-center">We would love to hear from you and have a small chat.</p>
          <div className="text-center mb-3">
            <p><i className="bi bi-envelope-fill"></i> support@hello.com</p>
            <p><i className="bi bi-telephone-fill"></i> +1-202-555-0127</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name here"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Your email here"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                className="form-control"
                rows="4"
                placeholder="Your message here"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-custom rounded-pill w-100">Send Message</button>
            {status && <div className="mt-3 alert alert-info">{status}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
