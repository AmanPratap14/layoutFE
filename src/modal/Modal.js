import React from 'react';

const Modal = ({ isOpen, onClose, children,title }) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className="modal-overlay">
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
          <div class="modal-body">
            {children}
          </div>
          <div className="modal-footer">
          <button className="close-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
