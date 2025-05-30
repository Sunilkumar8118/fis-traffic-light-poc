import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Paper, Avatar, Typography } from '@mui/material';
import axios from 'axios';

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`).then(res => {
      const user = res.data;
      setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        address: `${user.address.address}, ${user.address.city}`,
        email: user.email,
        phone: user.phone,
        image: user.image,
        birthDate: user.birthDate
      });
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><CircularProgress /></div>;
  }

  return (
    <Paper sx={{ padding: 4, margin: 4 }}>
      <Avatar src={user.image} sx={{ width: 100, height: 100, margin: 'auto' }} />
      <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
        {user.firstName} {user.lastName}
      </Typography>
      
      <Typography align="center">Age: {user.age}</Typography>
      <Typography align="center">DOB: {user.birthDate}</Typography>
      <Typography align="center">Address: {user.address}</Typography>
      <Typography align="center">Phone: {user.phone}</Typography>
      <Typography align="center">Email: {user.email}</Typography>
    </Paper>
  );
};

export default UserDetailsPage;
