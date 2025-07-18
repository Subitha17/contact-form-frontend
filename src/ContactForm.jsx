import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contacts`,
        formData
      );
      console.log('Success:', response.data);
      setStatus('Submitted successfully!');
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('Submission failed.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Contact</label>
      <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Address</label>
      <textarea name="address" value={formData.address} onChange={handleChange} required />

      <button type="submit">Submit</button>

      {status && <p className="status-message">{status}</p>}
    </form>
  );
}

export default ContactForm;
