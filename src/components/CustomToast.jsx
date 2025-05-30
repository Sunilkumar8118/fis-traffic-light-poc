import React, {useEffect} from 'react'
import './CustomToast.css'
const CustomToast = ({ open, onClose, message, mode = 'warning', duration = 3000 }) =>{

    useEffect(()=>{
        if(open){
            const timer = setTimeout(() =>{
                onClose();
            }, duration)
            return () =>clearTimeout(timer)
        }
    }, [open, duration, onClose])

    return (
    open && (
      <div className={`toast toast-${mode}`}>
        <span>{message}</span>
        <button onClick={onClose}>x</button>
      </div>
    )
  );
}

export default CustomToast