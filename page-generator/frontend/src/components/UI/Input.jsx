import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  help,
  ...props 
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {!required && <span className="input-optional">(Opcional)</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          className={`input-field ${error ? 'input-error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          className={`input-field ${error ? 'input-error' : ''}`}
          value={value}
          onChange={onChange}
          {...props}
        >
          {props.children}
        </select>
      ) : (
        <input
          type={type}
          className={`input-field ${error ? 'input-error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      )}
      
      {error && (
        <span className="input-error-message">⚠️ {error}</span>
      )}
      
      {help && !error && (
        <span className="input-help">{help}</span>
      )}
    </div>
  );
};

export default Input;
