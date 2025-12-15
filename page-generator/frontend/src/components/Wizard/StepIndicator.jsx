import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div 
            className={`step-item ${currentStep === index ? 'active' : ''} ${step.completed ? 'completed' : ''}`}
            onClick={() => onStepClick(index)}
          >
            <div className={`step-circle ${currentStep === index ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
              {step.completed ? '✓' : index + 1}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`step-connector ${step.completed ? 'completed' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
