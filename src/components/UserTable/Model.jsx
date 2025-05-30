
// src/components/Modal.jsx
import ReactDOM from 'react-dom';
import './Model.css'

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" >
        <button onClick={onClose} className="close-btn">X</button>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;