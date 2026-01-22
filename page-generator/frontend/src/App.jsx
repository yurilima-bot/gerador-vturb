import React from 'react';
import WizardContainer from './components/Wizard/WizardContainer';
import Step0Language from './components/Steps/Step0Language';
import Step1BasicInfo from './components/Steps/Step1BasicInfo';
import Step2Videos from './components/Steps/Step2Videos';
import Step3Checkout from './components/Steps/Step3Checkout';
import Step4Preview from './components/Steps/Step4Preview';

function App() {
  const steps = [
    {
      id: 'language',
      label: 'Oferta',
      title: 'Tipo de Oferta',
      description: 'Selecione o tipo de oferta que você deseja criar',
      component: Step0Language,
      validate: (data) => {
        const errors = {};
        if (!data.offerType) errors.offerType = 'Selecione um tipo de oferta';
        return errors;
      }
    },
    {
      id: 'basic-info',
      label: 'Informações',
      title: 'Informações Básicas',
      description: 'Configure os dados principais da sua página',
      component: Step1BasicInfo,
      validate: (data) => {
        const errors = {};
        if (!data.productName) errors.productName = 'Nome do produto é obrigatório';
        if (!data.siteDomain) errors.siteDomain = 'Domínio do site é obrigatório';
        return errors;
      }
    },
    {
      id: 'videos',
      label: 'Vídeos',
      title: 'Configuração de Vídeos',
      description: 'Configure os vídeos da sua página (mínimo 1 vídeo)',
      component: Step2Videos,
      validate: (data) => {
        const errors = {};
        if (!data.videos || !data.videos[0]?.videoId) {
          errors.videoId = 'Pelo menos o primeiro vídeo é obrigatório';
        }
        return errors;
      }
    },
    {
      id: 'checkout',
      label: 'Checkout',
      title: 'Configuração de Produtos',
      description: 'Configure os 4 produtos/kits da sua página',
      component: Step3Checkout,
      validate: (data) => {
        const errors = {};
        const products = data.products || [];
        const isForeignOffer = data.offerType === 'en' || data.offerType === 'de';
        
        // Validar se temos exatamente 4 produtos
        if (products.length !== 4) {
          errors.productsCount = 'É necessário configurar exatamente 4 produtos';
        }
        
        products.forEach((product, index) => {
          if (isForeignOffer) {
            // Validação para ofertas estrangeiras
            if (!product.pricePerBottle) {
              errors[`product${index}PricePerBottle`] = 'Preço por frasco é obrigatório';
            }
          } else {
            // Validação para ofertas BR
            if (!product.originalPrice) {
              errors[`product${index}OriginalPrice`] = 'Preço é obrigatório';
            }
          }
        });

        // checkoutLink é opcional - não há validação
        
        return errors;
      }
    },
    {
      id: 'preview',
      label: 'Download',
      title: 'Revisar e Baixar',
      description: 'Confira os dados e baixe sua página personalizada',
      component: Step4Preview,
      validate: () => ({}) // Sem validação na última etapa
    }
  ];

  const handleComplete = (formData) => {
    console.log('Formulário completo:', formData);
    // A geração e download acontecem no Step4Preview
  };

  return (
    <WizardContainer 
      steps={steps} 
      onComplete={handleComplete}
    />
  );
}

export default App;
