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
    const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'gi');
    output = output.replace(regex, value);
  }
  return output;
}

// FunÃ§Ã£o para calcular valor da parcela
function calculateInstallmentValue(price, installments) {
  if (!price) return '0,00';
  const numericPrice = parseFloat(price.toString().replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
  const numInstallments = parseInt(installments) || 1;
  
  if (numericPrice <= 0 || numInstallments <= 0) return '0,00';
  
  const installmentValue = numericPrice / numInstallments;
  return installmentValue.toFixed(2).replace('.', ',');
}

// FunÃ§Ã£o para formatar preÃ§o
function formatPrice(price) {
  if (!price) return '0,00';
  
  let cleaned = price.toString().replace(/[^\d,.-]/g, '');
  
  if (cleaned.includes('.') && !cleaned.includes(',')) {
    cleaned = cleaned.replace('.', ',');
  }
  
  return cleaned || '0,00';
}

// Gerar script.js com notificaÃ§Ãµes personalizadas
function generateScriptJS(productName, videos = []) {
  // Pegar o primeiro delay dos vÃ­deos (em segundos)
  const firstDelay = videos[0]?.delay || '0';
  let delaySeconds = 0;
  if (firstDelay.includes(':')) {
    const [min, sec] = firstDelay.split(':').map(Number);
    delaySeconds = (min * 60) + (sec || 0);
  } else {
    delaySeconds = parseInt(firstDelay) || 0;
  }

  return `// Script - ${productName}
'\n// Gerado automaticamente pelo Page Generator' +
'\n' +
'\n// Delay para o carregamento do vÃ­deo (em segundos)' +
'\nconst DELAY_VIDEO = ' + delaySeconds + ';' +
'\n' +
'\n// Ativa/desativa o Google Tag Manager' +
'\nconst ATIVAR_GTM = false;' +
'\n// Delay para o carregamento do Google Tag Manager' +
'\nconst DELAY_GTM = 99999;' +

'\n\nconst notificacoes = [' +
'\n    { nome: \'AntÃ´nio Carlos Oliveira, em Minas Gerais\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 18 minutos\' },' +
'\n    { nome: \'JosÃ© Ricardo Silva, em SÃ£o Paulo\', quantidade: \'Comprou 10 Frascos - ' + productName + '\', tempo: \'HÃ¡ 31 minutos\' },' +
'\n    { nome: \'Paulo SÃ©rgio Costa, em Rio de Janeiro\', quantidade: \'Comprou 10 Frascos - ' + productName + '\', tempo: \'HÃ¡ 12 minutos\' },' +
'\n    { nome: \'Marcos AntÃ´nio Souza, em GoiÃ¡s\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 2 minutos\' },' +
'\n    { nome: \'Joelma Soares, em Santa Catarina\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 46 minutos\' },' +
'\n    { nome: \'Roberto Luiz, em SÃ£o Paulo\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 1 minuto\' },' +
'\n    { nome: \'Eduardo Henrique, em ParanÃ¡\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 19 minutos\' },' +
'\n    { nome: \'FÃ¡bio Augusto, em SÃ£o Paulo\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 4 minutos\' },' +
'\n    { nome: \'ClÃ¡udio Roberto, em ParÃ¡\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 55 minutos\' },' +
'\n    { nome: \'Carlos Alberto, em Mato Grosso\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 6 minutos\' },' +
'\n    { nome: \'Renato JosÃ©, em Rio Grande do Sul\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 19 minutos\' },' +
'\n    { nome: \'Ricardo GonÃ§alves, em Rio de Janeiro\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 21 minutos\' },' +
'\n    { nome: \'Luiz Fernando, em Alagoas\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 10 minutos\' },' +
'\n    { nome: \'Wagner Silva, em ParanÃ¡\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 47 minutos\' },' +
'\n    { nome: \'SÃ©rgio Henrique, em EspÃ­rito Santo\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 1 minuto\' },' +
'\n    { nome: \'AndrÃ© Luiz, em Bahia\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 22 minutos\' },' +
'\n    { nome: \'Gilberto JosÃ©, em Pernambuco\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 35 minutos\' },' +
'\n    { nome: \'Roberto Almeida, em SÃ£o Paulo\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 59 minutos\' },' +
'\n    { nome: \'Lucas Barbosa, em CearÃ¡\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 40 minutos\' },' +
'\n    { nome: \'Pedro Gomes, em Rio de Janeiro\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 2 minutos\' },' +
'\n    { nome: \'Ivan Silva, em EspÃ­rito Santo\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 28 minutos\' },' +
'\n    { nome: \'Patrick Ferreira, em Santa Catarina\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 12 minutos\' },' +
'\n    { nome: \'Claudio Moreira, em RondÃ´nia\', quantidade: \'Comprou 3 Frascos - ' + productName + '\', tempo: \'HÃ¡ 56 minutos\' },' +
'\n    { nome: \'Ygor Lima, em MaranhÃ£o\', quantidade: \'Comprou 1 Frasco - ' + productName + '\', tempo: \'HÃ¡ 50 minutos\' },' +
'\n    { nome: \'Mariano Souza, em SÃ£o Paulo\', quantidade: \'Comprou 5 Frascos - ' + productName + '\', tempo: \'HÃ¡ 15 minutos\' },' +
'\n];' +

'\n\nfunction slideToggle(element, duration = 400) {' +
'\n    if (window.getComputedStyle(element).display === \'none\') {' +
'\n        return slideDown(element, duration);' +
'\n    }' +
'\n    return slideUp(element, duration);' +
'\n}' +

'\n\nfunction slideUp(element, duration = 400) {' +
'\n    element.style.height = element.offsetHeight + \'px\';' +
'\n    element.style.transitionProperty = \'height, margin, padding\';' +
'\n    element.style.transitionDuration = duration + \'ms\';' +
'\n    element.style.boxSizing = \'border-box\';' +
'\n    element.style.overflow = \'hidden\';' +
'\n    element.offsetHeight;' +
'\n    element.style.height = 0;' +
'\n    element.style.paddingTop = 0;' +
'\n    element.style.paddingBottom = 0;' +
'\n    element.style.marginTop = 0;' +
'\n    element.style.marginBottom = 0;' +
'\n    setTimeout(() => {' +
'\n        element.style.display = \'none\';' +
'\n        element.style.removeProperty(\'height\');' +
'\n        element.style.removeProperty(\'padding-top\');' +
'\n        element.style.removeProperty(\'padding-bottom\');' +
'\n        element.style.removeProperty(\'margin-top\');' +
'\n        element.style.removeProperty(\'margin-bottom\');' +
'\n        element.style.removeProperty(\'overflow\');' +
'\n        element.style.removeProperty(\'transition-duration\');' +
'\n        element.style.removeProperty(\'transition-property\');' +
'\n    }, duration);' +
'\n}' +

'\n\nfunction slideToggle(element, duration = 400) {' +
'\n    if (window.getComputedStyle(element).display === \'none\') {' +
'\n        return slideDown(element, duration);' +
'\n    }' +
'\n    return slideUp(element, duration);' +
'\n}' +

'\n\nfunction slideUp(element, duration = 400) {' +
'\n    element.style.height = element.offsetHeight + \'px\';' +
'\n    element.style.transitionProperty = \'height, margin, padding\';' +
'\n    element.style.transitionDuration = duration + \'ms\';' +
'\n    element.style.height = 0;' +
'\n    element.style.paddingTop = 0;' +
'\n    element.style.paddingBottom = 0;' +
'\n    element.style.marginTop = 0;' +
'\n    element.style.marginBottom = 0;' +
'\n    element.style.overflow = \'hidden\';' +
'\n    element.style.transitionProperty = \'height, margin, padding\';' +
'\n    element.style.transitionDuration = duration + \'ms\';' +
'\n    element.style.boxSizing = \'border-box\';' +
'\n    element.offsetHeight;' +
'\n    element.style.height = height + \'px\';' +
'\n    element.style.paddingTop = \'\';' +
'\n    element.style.paddingBottom = \'\';' +
'\n    element.style.marginTop = \'\';' +
'\n    element.style.marginBottom = \'\';' +
'\n    setTimeout(() => {' +
'\n        element.style.removeProperty(\'height\');' +
'\n        element.style.removeProperty(\'overflow\');' +
'\n        element.style.removeProperty(\'transition-duration\');' +
'\n        element.style.removeProperty(\'transition-property\');' +
'\n    }, duration);' +
'\n}' +

'\nconst loadVturb = () => {' +
'\n    document.querySelectorAll(\'script[data-src$="player.js"]\').forEach(script => {' +
'\n        const src = script.getAttribute(\'data-src\');' +
'\n        script.setAttribute(\'src\', src);' +
'\n    });' +
'\n};' +
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

    // Adia o carregamento do vÃ­deo
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

// Gerar player.js
function generatePlayerJS(productName, videos = []) {
  // Gerar array de vÃ­deos no formato do vTurb
  const vturbVideos = videos.map(v => {
    const delay = v.delay || '0';
    let delayInSeconds = 0;
    // Converter MM:SS para segundos
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

  // Formatar o array de vÃ­deos para o cÃ³digo
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
    var elsHidden = document.querySelectorAll(\`.\${CLASS_TO_DISPLAY}\`);
    var alreadyDisplayedKey = \`alreadyElsDisplayed\${SECONDS_TO_DISPLAY}\`;
    var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

    var whatsappDisplayed = false;
    var alreadyDisplayedKeyWhatsApp = \`alreadyElsDisplayedWpp\${SECONDS_TO_DISPLAY_WHATSAPP}\`;
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

// Gerar script.js para ofertas em INGLÃŠS
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
// Delay for Google Tag Manager loading
const DELAY_GTM = 99999;

const notificacoes = [
    { nome: 'Michael Johnson, in California', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '18 minutes ago' },
    { nome: 'Robert Williams, in Texas', quantidade: 'Purchased 10 Bottles - ${productName}', tempo: '31 minutes ago' },
    { nome: 'James Brown, in New York', quantidade: 'Purchased 10 Bottles - ${productName}', tempo: '12 minutes ago' },
    { nome: 'David Miller, in Florida', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '2 minutes ago' },
    { nome: 'Jennifer Davis, in Illinois', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '46 minutes ago' },
    { nome: 'Charles Wilson, in Pennsylvania', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '1 minute ago' },
    { nome: 'Thomas Moore, in Ohio', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '19 minutes ago' },
    { nome: 'Christopher Taylor, in Georgia', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '4 minutes ago' },
    { nome: 'Daniel Anderson, in North Carolina', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '55 minutes ago' },
    { nome: 'Matthew Thomas, in Michigan', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '6 minutes ago' },
    { nome: 'Anthony Jackson, in New Jersey', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '19 minutes ago' },
    { nome: 'Mark White, in Virginia', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '21 minutes ago' },
    { nome: 'Donald Harris, in Washington', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '10 minutes ago' },
    { nome: 'Steven Martin, in Arizona', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '47 minutes ago' },
    { nome: 'Paul Thompson, in Massachusetts', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '1 minute ago' },
    { nome: 'Andrew Garcia, in Tennessee', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '22 minutes ago' },
    { nome: 'Joshua Martinez, in Indiana', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '35 minutes ago' },
    { nome: 'Kenneth Robinson, in Missouri', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '59 minutes ago' },
    { nome: 'Kevin Clark, in Maryland', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '40 minutes ago' },
    { nome: 'Brian Rodriguez, in Wisconsin', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '2 minutes ago' },
    { nome: 'George Lewis, in Colorado', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '28 minutes ago' },
    { nome: 'Timothy Lee, in Minnesota', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '12 minutes ago' },
    { nome: 'Ronald Walker, in South Carolina', quantidade: 'Purchased 3 Bottles - ${productName}', tempo: '56 minutes ago' },
    { nome: 'Edward Hall, in Alabama', quantidade: 'Purchased 1 Bottle - ${productName}', tempo: '50 minutes ago' },
    { nome: 'Jason Allen, in Louisiana', quantidade: 'Purchased 5 Bottles - ${productName}', tempo: '15 minutes ago' },
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
        dateEl.innerText = new Date().toLocaleDateString('en-US');
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

    // Delay video loading
    setTimeout(loadVturb, DELAY_VIDEO * 1000);

    // Delay Google Tag Manager loading
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

// Lazy loading images
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

// Gerar script.js para ofertas em ALEMÃƒO
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

// VerzÃ¶gerung fÃ¼r das Laden des Videos (in Sekunden)
const DELAY_VIDEO = ${delaySeconds};

// Google Tag Manager aktivieren/deaktivieren
const ATIVAR_GTM = false;
// VerzÃ¶gerung fÃ¼r das Laden des Google Tag Managers
const DELAY_GTM = 99999;

const notificacoes = [
    { nome: 'Michael Schmidt, in Bayern', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 18 Minuten' },
    { nome: 'Thomas MÃ¼ller, in Berlin', quantidade: 'Kaufte 10 Dosen - ${productName}', tempo: 'Vor 31 Minuten' },
    { nome: 'Andreas Weber, in Hamburg', quantidade: 'Kaufte 10 Dosen - ${productName}', tempo: 'Vor 12 Minuten' },
    { nome: 'Stefan Wagner, in Nordrhein-Westfalen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 2 Minuten' },
    { nome: 'Claudia Fischer, in Baden-WÃ¼rttemberg', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 46 Minuten' },
    { nome: 'Markus Becker, in Hessen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 1 Minute' },
    { nome: 'Christian Hoffmann, in Sachsen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 19 Minuten' },
    { nome: 'JÃ¼rgen SchÃ¤fer, in Niedersachsen', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 4 Minuten' },
    { nome: 'Wolfgang Koch, in Rheinland-Pfalz', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 55 Minuten' },
    { nome: 'Peter Bauer, in ThÃ¼ringen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 6 Minuten' },
    { nome: 'Klaus Richter, in Schleswig-Holstein', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 19 Minuten' },
    { nome: 'Hans Klein, in Brandenburg', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 21 Minuten' },
    { nome: 'Dieter Wolf, in Mecklenburg-Vorpommern', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 10 Minuten' },
    { nome: 'Helmut SchrÃ¶der, in Sachsen-Anhalt', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 47 Minuten' },
    { nome: 'Werner Neumann, in Bremen', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 1 Minute' },
    { nome: 'Gerhard Schwarz, in Saarland', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 22 Minuten' },
    { nome: 'Rolf Zimmermann, in Bayern', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 35 Minuten' },
    { nome: 'Uwe Braun, in Berlin', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 59 Minuten' },
    { nome: 'Bernd KrÃ¼ger, in Hamburg', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 40 Minuten' },
    { nome: 'Horst Hartmann, in Nordrhein-Westfalen', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 2 Minuten' },
    { nome: 'GÃ¼nter Lange, in Baden-WÃ¼rttemberg', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 28 Minuten' },
    { nome: 'Karl Werner, in Hessen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 12 Minuten' },
    { nome: 'Heinrich Meier, in Sachsen', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 56 Minuten' },
    { nome: 'Fritz Lehmann, in Niedersachsen', quantidade: 'Kaufte 1 Dose - ${productName}', tempo: 'Vor 50 Minuten' },
    { nome: 'Otto Schmitt, in Rheinland-Pfalz', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 15 Minuten' },
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
        dateEl.innerText = new Date().toLocaleDateString('de-DE');
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

    // VerzÃ¶gertes Laden des Videos
    setTimeout(loadVturb, DELAY_VIDEO * 1000);

    // VerzÃ¶gertes Laden des Google Tag Managers
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

// Lazy Loading fÃ¼r Bilder
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
document.addEventListener('resize', loadImagesInView);
document.addEventListener('DOMContentLoaded', loadImagesInView);

// FunÃ§Ã£o auxiliar para copiar pasta inteira para o arquivo ZIP
async function copyFolderToArchive(folderPath, archive, folder, productName, offerType) {
  let zipPrefix;
  if (folder === 'TEMPLATE_BR_SAUDE') {
    zipPrefix = productName + '_BR_SAUDE/';
  } else if (folder === 'TEMPLATE_EUA_SAUDE') {
    zipPrefix = productName + '_EUA_SAUDE/';
  } else if (folder === 'TEMPLATE_EUA') {
    zipPrefix = productName + '_EUA/';
  } else if (folder === 'TEMPLATE_ALEMANHA') {
    zipPrefix = productName + '_DE/';
  } else {
    zipPrefix = productName + '_BR/';
  }

  function copyRecursive(currentPath, zipPathPrefix) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Pular o index.html jÃ¡ processado
        if (item === 'index.html' && currentPath === folderPath) {
          continue;
        }
        copyRecursive(itemPath, zipPathPrefix + item + '/');
      } else {
        // Pular o index.html raiz jÃ¡ processado
        if (item === 'index.html' && currentPath === folderPath) {
          continue;
        }
        
        const content = fs.readFileSync(itemPath);
        archive.append(content, { name: zipPathPrefix + item });
      }
    }
  }
  
  copyRecursive(folderPath, zipPrefix);
}

// Gerar pÃ¡gina
app.post('/api/generate', async (req, res) => {
  try {
    const data = req.body;
    
    // Extrair dados do formulÃ¡rio
    const productName = data.productName || 'Produto';
    const products = data.products || [];
    const offerType = data.offerType || 'br';
    
    console.log('ðŸš€ Iniciando geraÃ§Ã£o para: ' + productName + ' (' + offerType + ')');
    
    // Determinar quais templates usar baseado na linguagem
    let templateFolders = [];
    let zipFileName = productName + '_' + offerType.toUpperCase();
    
    if (offerType === 'br') {
      templateFolders = ['TEMPLATE_BR', 'TEMPLATE_BR_SAUDE'];
      zipFileName = productName + '_BR';
    } else if (offerType === 'eua') {
      templateFolders = ['TEMPLATE_EUA', 'TEMPLATE_EUA_SAUDE'];
      zipFileName = productName + '_EUA';
    } else if (offerType === 'de') {
      templateFolders = ['TEMPLATE_ALEMANHA'];
      zipFileName = productName + '_DE';
    }
    
    // ============================
    // PROCESSAR TEMPLATES E GERAR ARQUIVOS
    // ============================
    
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    // Configurar headers para download
    res.attachment(zipFileName + '.zip');
    archive.pipe(res);
    
    // Gerar script.js e player.js baseado na linguagem
    let scriptContent, playerContent;
    
    if (offerType === 'eua') {
      scriptContent = generateScriptJSEN(productName, data.videos || []);
    } else if (offerType === 'de') {
      scriptContent = generateScriptJSDE(productName, data.videos || []);
    } else {
      scriptContent = generateScriptJS(productName, data.videos || []);
    }
    
    playerContent = generatePlayerJS(productName, data.videos || []);
    
    // Processar cada template folder
    for (const folder of templateFolders) {
      const folderPath = path.join(__dirname, 'page-generator', 'backend', 'templates', folder);
      
      if (!fs.existsSync(folderPath)) {
        console.error('âŒ Pasta nÃ£o encontrada: ' + folder);
        continue;
      }
      
      console.log('ðŸ“ Processando pasta: ' + folder);
      
      // Ler e processar index.html
      const indexPath = path.join(folderPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        let indexContent = fs.readFileSync(indexPath, 'utf-8');
        
        // Aplicar substituiÃ§Ãµes no index.html
        const product1 = products[0] || {};
        const product2 = products[1] || {};
        const product3 = products[2] || {};
        
        // SubstituiÃ§Ãµes bÃ¡sicas
        const replacements = {
          '{NOME_PRODUTO}': productName,
          '{PRODUCT_NAME}': productName,
          '[NOME_PRODUTO]': productName,
          '[PRODUCT_NAME]': productName,
          '{{NOME_PRODUTO}}': productName,
          '{{PRODUCT_NAME}}': productName
        };
        
        // Aplicar substituiÃ§Ãµes
        for (const [placeholder, value] of Object.entries(replacements)) {
          const regex = new RegExp(placeholder.replace(/[{}\[\]]/g, '\\$&'), 'gi');
          indexContent = indexContent.replace(regex, value);
        }
        
        // Adicionar index.html processado ao ZIP
        let zipPath;
        if (folder === 'TEMPLATE_BR_SAUDE') {
          zipPath = productName + '_BR_SAUDE/index.html';
        } else if (folder === 'TEMPLATE_EUA_SAUDE') {
          zipPath = productName + '_EUA_SAUDE/index.html';
        } else if (folder === 'TEMPLATE_EUA') {
          zipPath = productName + '_EUA/index.html';
        } else if (folder === 'TEMPLATE_ALEMANHA') {
          zipPath = productName + '_DE/index.html';
        } else {
          zipPath = productName + '_BR/index.html';
        }
        
        archive.append(indexContent, { name: zipPath });
        
        // Adicionar assets/js/script.js para este template
        const scriptPath = zipPath.replace('index.html', 'assets/js/script.js');
        archive.append(scriptContent, { name: scriptPath });
        
        // Adicionar assets/js/player.js para este template
        const playerPath = zipPath.replace('index.html', 'assets/js/player.js');
        archive.append(playerContent, { name: playerPath });
        
        // Copiar outros arquivos da pasta (politicas/policies, assets, etc.)
        await copyFolderToArchive(folderPath, archive, folder, productName, offerType);
      }
    }
    
    // Finalizar o ZIP
    await archive.finalize();
    
    console.log('=== ZIP GERADO COM SUCESSO ===');
    
  } catch (error) {
    console.error('Erro ao gerar pÃ¡gina:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log('ðŸš€ Servidor rodando em http://localhost:' + PORT);
    console.log('ðŸ“ DiretÃ³rio: ' + __dirname);
});
