
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Paper } from '@mui/material';

const ProfilePage = () => {
    const location = useLocation();
  const user = location.state;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
    

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem', marginLeft: '260px', marginTop: '2rem' }}>
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth />
        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">Save</Button>
      </form>
    </Paper>
  );
};

export default ProfilePage;
