import React from 'react';
import Input from '../UI/Input';
import './Step3Checkout.css';

const Step3Checkout = ({ formData, updateFormData, errors }) => {

    const offerType = formData.offerType || 'br';
    const isForeignOffer = offerType === 'en' || offerType === 'de';
    const currencySymbol = offerType === 'de' ? '€' : (offerType === 'en' ? '$' : 'R$');

    const sharedLink = formData.checkoutLink || '';

    const initialPricesBR = [
        { quantity: '5', originalPrice: '', installments: '12', installmentValue: '' },
        { quantity: '3', originalPrice: '', installments: '12', installmentValue: '' },
        { quantity: '1', originalPrice: '', installments: '12', installmentValue: '' }
    ];

    const initialPricesForeign = [
        { quantity: '5', pricePerBottle: '', priceNew: '', priceOld: '' },
        { quantity: '3', pricePerBottle: '', priceNew: '', priceOld: '' },
        { quantity: '1', pricePerBottle: '', priceNew: '', priceOld: '' }
    ];

    const initialPrices = isForeignOffer ? initialPricesForeign : initialPricesBR;

    const prices = formData.products && formData.products.length === 3 
        ? formData.products.map((p, i) => ({
            ...initialPrices[i],
            ...p,
        }))
        : initialPrices;

    const calculateInstallmentValue = (originalPrice, installments) => {
        const cleanPrice = (originalPrice || '')
            .replace(/R\$\s*/gi, '')
            .replace(/\./g, '')  
            .replace(',', '.')   
            .trim();
        
        const numericPrice = parseFloat(cleanPrice);
        const numInstallments = parseInt(installments, 10) || 1;
        
        if (isNaN(numericPrice) || numericPrice <= 0 || numInstallments === 0) {
            return '';
        }
        
        const installmentValue = numericPrice / numInstallments;
        return installmentValue.toFixed(2).replace('.', ',');
    };

    const parseForeignPrice = (price) => {
        const cleanPrice = (price || '')
            .replace(/[$€]\s*/gi, '')
            .replace(',', '')
            .trim();
        return parseFloat(cleanPrice) || 0;
    };

    const formatForeignPrice = (value) => {
        if (!value || value <= 0) return '';
        return value.toFixed(2);
    };

    // Ofertas estrangeiras: usuario informa preco por frasco (pricePerBottle)
    // priceNew = pricePerBottle * quantidade (preço total para a quantidade)
    // priceOld = priceNew * 2 (sempre o dobro do priceNew)
    const calculateForeignPrices = (product) => {
        const pricePerBottle = parseForeignPrice(product.pricePerBottle);
        const quantity = parseInt(product.quantity, 10) || 1;

        if (pricePerBottle <= 0) {
            return { priceNew: '', priceOld: '' };
        }

        const priceNew = pricePerBottle * quantity;
        const priceOld = priceNew * 2;

        return {
            priceNew: formatForeignPrice(priceNew),
            priceOld: formatForeignPrice(priceOld)
        };
    };

    const updatePrice = (index, field, value) => {
        const newPrices = [...prices];
        const updatedProduct = { ...newPrices[index], [field]: value };

        if (isForeignOffer) {
            if (field === 'pricePerBottle' || field === 'quantity') {
                const calculated = calculateForeignPrices(updatedProduct);
                updatedProduct.priceNew = calculated.priceNew;
                updatedProduct.priceOld = calculated.priceOld;
            }
        } else {
            if (field === 'originalPrice' || field === 'installments') {
                const originalPrice = updatedProduct.originalPrice;
                const installments = updatedProduct.installments;
                updatedProduct.installmentValue = calculateInstallmentValue(originalPrice, installments);
            }
        }
        
        newPrices[index] = updatedProduct;
        updateFormData({ products: newPrices });
    };

    const updateSharedLink = (value) => {
        updateFormData({ checkoutLink: value });
    };

    const renderBRForm = (price, index) => (
        <div key={index} className="product-group">
            <div className="product-header">
                <h3 className="product-number">Oferta de Preco {index + 1}</h3>
            </div>

            <div className="price-row"> 
                <div className="quantity-input">
                    <Input
                        label="Qtd. Frascos"
                        type="number"
                        value={price.quantity || ''}
                        onChange={(e) => updatePrice(index, 'quantity', e.target.value)}
                        placeholder="5"
                        min="1"
                        inputClassName="number-input" 
                        error={errors[`product${index}Quantity`]}
                    />
                </div>

                <Input
                    label="Preco Cheio (Total R$)"
                    type="text"
                    value={price.originalPrice || ''}
                    onChange={(e) => updatePrice(index, 'originalPrice', e.target.value)}
                    placeholder="Ex: 297,00"
                    required
                    error={errors[`product${index}OriginalPrice`]}
                    help="Valor total do produto a vista."
                />
            </div>

            <div className="installment-row">
                <div className="installment-select">
                    <label className="input-label">Parcelas</label>
                    <select
                        className="select-input"
                        value={price.installments || '12'}
                        onChange={(e) => updatePrice(index, 'installments', e.target.value)}
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                            <option key={n} value={n}>{n}x</option>
                        ))}
                    </select>
                    <span className="input-help">No de parcelas.</span>
                </div>
                
                <div className="installment-value">
                    <label className="input-label">Valor da Parcela</label>
                    <div className="calculated-value">
                        {price.installmentValue ? `R$ ${price.installmentValue}` : '-'}
                    </div>
                    <span className="input-help">Calculado automaticamente.</span>
                </div>
            </div>
        </div>
    );

    const renderForeignForm = (price, index) => {
        const quantity = parseInt(price.quantity, 10) || 1;
        const warranty = quantity * 30;
        
        return (
            <div key={index} className="product-group">
                <div className="product-header">
                    <h3 className="product-number">{offerType === 'en' ? 'Price Offer' : 'Preisangebot'} {index + 1}</h3>
                </div>

                <div className="price-row"> 
                    <div className="quantity-input">
                        <Input
                            label={offerType === 'en' ? 'Qty. Bottles' : 'Anz. Dosen'}
                            type="number"
                            value={price.quantity || ''}
                            onChange={(e) => updatePrice(index, 'quantity', e.target.value)}
                            placeholder="5"
                            min="1"
                            inputClassName="number-input" 
                            error={errors[`product${index}Quantity`]}
                        />
                    </div>

                    <Input
                        label={`${offerType === 'en' ? 'Price per Bottle' : 'Preis pro Dose'} ${currencySymbol}`}
                        type="text"
                        value={price.pricePerBottle || ''}
                        onChange={(e) => updatePrice(index, 'pricePerBottle', e.target.value)}
                        placeholder="Ex: 49.00"
                        required
                        error={errors[`product${index}PricePerBottle`]}
                        help={offerType === 'en' ? 'Price for each bottle.' : 'Preis fuer jede Dose.'}
                    />
                </div>

                <div className="installment-row foreign-row">
                    <div className="installment-value">
                        <label className="input-label">{offerType === 'en' ? 'Product Price NEW' : 'Produkt Preis NEU'}</label>
                        <div className="calculated-value highlight">
                            {price.priceNew ? `${currencySymbol}${price.priceNew}` : '-'}
                        </div>
                        <span className="input-help">{offerType === 'en' ? `${price.pricePerBottle || '0'} x ${quantity}` : `${price.pricePerBottle || '0'} x ${quantity}`}</span>
                    </div>
                    
                    <div className="installment-value">
                        <label className="input-label">{offerType === 'en' ? 'Product Price OLD' : 'Produkt Preis ALT'}</label>
                        <div className="calculated-value strikethrough">
                            {price.priceOld ? `${currencySymbol}${price.priceOld}` : '-'}
                        </div>
                        <span className="input-help">{offerType === 'en' ? `${price.priceNew || '0'} x 2` : `${price.priceNew || '0'} x 2`}</span>
                    </div>
                </div>

                <div className="installment-row foreign-row">
                    <div className="installment-value">
                        <label className="input-label">{offerType === 'en' ? 'Warranty' : 'Garantie'}</label>
                        <div className="calculated-value">
                            {warranty} {offerType === 'en' ? 'days' : 'Tage'}
                        </div>
                        <span className="input-help">{offerType === 'en' ? `${quantity} x 30 days` : `${quantity} x 30 Tage`}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="checkout-container">
            
            <div className="product-group"> 
                <div className="product-header">
                    <h3 className="product-number">{isForeignOffer ? (offerType === 'en' ? 'Main Payment Link' : 'Hauptzahlungslink') : 'Link de Pagamento Principal'}</h3>
                </div>

                <Input
                    label={isForeignOffer ? (offerType === 'en' ? 'Checkout Link (Valid for all offers)' : 'Checkout-Link (Gueltig fuer alle Angebote)') : 'Link de Checkout (Valido para todas as ofertas)'}
                    type="text"
                    value={sharedLink}
                    onChange={(e) => updateSharedLink(e.target.value)}
                    placeholder="https://pay.hotmart.com/..."
                    
                    error={errors.checkoutLink}
                    help={isForeignOffer ? (offerType === 'en' ? 'The main checkout link for your product.' : 'Der Hauptcheckout-Link fuer Ihr Produkt.') : 'O link de checkout principal do seu produto.'}
                />
            </div>

            {prices.map((price, index) => 
                isForeignOffer 
                    ? renderForeignForm(price, index) 
                    : renderBRForm(price, index)
            )}
        </div>
    );
};

export default Step3Checkout;
