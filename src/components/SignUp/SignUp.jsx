import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ({ title = 'Start Learning Now!!', buttonText = 'Sign Up', onUserAdded }) => {
  const [formData, setFormData] = useState({
    dob: '',
    role: '',
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z ]+$/;
    const today = new Date().toISOString().split('T')[0];

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else if (formData.dob > today) {
      newErrors.dob = 'Date of birth cannot be in the future';
    }

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name should not contain numbers or special characters';
    }

    if (!formData.role) newErrors.role = 'Role is required';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/user-data', formData);
        toast.success('User successfully added!');
        if (onUserAdded) onUserAdded();
        setFormData({ dob: '', role: '', name: '', email: '', phone: '', password: '' });
      } catch (error) {
        toast.error('Error during signup. Please try again.');
        console.error('Error during signup:', error);
      }
    } else {
      toast.error('Please correct the highlighted errors.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mt-4 mb-4">
      <ToastContainer />
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">{title}</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Email *</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password *</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">DOB *</label>
              <input
                type="date"
                className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                name="dob"
                value={formData.dob}
                max={today}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.dob}</div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            <div className="invalid-feedback">{errors.role}</div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-custom rounded-pill">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
