const vturbVideos = [
    { videoId: '68f770a806e8f7b0466ce44b', delayInSeconds: 10, utm: '' },
    { videoId: '68f76e98fb6b843ef16be438', delayInSeconds: 10, utm: '' },
    { videoId: '68f76f4940178215d94922b4', delayInSeconds: 10, utm: '' },
    { videoId: '68f76df2fdb14c13fed7e817', delayInSeconds: 10, utm: '' },
    { videoId: '68f76ffe06e8f7b0466ce381', delayInSeconds: 10, utm: '' },
];

document.addEventListener('DOMContentLoaded', function () {
    var SECONDS_TO_DISPLAY_WHATSAPP = 99999;
    var SECONDS_TO_DISPLAY = 1650;

    var CLASS_TO_DISPLAY = 'esconder';

    /* DAQUI PARA BAIXO NAO PRECISA ALTERAR */
    var attempts = 0;
    var elsHiddenList = [];
    var elsDisplayed = false;
    var elsHidden = document.querySelectorAll(`.${CLASS_TO_DISPLAY}`);
    var alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
    var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

    var whatsappDisplayed = false;
    var alreadyDisplayedKeyWhatsApp = `alreadyElsDisplayedWpp${SECONDS_TO_DISPLAY_WHATSAPP}`;
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
        if (!el) return;
        el.classList.remove('esconder-whatsapp');
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
            }
        });
        

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
