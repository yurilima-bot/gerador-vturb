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

// Função para calcular valor da parcela
function calculateInstallmentValue(price, installments) {
  if (!price) return '0,00';
  const numericPrice = parseFloat(price.toString().replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
  const numInstallments = parseInt(installments) || 1;
  
  if (numericPrice <= 0 || numInstallments <= 0) return '0,00';
  
  const installmentValue = numericPrice / numInstallments;
  return installmentValue.toFixed(2).replace('.', ',');
}

// Função para formatar preço
function formatPrice(price) {
  if (!price) return '0,00';
  
  let cleaned = price.toString().replace(/[^\d,.-]/g, '');
  
  if (cleaned.includes('.') && !cleaned.includes(',')) {
    cleaned = cleaned.replace('.', ',');
  }
  
  return cleaned || '0,00';
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
    { nome: 'Cláudio Roberto, em Pará', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 55 minutos' },
    { nome: 'Carlos Alberto, em Mato Grosso', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 6 minutos' },
    { nome: 'Renato José, em Rio Grande do Sul', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 19 minutos' },
    { nome: 'Ricardo Gonçalves, em Rio de Janeiro', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 21 minutos' },
    { nome: 'Luiz Fernando, em Alagoas', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 10 minutos' },
    { nome: 'Wagner Silva, em Paraná', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 47 minutos' },
    { nome: 'Sérgio Henrique, em Espírito Santo', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 1 minuto' },
    { nome: 'André Luiz, em Bahia', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 22 minutos' },
    { nome: 'Gilberto José, em Pernambuco', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 35 minutos' },
    { nome: 'Roberto Almeida, em São Paulo', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 59 minutos' },
    { nome: 'Lucas Barbosa, em Ceará', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 40 minutos' },
    { nome: 'Pedro Gomes, em Rio de Janeiro', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 2 minutos' },
    { nome: 'Ivan Silva, em Espírito Santo', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 28 minutos' },
    { nome: 'Patrick Ferreira, em Santa Catarina', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 12 minutos' },
    { nome: 'Claudio Moreira, em Rondônia', quantidade: 'Comprou 3 Frascos - ${productName}', tempo: 'Há 56 minutos' },
    { nome: 'Ygor Lima, em Maranhão', quantidade: 'Comprou 1 Frasco - ${productName}', tempo: 'Há 50 minutos' },
    { nome: 'Mariano Souza, em São Paulo', quantidade: 'Comprou 5 Frascos - ${productName}', tempo: 'Há 15 minutos' },
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

// Gerar player.js
function generatePlayerJS(productName, videos = []) {
  // Gerar array de vídeos no formato do vTurb
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

  // Formatar o array de vídeos para o código
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
    { nome: 'Stefan Wagner, in Nordrhein-Westfalen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 2 Minuten' },
    { nome: 'Claudia Fischer, in Baden-Württemberg', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 46 Minuten' },
    { nome: 'Markus Becker, in Hessen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 1 Minute' },
    { nome: 'Christian Hoffmann, in Sachsen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 19 Minuten' },
    { nome: 'Jürgen Schäfer, in Niedersachsen', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 4 Minuten' },
    { nome: 'Wolfgang Koch, in Rheinland-Pfalz', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 55 Minuten' },
    { nome: 'Peter Bauer, in Thüringen', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 6 Minuten' },
    { nome: 'Klaus Richter, in Schleswig-Holstein', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 19 Minuten' },
    { nome: 'Hans Klein, in Brandenburg', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 21 Minuten' },
    { nome: 'Dieter Wolf, in Mecklenburg-Vorpommern', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 10 Minuten' },
    { nome: 'Helmut Schröder, in Sachsen-Anhalt', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 47 Minuten' },
    { nome: 'Werner Neumann, in Bremen', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 1 Minute' },
    { nome: 'Gerhard Schwarz, in Saarland', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 22 Minuten' },
    { nome: 'Rolf Zimmermann, in Bayern', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 35 Minuten' },
    { nome: 'Uwe Braun, in Berlin', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 59 Minuten' },
    { nome: 'Bernd Krüger, in Hamburg', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 40 Minuten' },
    { nome: 'Horst Hartmann, in Nordrhein-Westfalen', quantidade: 'Kaufte 3 Dosen - ${productName}', tempo: 'Vor 2 Minuten' },
    { nome: 'Günter Lange, in Baden-Württemberg', quantidade: 'Kaufte 5 Dosen - ${productName}', tempo: 'Vor 28 Minuten' },
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

    // Verzögertes Laden des Videos
    setTimeout(loadVturb, DELAY_VIDEO * 1000);

    // Verzögertes Laden des Google Tag Managers
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

// Lazy Loading für Bilder
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

// Gerar página
app.post('/api/generate', async (req, res) => {
  try {
    const data = req.body;
    
    console.log('=== DADOS RECEBIDOS ===');
    console.log(JSON.stringify(data, null, 2));
    
    // Determinar tipo de oferta
    const offerType = data.offerType || 'br';
    const isForeignOffer = offerType === 'en' || offerType === 'de';
    
    // Determinar qual template usar
    let templateFile;
    if (offerType === 'en') {
      templateFile = 'template-foreign-en.php';
    } else if (offerType === 'de') {
      templateFile = 'template-foreign-de.php';
    } else {
      templateFile = 'template-default-br.php';
    }
    
    const templatePath = path.join(__dirname, '..', '..', templateFile);
    
    // Verificar se o template existe
    if (!fs.existsSync(templatePath)) {
      console.error('Template não encontrado:', templatePath);
      return res.status(404).json({ error: `Template não encontrado: ${templateFile}` });
    }
    
    let template = fs.readFileSync(templatePath, 'utf-8');
    
    // ============================
    // SUBSTITUIÇÕES
    // ============================
    
    const productName = data.productName || 'Produto';
    const siteDomain = data.siteDomain || '';
    const vturbHead = data.vturbHead || '';
    const vturbPlayer = data.vturbPlayer || '';
    const checkoutLink = data.checkoutLink || '#';
    
    // Produtos
    const products = data.products || [];
    const product1 = products[0] || {};
    const product2 = products[1] || {};
    const product3 = products[2] || {};

    // Funções para gerar título/subtítulo BR
    const generateTitleBR = (quantity) => {
      const qty = parseInt(quantity) || 1;
      return qty === 1 ? '1 Frasco' : `${qty} Frascos`;
    };

    const generateSubtitleBR = (quantity) => {
      const qty = parseInt(quantity) || 1;
      return qty === 1 ? 'Suficiente para 1 mês' : `Suficiente para ${qty} meses`;
    };

    // Funções para gerar título/subtítulo EN
    const generateTitleEN = (quantity) => {
      const qty = parseInt(quantity) || 1;
      return qty === 1 ? '1 Bottle' : `${qty} Bottles`;
    };

    const generateSubtitleEN = (quantity) => {
      const qty = parseInt(quantity) || 1;
      return qty === 1 ? `${qty * 30} Day Supply` : `${qty * 30} Day Supply`;
    };

    // Funções para gerar título/subtítulo DE
    const generateTitleDE = (quantity) => {
      const qty = parseInt(quantity) || 1;
      return qty === 1 ? '1 Dose' : `${qty} Dosen`;
    };

    const generateSubtitleDE = (quantity) => {
      const qty = parseInt(quantity) || 1;
      return qty === 1 ? `${qty * 30} Tage Vorrat` : `${qty * 30} Tage Vorrat`;
    };

    // Símbolo de moeda
    const currencySymbol = offerType === 'de' ? '€' : (offerType === 'en' ? '$' : 'R$');

    // Mapeamento de substituições base
    let replacements = {
      '{{NOME_PRODUTO}}': productName,
      '{{PRODUCT_NAME}}': productName,
      '{{DOMINIO_SITE}}': siteDomain,
      '{{SITE_DOMAIN}}': siteDomain,
      '{{VTURB_HEAD}}': vturbHead,
      '{{VTURB_PLAYER}}': vturbPlayer,
      '{{CHECKOUT_LINK}}': checkoutLink,
      '{{PRODUCT_1_CHECKOUT_LINK}}': checkoutLink,
      '{{PRODUCT_2_CHECKOUT_LINK}}': checkoutLink,
      '{{PRODUCT_3_CHECKOUT_LINK}}': checkoutLink,
      '{{FACEBOOK_PIXEL}}': '',
      '{{DOMINIO_REDTRACK}}': siteDomain,
    };

    // Adicionar substituições específicas por tipo de oferta
    if (isForeignOffer) {
      // OFERTAS ESTRANGEIRAS (EN/DE)
      // Lógica de preços:
      // - pricePerBottle = valor digitado (preço por frasco, ex: $70)
      // - priceNew = pricePerBottle * quantity (preço total: $70 × 2 = $140)
      // - priceOld = priceNew * 2 (sempre o dobro do priceNew: $140 × 2 = $280)
      // - warranty = quantity * 30 dias
      
      const quantityText = offerType === 'en' ? 'BOTTLES' : 'DOSEN';
      const generateTitle = offerType === 'en' ? generateTitleEN : generateTitleDE;
      const generateSubtitle = offerType === 'en' ? generateSubtitleEN : generateSubtitleDE;

      // Produto 1
      const qty1 = parseInt(product1.quantity) || 5;
      const pricePerBottle1 = parseFloat(product1.pricePerBottle) || 0;
      const priceNew1 = pricePerBottle1 * qty1;
      const priceOld1 = priceNew1 * 2;

      replacements['{{PRODUCT_1_QUANTITY}}'] = qty1.toString();
      replacements['{{PRODUCT_1_QUANTITY_TEXT}}'] = quantityText;
      replacements['{{PRODUCT_1_SUPPLY_DAYS}}'] = (qty1 * 30).toString();
      replacements['{{PRODUCT_1_PRICE_NEW}}'] = priceNew1.toFixed(2);
      replacements['{{PRODUCT_1_PRICE_OLD}}'] = priceOld1.toFixed(2);
      replacements['{{PRODUCT_1_PRICE_PER_BOTTLE}}'] = pricePerBottle1.toFixed(2);
      replacements['{{PRODUCT_1_SAVE}}'] = (priceOld1 - priceNew1).toFixed(2);
      replacements['{{PRODUCT_1_TITLE}}'] = generateTitle(qty1);
      replacements['{{PRODUCT_1_SUBTITLE}}'] = generateSubtitle(qty1);

      // Produto 2
      const qty2 = parseInt(product2.quantity) || 3;
      const pricePerBottle2 = parseFloat(product2.pricePerBottle) || 0;
      const priceNew2 = pricePerBottle2 * qty2;
      const priceOld2 = priceNew2 * 2;

      replacements['{{PRODUCT_2_QUANTITY}}'] = qty2.toString();
      replacements['{{PRODUCT_2_QUANTITY_TEXT}}'] = quantityText;
      replacements['{{PRODUCT_2_SUPPLY_DAYS}}'] = (qty2 * 30).toString();
      replacements['{{PRODUCT_2_PRICE_NEW}}'] = priceNew2.toFixed(2);
      replacements['{{PRODUCT_2_PRICE_OLD}}'] = priceOld2.toFixed(2);
      replacements['{{PRODUCT_2_PRICE_PER_BOTTLE}}'] = pricePerBottle2.toFixed(2);
      replacements['{{PRODUCT_2_SAVE}}'] = (priceOld2 - priceNew2).toFixed(2);
      replacements['{{PRODUCT_2_TITLE}}'] = generateTitle(qty2);
      replacements['{{PRODUCT_2_SUBTITLE}}'] = generateSubtitle(qty2);

      // Produto 3
      const qty3 = parseInt(product3.quantity) || 1;
      const pricePerBottle3 = parseFloat(product3.pricePerBottle) || 0;
      const priceNew3 = pricePerBottle3 * qty3;
      const priceOld3 = priceNew3 * 2;

      replacements['{{PRODUCT_3_QUANTITY}}'] = qty3.toString();
      replacements['{{PRODUCT_3_QUANTITY_TEXT}}'] = quantityText;
      replacements['{{PRODUCT_3_SUPPLY_DAYS}}'] = (qty3 * 30).toString();
      replacements['{{PRODUCT_3_PRICE_NEW}}'] = priceNew3.toFixed(2);
      replacements['{{PRODUCT_3_PRICE_OLD}}'] = priceOld3.toFixed(2);
      replacements['{{PRODUCT_3_PRICE_PER_BOTTLE}}'] = pricePerBottle3.toFixed(2);
      replacements['{{PRODUCT_3_SAVE}}'] = (priceOld3 - priceNew3).toFixed(2);
      replacements['{{PRODUCT_3_TITLE}}'] = generateTitle(qty3);
      replacements['{{PRODUCT_3_SUBTITLE}}'] = generateSubtitle(qty3);

    } else {
      // OFERTAS BR
      replacements['{{PRODUCT_1_TITLE}}'] = generateTitleBR(product1.quantity || '5');
      replacements['{{PRODUCT_1_SUBTITLE}}'] = generateSubtitleBR(product1.quantity || '5');
      replacements['{{PRODUCT_1_INSTALLMENTS}}'] = product1.installments || '12';
      replacements['{{PRODUCT_1_INSTALLMENT_VALUE}}'] = calculateInstallmentValue(product1.originalPrice, product1.installments);
      replacements['{{PRODUCT_1_ORIGINAL_PRICE}}'] = formatPrice(product1.originalPrice);

      replacements['{{PRODUCT_2_TITLE}}'] = generateTitleBR(product2.quantity || '3');
      replacements['{{PRODUCT_2_SUBTITLE}}'] = generateSubtitleBR(product2.quantity || '3');
      replacements['{{PRODUCT_2_INSTALLMENTS}}'] = product2.installments || '8';
      replacements['{{PRODUCT_2_INSTALLMENT_VALUE}}'] = calculateInstallmentValue(product2.originalPrice, product2.installments);
      replacements['{{PRODUCT_2_ORIGINAL_PRICE}}'] = formatPrice(product2.originalPrice);

      replacements['{{PRODUCT_3_TITLE}}'] = generateTitleBR(product3.quantity || '1');
      replacements['{{PRODUCT_3_SUBTITLE}}'] = generateSubtitleBR(product3.quantity || '1');
      replacements['{{PRODUCT_3_INSTALLMENTS}}'] = product3.installments || '4';
      replacements['{{PRODUCT_3_INSTALLMENT_VALUE}}'] = calculateInstallmentValue(product3.originalPrice, product3.installments);
      replacements['{{PRODUCT_3_ORIGINAL_PRICE}}'] = formatPrice(product3.originalPrice);
    }
    
    // Aplicar substituições
    for (const [placeholder, value] of Object.entries(replacements)) {
      const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'gi');
      template = template.replace(regex, value);
    }

    // ============================
    // GERAR ZIP COM TODOS OS ARQUIVOS
    // ============================
    
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${productName.toLowerCase().replace(/\s+/g, '-')}-landing-page.zip"`);
    
    archive.pipe(res);
    
    // Adicionar arquivos ao ZIP
    archive.append(template, { name: 'default.php' });
    
    // Gerar script.js e player.js com base no tipo de oferta
    if (offerType === 'en') {
      archive.append(generateScriptJSEN(productName, data.videos || []), { name: 'assets/js/script.js' });
    } else if (offerType === 'de') {
      archive.append(generateScriptJSDE(productName, data.videos || []), { name: 'assets/js/script.js' });
    } else {
      archive.append(generateScriptJS(productName, data.videos || []), { name: 'assets/js/script.js' });
    }
    
    archive.append(generatePlayerJS(productName, data.videos || []), { name: 'assets/js/player.js' });
    
    // Finalizar o ZIP
    await archive.finalize();
    
    console.log('=== ZIP GERADO COM SUCESSO ===');
    
  } catch (error) {
    console.error('Erro ao gerar página:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Diretório: ${__dirname}`);
});