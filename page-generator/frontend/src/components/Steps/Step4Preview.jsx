import { useState } from 'react';
import './Step4Preview.css';

// Função auxiliar para cálculo de parcelas
const calculateInstallment = (price, installments) => {
  const numericPrice = parseFloat((price || '0').replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
  const numInstallments = parseInt(installments) || 1;
  if (numericPrice <= 0) return '0,00';
  return (numericPrice / numInstallments).toFixed(2).replace('.', ',');
};

// Função de download exportada
export const downloadPageFiles = async (formData, setIsDownloading, setDownloadError) => {
  setIsDownloading(true);
  setDownloadError(null);

  try {
    // Mapear produtos para o formato esperado pelo servidor
    const products = formData.products || [];
    const offerTypePayload = {
      br: formData.offerType === 'br',
      en: formData.offerType === 'en',
      de: formData.offerType === 'de'
    };

    // Adicionar dados dos produtos
    products.forEach((product, index) => {
      const i = index + 1;
      const quantity = product.quantity || '1';
      
      offerTypePayload[`title${i}`] = product.title || (i === 4 ? 'Kit Básico' : `${quantity} Frascos`);
      offerTypePayload[`subtitle${i}`] = product.subtitle || `Suficiente para ${quantity} ${quantity === '1' ? 'mês' : 'meses'}`;
      offerTypePayload[`checkout${i}`] = product.checkoutLink || formData.checkoutLink || '#';
      offerTypePayload[`installments${i}`] = product.installments || '12';
      offerTypePayload[`installmentValue${i}`] = product.installmentValue || calculateInstallment(product.originalPrice, product.installments);
      offerTypePayload[`originalPrice${i}`] = product.originalPrice || '0,00';
      
      // Para ofertas estrangeiras
      if (formData.offerType === 'en' || formData.offerType === 'de') {
        offerTypePayload[`save${i}`] = product.save || '$0';
        offerTypePayload[`priceOld${i}`] = product.priceOld || '$0';
        offerTypePayload[`priceNew${i}`] = product.priceNew || '$0';
        offerTypePayload[`pricePerBottle${i}`] = product.pricePerBottle || '0';
      }
    });

    const payload = {
      language: formData.offerType || 'br',
      productName: formData.productName || '',
      domain: formData.siteDomain || '',
      vturbCode: formData.vturbHead || '',
      videos: formData.videos || [],
      offerType: offerTypePayload
    };

    console.log('=== ENVIANDO PARA O BACKEND ===');
    console.log(JSON.stringify(payload, null, 2));

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao gerar arquivo');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const productSlug = (formData.productName || 'landing-page').toLowerCase().replace(/\s+/g, '-');
    a.download = `${productSlug}-landing-page.zip`;
    
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  } catch (error) {
    console.error('Erro no download:', error);
    setDownloadError(error.message);
  } finally {
    setIsDownloading(false);
  }
};

function Step4Preview({ formData, isDownloading, downloadError }) {
  // Garantir que formData existe
  const data = formData || {};

  const isForeignOffer = data.offerType === 'en' || data.offerType === 'de';
  const products = data.products || [];

  const getOfferTypeLabel = () => {
    if (data.offerType === 'br') return '🇧🇷 Português (Brasil)';
    if (data.offerType === 'en') return '🇺🇸 Inglês (English)';
    if (data.offerType === 'de') return '🇩🇪 Alemão (Deutsch)';
    return '—';
  };

  return (
    <div className="preview-container">
      
      {/* Card Principal - Informações Gerais */}
      <div className="preview-card">
        <div className="preview-card-header">
          <span className="preview-card-icon">📋</span>
          <h3>Informações Gerais</h3>
        </div>
        
        <div className="preview-card-body">
          <div className="info-row">
            <span className="info-label">Tipo de Oferta</span>
            <span className="info-value">{getOfferTypeLabel()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Produto</span>
            <span className="info-value">{data.productName || '—'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Domínio</span>
            <span className="info-value">{data.siteDomain || '—'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Link Checkout</span>
            <span className="info-value info-link">{data.checkoutLink || '—'}</span>
          </div>
        </div>
      </div>

      {/* Card vTurb */}
      <div className="preview-card">
        <div className="preview-card-header">
          <span className="preview-card-icon">🎬</span>
          <h3>Player vTurb</h3>
        </div>
        
        <div className="preview-card-body">
          <div className="status-row">
            <div className={`status-badge ${data.vturbHead ? 'status-ok' : 'status-missing'}`}>
              {data.vturbHead ? '✓' : '✗'} Código Head
            </div>
            <div className={`status-badge ${data.vturbPlayer ? 'status-ok' : 'status-missing'}`}>
              {data.vturbPlayer ? '✓' : '✗'} Código Player
            </div>
          </div>
        </div>
      </div>

      {/* Card Produtos */}
      <div className="preview-card">
        <div className="preview-card-header">
          <span className="preview-card-icon">💰</span>
          <h3>Ofertas de Preço</h3>
        </div>
        
        <div className="preview-card-body">
          <div className="products-table">
            <div className="products-table-header">
              <span>Oferta</span>
              <span>{isForeignOffer ? 'Preço por Frasco' : 'Preço Total'}</span>
              <span>{isForeignOffer ? 'Preço OLD' : 'Parcelamento'}</span>
            </div>
            {products.length > 0 ? products.map((product, index) => (
              <div key={index} className="products-table-row">
                <span className="product-label">Produto {index + 1}</span>
                {isForeignOffer ? (
                  <>
                    <span className="product-price">
                      {data.offerType === 'de' ? '€' : '$'}{product.pricePerBottle || '0.00'}
                    </span>
                    <span className="product-installment">
                      {data.offerType === 'de' ? '€' : '$'}{product.priceOld || '0.00'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="product-price">R$ {product.originalPrice || '0,00'}</span>
                    <span className="product-installment">
                      {product.installments || '1'}x de R$ {calculateInstallment(product.originalPrice, product.installments)}
                    </span>
                  </>
                )}
              </div>
            )) : (
              <div className="products-empty">Nenhum produto configurado</div>
            )}
          </div>
        </div>
      </div>

      {/* Erro de Download */}
      {downloadError && (
        <div className="error-banner">
          ❌ {downloadError}
        </div>
      )}

      {/* Área de Download - Movida para o rodapé do wizard */}
      <div className="download-note">
        <p className="note-text">
          📦 <strong>Inclui:</strong> default.php + assets/js/script.js + assets/js/player.js
        </p>
      </div>
    </div>
  );
}

export default Step4Preview;