// src/components/Toast.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, onClose, message, mode = 'warning', duration = 3000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={mode} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
