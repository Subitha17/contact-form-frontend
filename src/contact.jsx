import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async () => {
    if (!name.trim() || !contact.trim() || !email.trim() || !address.trim()) {
      alert('Please fill in all the fields.');
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      alert('Contact number must be exactly 10 digits.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contacts`,
        { name, contact, email, address }
      );

      alert('Contact form submitted successfully!');
      setSubmittedData(response.data);
      handleReset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit contact form. Please try again.');
    }
  };

  const handleReset = () => {
    setName('');
    setContact('');
    setEmail('');
    setAddress('');
    setSubmittedData(null);
  };

  const isFilled = [name, contact, email, address].some((val) => val.trim() !== '');

  const styles = {
    container: {
      maxWidth: '520px',
      margin: '50px auto',
      padding: '30px',
      background: 'linear-gradient(135deg, #fefcea, #f1da36)',
      border: '2px solid #ffc107',
      borderRadius: '15px',
      fontFamily: 'Segoe UI, sans-serif',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '16px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxSizing: 'border-box',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      marginBottom: '16px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxSizing: 'border-box',
      minHeight: '80px',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      flex: 1,
      padding: '12px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    submitButton: {
      backgroundColor: '#28c76f',
      color: 'white',
    },
    resetButton: {
      backgroundColor: '#ea5455',
      color: 'white',
    },
    disabled: {
      backgroundColor: '#bdbdbd',
      cursor: 'not-allowed',
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="tel"
        placeholder="Enter your contact number"
        value={contact}
        maxLength={10}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setContact(e.target.value);
          }
        }}
        style={styles.input}
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={styles.textarea}
      />

      <div style={styles.buttonGroup}>
        <button
          onClick={handleSubmit}
          disabled={!isFilled}
          style={{
            ...styles.button,
            ...styles.submitButton,
            ...(isFilled ? {} : styles.disabled),
          }}
        >
          Submit
        </button>
        <button
          onClick={handleReset}
          disabled={!isFilled}
          style={{
            ...styles.button,
            ...styles.resetButton,
            ...(isFilled ? {} : styles.disabled),
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Contact;
