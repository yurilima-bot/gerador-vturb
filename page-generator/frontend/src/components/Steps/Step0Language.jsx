import React from 'react';
import './Step0Language.css';

const Step0Language = ({ formData, updateFormData }) => {
  const isForeignOffer = formData.offerType === 'en' || formData.offerType === 'de';
  const showForeignSelector = formData.offerType === 'foreign' || isForeignOffer;

  const handleOfferTypeSelect = (offerType) => {
    if (offerType === 'br') {
      updateFormData({ offerType: 'br' });
    } else {
      // Para ofertas estrangeiras, definir temporariamente como 'foreign'
      updateFormData({ offerType: 'foreign' });
    }
  };

  const handleForeignLanguageSelect = (language) => {
    // Atualizar offerType diretamente para 'en' ou 'de'
    updateFormData({ offerType: language });
  };

  const getLanguageLabel = () => {
    if (formData.offerType === 'br') return 'Brasil (Português)';
    if (formData.offerType === 'en') return 'Estrangeira - Inglês';
    if (formData.offerType === 'de') return 'Estrangeira - Alemão';
    if (formData.offerType === 'foreign') return 'Estrangeira (selecione o idioma)';
    return '';
  };

  return (
    <div className="language-selector">
      <h3 className="section-label">Tipo de Oferta</h3>
      
      <div className="language-options">
        <div
          className={`language-card ${formData.offerType === 'br' ? 'active' : ''}`}
          onClick={() => handleOfferTypeSelect('br')}
        >
          <div className="language-flag">🇧🇷</div>
          <h3 className="language-title">Brasil</h3>
          <p className="language-description">Oferta em Português</p>
        </div>

        <div
          className={`language-card ${showForeignSelector ? 'active' : ''}`}
          onClick={() => handleOfferTypeSelect('foreign')}
        >
          <div className="language-flag">🌍</div>
          <h3 className="language-title">Estrangeira</h3>
          <p className="language-description">Oferta Internacional</p>
        </div>
      </div>

      {/* Seleção de idioma para ofertas estrangeiras */}
      {showForeignSelector && (
        <>
          <h3 className="section-label" style={{ marginTop: '32px' }}>Idioma da Oferta</h3>
          <div className="language-options foreign-languages">
            <div
              className={`language-card small ${formData.offerType === 'en' ? 'active' : ''}`}
              onClick={() => handleForeignLanguageSelect('en')}
            >
              <div className="language-flag">🇺🇸</div>
              <h3 className="language-title">English</h3>
              <p className="language-description">Inglês (EUA)</p>
            </div>

            <div
              className={`language-card small ${formData.offerType === 'de' ? 'active' : ''}`}
              onClick={() => handleForeignLanguageSelect('de')}
            >
              <div className="language-flag">🇩🇪</div>
              <h3 className="language-title">Deutsch</h3>
              <p className="language-description">Alemão</p>
            </div>
          </div>
        </>
      )}

      {(formData.offerType === 'br' || formData.offerType === 'en' || formData.offerType === 'de') && (
        <div className="language-selected">
          ✓ Selecionado: <strong>{getLanguageLabel()}</strong>
        </div>
      )}
    </div>
  );
};

export default Step0Language;
