import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  ...props 
}) => {
  const className = `button button-${variant} ${size !== 'md' ? `button-${size}` : ''} ${loading ? 'button-loading' : ''}`;
  
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
