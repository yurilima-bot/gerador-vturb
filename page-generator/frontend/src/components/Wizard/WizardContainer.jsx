import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import Button from '../UI/Button';
import { downloadPageFiles } from '../Steps/Step4Preview';
import './WizardContainer.css';

const WizardContainer = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const currentStepConfig = steps[currentStep];

  const handleNext = async () => {
    // Validar campos obrigatórios
    const validationErrors = currentStepConfig.validate ? currentStepConfig.validate(formData) : {};
    
    if (Object.keys(validationErrors).length > 0) {
      // Mostrar erros
      setErrors(validationErrors);
      return;
    }

    // Limpar erros
    setErrors({});

    // Se for a última etapa, fazer download
    if (currentStep === steps.length - 1) {
      await downloadPageFiles(formData, setIsDownloading, setDownloadError);
      return;
    }

    // Marcar etapa como concluída
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    // Avançar
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Limpar erros ao voltar
      setErrors({});
    }
  };

  const handleStepClick = (stepIndex) => {
    // Permitir navegar para qualquer etapa anterior ou concluída
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
      // Limpar erros ao mudar de step
      setErrors({});
    }
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const stepsWithStatus = steps.map((step, index) => ({
    ...step,
    completed: completedSteps.includes(index)
  }));

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="wizard-container">
      <div className="wizard-content">
        <div className="wizard-header">
          <div className="wizard-header-content">
            <h1 className="wizard-title">{currentStepConfig.title}</h1>
            <p className="wizard-subtitle">{currentStepConfig.description}</p>
          </div>
        </div>

        <StepIndicator
          steps={stepsWithStatus}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <div className="wizard-step-content">
          {React.createElement(currentStepConfig.component, {
            formData,
            updateFormData,
            errors,
            isDownloading,
            downloadError
          })}
        </div>

        <div className="wizard-actions">
          <div className="wizard-actions-left">
            {currentStep > 0 && (
              <Button variant="ghost" onClick={handleBack}>
                ← Voltar
              </Button>
            )}
          </div>

          <div className="wizard-actions-right">
            <Button variant="primary" onClick={handleNext} disabled={isDownloading}>
              {isLastStep ? (isDownloading ? '⏳ Gerando...' : '📦 Baixar Arquivos ZIP') : 'Próximo →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardContainer;
