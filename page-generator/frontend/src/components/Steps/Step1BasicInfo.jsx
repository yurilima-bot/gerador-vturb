import React from 'react';
import Input from '../UI/Input';
import './Step1BasicInfo.css';

const Step1BasicInfo = ({ formData, updateFormData, errors }) => {
  return (
    // Não é necessário um wrapper adicional aqui, pois o wizard-step-content já fornece o padding.
    <div>
      {/* O componente Input já está formatado com o novo input.css:
        - Borda arredondada (var(--radius))
        - Sombra sutil (var(--shadow-sm))
        - Destaque primário (var(--color-primary)) no focus
      */}
      <Input
        label="Nome do Produto"
        type="text"
        value={formData.productName || ''}
        onChange={(e) => updateFormData({ productName: e.target.value })}
        placeholder="Ex: Libedinol"
        required
        error={errors.productName}
        help="Nome que aparecerá na página de vendas."
      />

      <Input
        label="Domínio do Site"
        type="text"
        value={formData.siteDomain || ''}
        onChange={(e) => updateFormData({ siteDomain: e.target.value })}
        placeholder="Ex: seusite.com"
        required
        error={errors.siteDomain}
        help="Domínio principal do seu site. Ex: 'meuproduto.com.br'"
      />

      {/* Campos vTurb */}
      <div className="vturb-section">
        <h3 className="section-title">📹 Configuração do Player vTurb</h3>
        
        <div className="textarea-group">
          <label className="textarea-label">Código vTurb (Head)</label>
          <textarea
            className="textarea-input"
            value={formData.vturbHead || ''}
            onChange={(e) => updateFormData({ vturbHead: e.target.value })}
            placeholder="Cole aqui o código do vTurb que vai no <head>..."
            rows={6}
          />
          <span className="textarea-help">
            Código que começa com &lt;script&gt;!function... e inclui os preloads
          </span>
        </div>

        <div className="textarea-group">
          <label className="textarea-label">Código vTurb (Player)</label>
          <textarea
            className="textarea-input"
            value={formData.vturbPlayer || ''}
            onChange={(e) => updateFormData({ vturbPlayer: e.target.value })}
            placeholder="Cole aqui o código do player vTurb..."
            rows={4}
          />
          <span className="textarea-help">
            Código que contém &lt;vturb-smartplayer...&gt;
          </span>
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;