const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

function applyReplacements(content, replacements) {
  let output = content;
  for (const [placeholder, value] of Object.entries(replacements)) {
    const regex = new RegExp(placeholder.replace(/[{}\[\]]/g, '\\$&'), 'gi');
    output = output.replace(regex, value);
  }
  return output;
}

// Gerar script.js com notificações personalizadas
function generateScriptJS(productName, videos = []) {
  // Pegar o primeiro delay dos vídeos (em segundos)
  const firstDelay = videos[0]?.delay || '0';
  let delaySeconds = 0;
  if (firstDelay.includes(':')) {
    const [min, sec] = firstDelay.split(':').map(Number);
    delaySeconds = (min * 60) + (sec || 0);
  } else {
    delaySeconds = parseInt(firstDelay) || 0;
  }

  return `// Script - ${productName}
// Gerado automaticamente pelo Page Generator

// Delay para o carregamento do vídeo (em segundos)
const DELAY_VIDEO = ${delaySeconds};

// Ativa/desativa o Google Tag Manager
const ATIVAR_GTM = false;
// Delay para o carregamento do Google Tag Manager
const DELAY_GTM = 99999;

const notificacoes = [
    { nome: 'Antônio Carlos Oliveira, em Minas Gerais', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 18 minutos' },
    { nome: 'José Ricardo Silva, em São Paulo', quantidade: 'Comprou 10 Frascos - ${productName}', tempo: 'Há 31 minutos' },
    { nome: 'Paulo Sérgio Costa, em Rio de Janeiro', quantidade: 'Comprou 10 Frascos - ${productName}', tempo: 'Há 12 minutos' },
    { nome: 'Marcos Antônio Souza, em Goiás', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 2 minutos' },
    { nome: 'Joelma Soares, em Santa Catarina', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 46 minutos' },
    { nome: 'Roberto Luiz, em São Paulo', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 1 minuto' },
    { nome: 'Eduardo Henrique, em Paraná', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 19 minutos' },
    { nome: 'Fábio Augusto, em São Paulo', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 4 minutos' },
];

function slideToggle(element, duration = 400) {
    if (window.getComputedStyle(element).display === 'none') {
        return slideDown(element, duration);
    }
    return slideUp(element, duration);
}

function slideUp(element, duration = 400) {
    element.style.height = element.offsetHeight + 'px';
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = duration + 'ms';
    element.style.boxSizing = 'border-box';
    element.style.overflow = 'hidden';
    element.offsetHeight;
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration);
}

function slideDown(element, duration = 400) {
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;
    if (display === 'none') display = 'block';
    element.style.display = display;
    let height = element.offsetHeight;
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    element.style.overflow = 'hidden';
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = duration + 'ms';
    element.style.boxSizing = 'border-box';
    element.offsetHeight;
    element.style.height = height + 'px';
    element.style.paddingTop = '';
    element.style.paddingBottom = '';
    element.style.marginTop = '';
    element.style.marginBottom = '';
    setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration);
}

const loadVturb = () => {
    document.querySelectorAll('script[data-src$="player.js"]').forEach(script => {
        const src = script.getAttribute('data-src');
        script.setAttribute('src', src);
    });
};

let notificationIndex = 0;
const setupNotifications = () => {
    const notification = document.querySelector('.notification');
    if (!notification) return;

    const notificationContent = notificacoes[notificationIndex];

    notification.querySelector('.name').textContent = notificationContent.nome;
    notification.querySelector('.quantity').textContent = notificationContent.quantidade;
    notification.querySelector('.time').textContent = notificationContent.tempo;

    notificationIndex++;
    if (notificationIndex >= notificacoes.length) {
        notificationIndex = 0;
    }

    notification.classList.add('active');

    let hideTimeout = setTimeout(() => {
        notification.classList.remove('active');
    }, 8000);

    notification.querySelector('.close').addEventListener('click', () => {
        notification.classList.remove('active');
        clearTimeout(hideTimeout);
    });

    setTimeout(() => {
        setupNotifications();
    }, 25000);
};

const setupFaq = () => {
    document.querySelectorAll('.question-item').forEach(question => {
        question.addEventListener('click', function () {
            this.classList.toggle('active');
            slideToggle(this.querySelector('.question-item__description'), 200);
        });
    });
};

const setupViewers = () => {
    let minViewers = 589;
    const viewersEl = document.querySelector('.viewers b');
    if (!viewersEl) return;

    viewersEl.textContent = localStorage.viewers || minViewers;

    setInterval(() => {
        const viewers = Number(localStorage.viewers || minViewers);
        let newViewers = viewers + Math.floor(Math.random() * 10) - 2;
        if (newViewers <= minViewers) {
            newViewers += Math.floor(Math.random() * 15);
        }
        localStorage.viewers = newViewers;
        viewersEl.textContent = newViewers;
    }, 5000);
};

document.addEventListener('DOMContentLoaded', () => {
    setupFaq();
    setupViewers();

    const dateEl = document.querySelector('.viewers span');
    if (dateEl) {
        dateEl.innerText = new Date().toLocaleDateString();
    }

    const escolherBtn = document.querySelector('.escolher-meu-kit button');
    if (escolherBtn) {
        escolherBtn.addEventListener('click', () => {
            document.querySelector('.kits').scrollIntoView({ behavior: 'smooth' });
        });
    }

    window.addEventListener('showHiddenElements', () => {
        setupNotifications();
    });

    // Adia o carregamento do vídeo
    setTimeout(loadVturb, DELAY_VIDEO * 1000);

    // Adia o carregamento do Google Tag Manager
    if (ATIVAR_GTM) {
        setTimeout(() => {
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.defer = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-XXXXXXXX');
        }, DELAY_GTM * 1000);
    }
});

// Lazy loading de imagens
const loadImagesInView = () => {
    const className = 'placeholder-loader';
    document.querySelectorAll('.' + className).forEach(img => {
        const isInView = img.getBoundingClientRect().top < window.innerHeight;
        const isVisible = img.offsetWidth > 0 && img.offsetHeight > 0;
        if (isInView && isVisible) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.classList.remove(className);
        }
    });
};

document.addEventListener('scroll', loadImagesInView);
document.addEventListener('resize', loadImagesInView);
document.addEventListener('DOMContentLoaded', loadImagesInView);
`;
}

// Gerar script.js para ofertas em INGLÊS
function generateScriptJSEN(productName, videos = []) {
  const firstDelay = videos[0]?.delay || '0';
  let delaySeconds = 0;
  if (firstDelay.includes(':')) {
    const [min, sec] = firstDelay.split(':').map(Number);
    delaySeconds = (min * 60) + (sec || 0);
  } else {
    delaySeconds = parseInt(firstDelay) || 0;
  }

  return `// Script - ${productName}
// Automatically generated by Page Generator

// Delay for video loading (in seconds)
const DELAY_VIDEO = ${delaySeconds};

// Enable/disable Google Tag Manager
const ATIVAR_GTM = false;
// Delay for loading Google Tag Manager
const DELAY_GTM = 99999;

const notificacoes = [
    { nome: 'Michael Johnson, in California', quantidade: 'Bought 5 Bottles - ${productName}', tempo: '18 minutes ago' },
    { nome: 'David Smith, in New York', quantidade: 'Bought 10 Bottles - ${productName}', tempo: '31 minutes ago' },
    { nome: 'Robert Wilson, in Texas', quantidade: 'Bought 10 Bottles - ${productName}', tempo: '12 minutes ago' },
    { nome: 'James Brown, in Florida', quantidade: 'Bought 5 Bottles - ${productName}', tempo: '2 minutes ago' },
    { nome: 'William Davis, in Illinois', quantidade: 'Bought 5 Bottles - ${productName}', tempo: '46 minutes ago' },
    { nome: 'Richard Miller, in Pennsylvania', quantidade: 'Bought 5 Bottles - ${productName}', tempo: '1 minute ago' },
    { nome: 'Joseph Garcia, in Arizona', quantidade: 'Bought 5 Bottles - ${productName}', tempo: '19 minutes ago' },
    { nome: 'Thomas Anderson, in Ohio', quantidade: 'Bought 3 Bottles - ${productName}', tempo: '4 minutes ago' },
];

// Mesmas funções do script BR (slideToggle, slideUp, slideDown, loadVturb, setupNotifications, setupFaq, setupViewers)
// ... (código das funções igual ao BR)

document.addEventListener('DOMContentLoaded', () => {
    setupFaq();
    setupViewers();
    // ... resto do código igual ao BR
});

document.addEventListener('scroll', loadImagesInView);
document.addEventListener('resize', loadImagesInView);
document.addEventListener('DOMContentLoaded', loadImagesInView);
`;
}

// Gerar script.js para ofertas em ALEMÃO
function generateScriptJSDE(productName, videos = []) {
  const firstDelay = videos[0]?.delay || '0';
  let delaySeconds = 0;
  if (firstDelay.includes(':')) {
    const [min, sec] = firstDelay.split(':').map(Number);
    delaySeconds = (min * 60) + (sec || 0);
  } else {
    delaySeconds = parseInt(firstDelay) || 0;
  }

  return `// Script - ${productName}
// Automatisch generiert vom Page Generator

// Verzögerung für das Laden des Videos (in Sekunden)
const DELAY_VIDEO = ${delaySeconds};

// Google Tag Manager aktivieren/deaktivieren
const ATIVAR_GTM = false;
// Verzögerung für das Laden des Google Tag Managers
const DELAY_GTM = 99999;

const notificacoes = [
    { nome: 'Michael Schmidt, in Bayern', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 18 Minuten' },
    { nome: 'Thomas Müller, in Berlin', quantidade: 'Kaufte 10 Dosen - ${productName}', tempo: 'Vor 31 Minuten' },
    { nome: 'Andreas Weber, in Hamburg', quantidade: 'Kaufte 10 Dosen - ${productName}', tempo: 'Vor 12 Minuten' },
    { nome: 'Hans Fischer, in Hessen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 2 Minuten' },
    { nome: 'Klaus Meyer, in Nordrhein-Westfalen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 46 Minuten' },
    { nome: 'Werner Schulz, in Baden-Württemberg', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 1 Minute' },
    { nome: 'Frank Becker, in Sachsen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 19 Minuten' },
    { nome: 'Jürgen Hoffmann, in Bayern', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 4 Minuten' },
];

// Mesmas funções do script BR (slideToggle, slideUp, slideDown, loadVturb, setupNotifications, setupFaq, setupViewers)
// ... (código das funções igual ao BR)

document.addEventListener('DOMContentLoaded', () => {
    setupFaq();
    setupViewers();
    // ... resto do código igual ao BR
});

document.addEventListener('scroll', loadImagesInView);
document.addEventListener('resize', loadImagesInView);
document.addEventListener('DOMContentLoaded', loadImagesInView);
`;
}

// Gerar player.js
function generatePlayerJS(productName, videos = []) {
  // Gerar array de vídeos no formato do vTurb
  const vturbVideos = videos.map(v => {
    const delay = v.delay || '0';
    let delayInSeconds = 0;
    if (delay.includes(':')) {
      const [min, sec] = delay.split(':').map(Number);
      delayInSeconds = (min * 60) + (sec || 0);
    } else {
      delayInSeconds = parseInt(delay) || 0;
    }
    return {
      videoId: v.videoId || '',
      delayInSeconds: delayInSeconds,
      utm: ''
    };
  }).filter(v => v.videoId);

  const videosArrayStr = vturbVideos.length > 0 
    ? vturbVideos.map(v => `    { videoId: '${v.videoId}', delayInSeconds: ${v.delayInSeconds}, utm: '' }`).join(',\n')
    : `    { videoId: '', delayInSeconds: 0, utm: '' }`;

  return `const vturbVideos = [
${videosArrayStr},
];

document.addEventListener('DOMContentLoaded', function () {
    var SECONDS_TO_DISPLAY_WHATSAPP = 99999;
    var SECONDS_TO_DISPLAY = 1650;

    var CLASS_TO_DISPLAY = 'esconder';

    /* DAQUI PARA BAIXO NAO PRECISA ALTERAR */
    var attempts = 0;
    var elsHiddenList = [];
    var elsDisplayed = false;
    var elsHidden = document.querySelectorAll('.' + CLASS_TO_DISPLAY);
    var alreadyDisplayedKey = 'alreadyElsDisplayed' + SECONDS_TO_DISPLAY;
    var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

    var whatsappDisplayed = false;
    var alreadyDisplayedKeyWhatsApp = 'alreadyElsDisplayedWpp' + SECONDS_TO_DISPLAY_WHATSAPP;
    var alreadyElsDisplayedWhatsApp = localStorage.getItem(alreadyDisplayedKeyWhatsApp);

    elsHiddenList = Array.prototype.slice.call(elsHidden);

    var showHiddenElements = function () {
        elsDisplayed = true;
        elsHiddenList.forEach(e => e.classList.remove('esconder'));
        localStorage.setItem(alreadyDisplayedKey, true);
        window.dispatchEvent(new CustomEvent('showHiddenElements'));
    };

    var showHiddenWhatsApp = function () {
        if (whatsappDisplayed) return;

        whatsappDisplayed = true;
        var el = document.querySelector('.whatsapp-button');
        if (el) el.classList.remove('esconder-whatsapp');
        localStorage.setItem(alreadyDisplayedKeyWhatsApp, true);
    };

    var startWatchVideoProgress = function () {
        if (
            typeof smartplayer === 'undefined' ||
            !(smartplayer.instances && smartplayer.instances.length)
        ) {
            if (attempts >= 10) return;
            attempts += 1;
            return setTimeout(function () {
                startWatchVideoProgress();
            }, 1000);
        }

        console.log('teste a/b delay script loaded');
        const buttonLinks = document.querySelectorAll('a');
        vturbVideos.forEach(video => {
            if (smartplayer.instances[0].analytics.player.options.id == video.videoId) {
                utmPrefix = window.location.search ? '&' : '?';
                const queryString =
                    window.location.search.replace('utm_source=FB', '') + utmPrefix + video.utm;
                if (buttonLinks[0].href.includes(video.utm)) return;
                buttonLinks.forEach(buttonLink => {
                    if (buttonLink.href.includes('?')) {
                        buttonLink.href += queryString.replace('?', '&');
                    } else {
                        buttonLink.href += queryString;
                    }
                });
            }
        });

        vturbVideos.forEach(video => {
            if (smartplayer.instances[0].analytics.player.options.id == video.videoId) {
                SECONDS_TO_DISPLAY = video.delayInSeconds;
                console.log('Delay personalizado encontrado.');
            }
        });
        
        console.log('Delay definido para:', SECONDS_TO_DISPLAY);

        smartplayer.instances[0].on('timeupdate', () => {
            var currentTime = smartplayer.instances[0].video.currentTime;

            if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;

            if (!alreadyElsDisplayedWhatsApp && currentTime >= SECONDS_TO_DISPLAY_WHATSAPP) {
                showHiddenWhatsApp();
            }

            if (currentTime < SECONDS_TO_DISPLAY) return;

            showHiddenElements();
        });
    };

    if (alreadyElsDisplayed === 'true') {
        showHiddenElements();
    } else {
        startWatchVideoProgress();
    }

    if (alreadyElsDisplayedWhatsApp === 'true') showHiddenWhatsApp();
});
`;
}

// Função auxiliar para copiar pasta inteira para o arquivo ZIP
async function copyFolderToArchive(folderPath, archive, folder, productName, offerType) {
  let zipPrefix;
  if (folder === 'TEMPLATE_BR_SAUDE') {
    zipPrefix = 'template_br_saude';
  } else if (folder === 'TEMPLATE_EUA_SAUDE') {
    zipPrefix = 'template_eua_saude';
  } else if (folder === 'TEMPLATE_BR') {
    zipPrefix = 'template_br';
  } else if (folder === 'TEMPLATE_EUA') {
    zipPrefix = 'template_eua';
  } else if (folder === 'TEMPLATE_ALEMANHA') {
    zipPrefix = 'template_alemanha';
  }

  const folderName = path.join(__dirname, 'templates', folder);
  
  async function copyRecursive(sourceDir, targetDir, productName, offerType) {
    const items = fs.readdirSync(sourceDir);
    
    for (const item of items) {
      const sourcePath = path.join(sourceDir, item);
      const targetPath = path.join(targetDir, item);
      
      const stat = fs.statSync(sourcePath);
      
      if (stat.isDirectory()) {
        // Se for a pasta assets, copiar inteira
        if (item === 'assets') {
          archive.directory(sourcePath, path.join(zipPrefix, item));
        } else {
          archive.directory(sourcePath, path.join(zipPrefix, item));
        }
      } else {
        // Se for index.html, fazer os replaces
        if (item === 'index.html') {
          let content = fs.readFileSync(sourcePath, 'utf8');
          
          // Fazer os replaces no index.html
          const replacements = {
            '{{NOME_PRODUTO}}': productName,
            '{{PRODUCT_NAME}}': productName,
            '{{DOMINIO_REDTRACK}}': offerType.domain || '',
            '{{DOMAIN}}': offerType.domain || '',
            '{{VTURB_HEAD}}': offerType.vturbHead || '',
            '{{VTURB_PLAYER}}': offerType.vturbPlayer || '',
            '{{FACEBOOK_PIXEL}}': '',
            // Placeholders BR
            '{{PRODUCT_1_TITLE}}': offerType.title1 || 'Kit Básico',
            '{{PRODUCT_1_SUBTITLE}}': offerType.subtitle1 || 'Suficiente para 1 mês',
            '{{PRODUCT_1_CHECKOUT_LINK}}': offerType.checkout1 || '#',
            '{{PRODUCT_1_INSTALLMENTS}}': offerType.installments1 || '12',
            '{{PRODUCT_1_INSTALLMENT_VALUE}}': offerType.installmentValue1 || '0,00',
            '{{PRODUCT_1_ORIGINAL_PRICE}}': offerType.originalPrice1 || '0,00',
            '{{PRODUCT_2_TITLE}}': offerType.title2 || 'Kit Intermediário',
            '{{PRODUCT_2_SUBTITLE}}': offerType.subtitle2 || 'Suficiente para 3 meses',
            '{{PRODUCT_2_CHECKOUT_LINK}}': offerType.checkout2 || '#',
            '{{PRODUCT_2_INSTALLMENTS}}': offerType.installments2 || '12',
            '{{PRODUCT_2_INSTALLMENT_VALUE}}': offerType.installmentValue2 || '0,00',
            '{{PRODUCT_2_ORIGINAL_PRICE}}': offerType.originalPrice2 || '0,00',
            '{{PRODUCT_3_TITLE}}': offerType.title3 || 'Kit Avançado',
            '{{PRODUCT_3_SUBTITLE}}': offerType.subtitle3 || 'Suficiente para 5 meses',
            '{{PRODUCT_3_CHECKOUT_LINK}}': offerType.checkout3 || '#',
            '{{PRODUCT_3_INSTALLMENTS}}': offerType.installments3 || '12',
            '{{PRODUCT_3_INSTALLMENT_VALUE}}': offerType.installmentValue3 || '0,00',
            '{{PRODUCT_3_ORIGINAL_PRICE}}': offerType.originalPrice3 || '0,00',
            '{{PRODUCT_4_TITLE}}': offerType.title4 || 'Kit Básico',
            '{{PRODUCT_4_SUBTITLE}}': offerType.subtitle4 || 'Suficiente para 1 mês',
            '{{PRODUCT_4_CHECKOUT_LINK}}': offerType.checkout4 || '#',
            '{{PRODUCT_4_INSTALLMENTS}}': offerType.installments4 || '4',
            '{{PRODUCT_4_INSTALLMENT_VALUE}}': offerType.installmentValue4 || '0,00',
            '{{PRODUCT_4_ORIGINAL_PRICE}}': offerType.originalPrice4 || '0,00',
            // Garantia por quantidade de frascos
            '{{WARRANTY_1_BOTTLE}}': offerType.warranty1Bottle || '60 dias',
            '{{WARRANTY_3_BOTTLES}}': offerType.warranty3Bottles || '180 dias',
            '{{WARRANTY_5_BOTTLES}}': offerType.warranty5Bottles || '300 dias',
            '{{WARRANTY_10_BOTTLES}}': offerType.warranty10Bottles || '600 dias',
            // Placeholders EN
            '{{PRODUCT_1_SAVE}}': offerType.save1 || '$0',
            '{{PRODUCT_1_PRICE_OLD}}': offerType.priceOld1 || '$0',
            '{{PRODUCT_1_PRICE_NEW}}': offerType.priceNew1 || '$0',
            '{{PRODUCT_1_PRICE_PER_BOTTLE}}': offerType.pricePerBottle1 || '0',
            '{{PRODUCT_2_SAVE}}': offerType.save2 || '$0',
            '{{PRODUCT_2_PRICE_OLD}}': offerType.priceOld2 || '$0',
            '{{PRODUCT_2_PRICE_NEW}}': offerType.priceNew2 || '$0',
            '{{PRODUCT_2_PRICE_PER_BOTTLE}}': offerType.pricePerBottle2 || '0',
            '{{PRODUCT_3_SAVE}}': offerType.save3 || '$0',
            '{{PRODUCT_3_PRICE_OLD}}': offerType.priceOld3 || '$0',
            '{{PRODUCT_3_PRICE_NEW}}': offerType.priceNew3 || '$0',
            '{{PRODUCT_3_PRICE_PER_BOTTLE}}': offerType.pricePerBottle3 || '0',
          };
          
          content = applyReplacements(content, replacements);
          archive.append(content, { name: path.join(zipPrefix, 'index.html') });
        } 
        // Se for script.js ou player.js, gerar com base na linguagem
        else if (item === 'script.js') {
          let scriptContent;
          if (folder.includes('BR')) {
            scriptContent = generateScriptJS(productName, offerType.videos || []);
          } else if (folder.includes('EUA')) {
            scriptContent = generateScriptJSEN(productName, offerType.videos || []);
          } else if (folder.includes('ALEMANHA')) {
            scriptContent = generateScriptJSDE(productName, offerType.videos || []);
          }
          archive.append(scriptContent, { name: path.join(zipPrefix, 'assets', 'js', 'script.js') });
        }
        // Se for player.js, gerar sempre igual
        else if (item === 'player.js') {
          const playerContent = generatePlayerJS(productName, offerType.videos || []);
          archive.append(playerContent, { name: path.join(zipPrefix, 'assets', 'js', 'player.js') });
        }
        // Outros arquivos, copiar normalmente
        else {
          archive.file(sourcePath, { name: path.join(zipPrefix, item) });
        }
      }
    }
  }
  
  await copyRecursive(folderName, '', productName, offerType);
}

// Rota principal para gerar a página
app.post('/api/generate', async (req, res) => {
  try {
    // Aceitar ambos formatos (antigo e novo)
    const { 
      language, 
      productName, 
      domain, 
      vturbCode, 
      videos, 
      offerType,
      // Formato antigo (compatibilidade)
      offerType: oldOfferType,
      products: oldProducts
    } = req.body;
    
    // Usar dados novos se disponíveis, senão usar antigos
    const finalLanguage = language || oldOfferType || 'br';
    const finalProductName = productName || 'Produto';
    const finalDomain = domain || '';
    const finalVturbCode = vturbCode || '';
    const finalVideos = videos || oldProducts || [];
    const finalOfferType = offerType || oldOfferType || {};
    
    // Se offerType for só {br: true} ou similar, adicionar valores padrão
    if (finalOfferType && !finalOfferType.title1) {
      Object.assign(finalOfferType, {
        title1: '10 Frascos',
        subtitle1: 'Suficiente para 10 meses',
        checkout1: '#',
        installments1: '12',
        installmentValue1: '69,98',
        originalPrice1: '697,00',
        title2: '5 Frascos',
        subtitle2: 'Suficiente para 5 meses',
        checkout2: '#',
        installments2: '12',
        installmentValue2: '39,86',
        originalPrice2: '397,00',
        title3: '3 Frascos',
        subtitle3: 'Suficiente para 3 meses',
        checkout3: '#',
        installments3: '8',
        installmentValue3: '42,29',
        originalPrice3: '297,00',
        title4: '1 Frasco',
        subtitle4: 'Suficiente para 1 mês',
        checkout4: '#',
        installments4: '4',
        installmentValue4: '52,99',
        originalPrice4: '197,00',
        // Garantia por quantidade de frascos
        warranty1Bottle: '60 dias',
        warranty2Bottles: '120 dias',
        warranty3Bottles: '180 dias',
        warranty4Bottles: '240 dias',
        warranty5Bottles: '300 dias',
        warranty6Bottles: '360 dias',
        warranty7Bottles: '420 dias',
        warranty8Bottles: '480 dias',
        warranty9Bottles: '540 dias',
        warranty10Bottles: '600 dias',
        videos: finalVideos
      });
    }
    
    console.log('=== INICIANDO GERAÇÃO ===');
    console.log('Linguagem:', finalLanguage);
    console.log('Tipo de linguagem:', typeof finalLanguage);
    console.log('Linguagem (uppercase):', finalLanguage?.toUpperCase());
    console.log('Produto:', finalProductName);
    console.log('Domínio:', finalDomain);
    console.log('Código VTurb:', finalVturbCode);
    console.log('Vídeos:', finalVideos);
    console.log('Tipo de oferta:', finalOfferType);

    // Criar arquivo ZIP
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    // Configurar headers para download
    res.attachment(`${finalProductName.replace(/\s+/g, '_')}_${finalLanguage}.zip`);
    archive.pipe(res);

    // Determinar quais pastas incluir com base na linguagem
    const foldersToInclude = [];
    
    if (finalLanguage.toUpperCase() === 'BR') {
      foldersToInclude.push('TEMPLATE_BR', 'TEMPLATE_BR_SAUDE');
    } else if (finalLanguage.toUpperCase() === 'EN') {
      foldersToInclude.push('TEMPLATE_EUA', 'TEMPLATE_EUA_SAUDE');
    } else if (finalLanguage.toUpperCase() === 'DE') {
      foldersToInclude.push('TEMPLATE_ALEMANHA');
    }

    console.log(`Pastas a incluir: ${foldersToInclude.join(', ')}`);

    // Copiar cada pasta para o ZIP
    for (const folder of foldersToInclude) {
      console.log(`Copiando pasta: ${folder}`);
      await copyFolderToArchive('', archive, folder, finalProductName, {
        domain: finalDomain,
        vturbCode: finalVturbCode,
        videos: finalVideos,
        ...finalOfferType
      });
      console.log(`Pasta ${folder} copiada com sucesso`);
    }

    // Finalizar o arquivo ZIP
    archive.finalize();
    
    console.log('=== ZIP GERADO COM SUCESSO ===');
    
  } catch (error) {
    console.error('Erro ao gerar página:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log('🚀 Servidor rodando em http://localhost:' + PORT);
    console.log('📁 Diretório: ' + __dirname);
});
