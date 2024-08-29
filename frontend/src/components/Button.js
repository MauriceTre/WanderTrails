import React from 'react';

function Button({ onClick, children, type = 'button', className = '' }) {
  return (
    <button onClick={onClick} type={type} className={`btn ${className}`}>
      {children}
    </button>
  );
}

export default Button;
