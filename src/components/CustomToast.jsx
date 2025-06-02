import React from 'react'
import './CustomToast.css'

const CustomToast = ({ open, message, mode = 'warning', onClose }) =>{

    if(!open) return null;

    return (
      <div className={`toast toast-${mode}`}>
        <span>{message}</span>
        <button className='toast-close' onClick={onClose}>x</button>
      </div>
    
  );
}

export default CustomToast