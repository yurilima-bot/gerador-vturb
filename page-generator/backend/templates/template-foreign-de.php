<!DOCTYPE html>
<html lang="de">
    <head>
        <title>Video ansehen</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="shortcut icon" href="./assets/images/favicon.png" type="image/x-icon" />

        <meta
            name="description"
            content="{{NOME_PRODUTO}} - Natürliche Lösung." />

        <link rel="stylesheet" href="./assets/css/reseter.css" />
        <link rel="stylesheet" href="./assets/css/fonts.css" />
        <link rel="stylesheet" href="./assets/css/styles.css" />
        <link rel="stylesheet" href="./assets/css/new-sections.css" />

        <!-- vTurb -->
        {{VTURB_HEAD}}
        <!-- Fim vTurb -->

        <!-- Redtrack -->
        <script type="text/javascript" src="https://gm.{{DOMINIO_REDTRACK}}/track.js"></script>
        <!-- Fim Redtrack -->

        {{FACEBOOK_PIXEL}}
    </head>

    <body>
        <header>
            <div class="header-container">
                <div class="player-container">
                    <!-- vTurb -->
                    {{VTURB_PLAYER}}
                    <!-- Fim vTurb -->
                </div>
            </div>

            <p class="volume-notice hide-elements">
                <img src="./assets/images/volume.svg" width="24" height="24" alt="Volume" />
                Bitte überprüfen Sie, ob der Ton eingeschaltet ist.
            </p>
        </header>

        <section class="claim-discount esconder">
            <div class="container">
                <h2 class="section-title">Sichern Sie sich Ihr vergünstigtes {{NOME_PRODUTO}}<span>®</span> <br />solange der Vorrat reicht</h2>
                <div class="claim-timer timer" data-time="1800">00:00</div>
            </div>
        </section>

        <section class="products-section esconder">
            <div class="container">
                <div class="products-container">
                    <div class="product-item most-popular">
                        <a href="{{PRODUCT_1_CHECKOUT_LINK}}" class="product-link"></a>

                        <div class="col">
                            <h3 class="product-title">{{PRODUCT_1_TITLE}}</h3>
                            <p class="product-description">{{PRODUCT_1_SUBTITLE}}</p>

                            <div class="product-image">
                                <img src="./assets/images/products/1.webp" alt="Product Image" />
                                <p class="save">SPARE <span>€{{PRODUCT_1_SAVE}}</span></p>
                            </div>

                            <div class="product-price hide-on-desktop">
                                <span class="product-price-old">€{{PRODUCT_1_PRICE_OLD}}</span>
                                <span class="product-price-new">€{{PRODUCT_1_PRICE_NEW}}</span>
                            </div>
                        </div>

                        <div class="col">
                            <h4 class="price-per-bottle"><b>€</b> {{PRODUCT_1_PRICE_PER_BOTTLE}} <span>/ Dose</span></h4>

                            <div class="product-benefits">
                                <p class="vip-support">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    VIP Premium-Support
                                </p>

                                <p class="shipping">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    KOSTENLOSER Versand
                                </p>
                            </div>

                            <button class="product-button smartplayer-click-event">
                                In den Warenkorb
                                <img src="./assets/images/icons/cart.svg" alt="Cart" />
                            </button>

                            <div class="product-payment-methods">
                                <img src="./assets/images/icons/card-1.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-2.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-3.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-4.png" alt="Payment Method" />
                            </div>

                            <div class="product-price hide-on-mobile">
                                <span class="product-price-old">€{{PRODUCT_1_PRICE_OLD}}</span>
                                <span class="product-price-new">€{{PRODUCT_1_PRICE_NEW}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="product-item bundle">
                        <a href="{{PRODUCT_2_CHECKOUT_LINK}}" class="product-link"></a>

                        <div class="col">
                            <h3 class="product-title">{{PRODUCT_2_TITLE}}</h3>
                            <p class="product-description">{{PRODUCT_2_SUBTITLE}}</p>

                            <div class="product-image">
                                <img src="./assets/images/products/2.webp" alt="Product Image" />
                                <p class="save">SPARE <span>€{{PRODUCT_2_SAVE}}</span></p>
                            </div>

                            <div class="product-price hide-on-desktop">
                                <span class="product-price-old">€{{PRODUCT_2_PRICE_OLD}}</span>
                                <span class="product-price-new">€{{PRODUCT_2_PRICE_NEW}}</span>
                            </div>
                        </div>

                        <div class="col">
                            <h4 class="price-per-bottle"><b>€</b> {{PRODUCT_2_PRICE_PER_BOTTLE}} <span>/ Dose</span></h4>

                            <div class="product-benefits">
                                <p class="vip-support">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    VIP Premium-Support
                                </p>

                                <p class="shipping">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    KOSTENLOSER Versand
                                </p>
                            </div>

                            <button class="product-button smartplayer-click-event">
                                In den Warenkorb
                                <img src="./assets/images/icons/cart.svg" alt="Cart" />
                            </button>

                            <div class="product-payment-methods">
                                <img src="./assets/images/icons/card-1.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-2.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-3.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-4.png" alt="Payment Method" />
                            </div>

                            <div class="product-price hide-on-mobile">
                                <span class="product-price-old">€{{PRODUCT_2_PRICE_OLD}}</span>
                                <span class="product-price-new">€{{PRODUCT_2_PRICE_NEW}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="product-item basic">
                        <a href="{{PRODUCT_3_CHECKOUT_LINK}}" class="product-link"></a>

                        <div class="col">
                            <h3 class="product-title">{{PRODUCT_3_TITLE}}</h3>
                            <p class="product-description">{{PRODUCT_3_SUBTITLE}}</p>

                            <div class="product-image">
                                <img src="./assets/images/products/3.webp" alt="Product Image" />
                            </div>

                            <div class="product-price hide-on-desktop">
                                <span class="product-price-old">€{{PRODUCT_3_PRICE_OLD}}</span>
                                <span class="product-price-new">€{{PRODUCT_3_PRICE_NEW}}</span>
                            </div>
                        </div>

                        <div class="col">
                            <h4 class="price-per-bottle"><b>€</b> {{PRODUCT_3_PRICE_PER_BOTTLE}} <span>/ Dose</span></h4>
                            <p class="shipping">+ €9.99 Versand</p>

                            <button class="product-button smartplayer-click-event">
                                In den Warenkorb
                                <img src="./assets/images/icons/cart.svg" alt="Cart" />
                            </button>

                            <div class="product-payment-methods">
                                <img src="./assets/images/icons/card-1.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-2.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-3.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-4.png" alt="Payment Method" />
                            </div>

                            <div class="product-price hide-on-mobile">
                                <span class="product-price-old">€{{PRODUCT_3_PRICE_OLD}}</span>
                                <span class="product-price-new">€{{PRODUCT_3_PRICE_NEW}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reviews">
                    <h4>Das sagen unsere Kunden</h4>

                    <div class="review-rating">
                        <div class="stars-container">
                            <img src="./assets/images/icons/star.svg" alt="Star" />
                            <img src="./assets/images/icons/star.svg" alt="Star" />
                            <img src="./assets/images/icons/star.svg" alt="Star" />
                            <img src="./assets/images/icons/star.svg" alt="Star" />
                            <img src="./assets/images/icons/star.svg" alt="Star" />
                        </div>

                        <img class="checkmark-icon" src="./assets/images/icons/checkmark.svg" alt="Check" />
                        <p>4.91/5</p>
                    </div>

                    <p class="reviews-count">Basierend auf 79.200+ Bewertungen</p>
                </div>
            </div>
        </section>

        <section class="guarantee-section esconder">
            <div class="container">
                <div class="guarantee-box">
                    <div class="guarantee-header">
                        <img class="star-icon" src="./assets/images/icons/star.svg" />
                        <img class="star-icon" src="./assets/images/icons/star.svg" />

                        <img src="./assets/images/blank.png" class="guarantee-seal placeholder-loader" data-src="./assets/images/guarantee-seal.svg" alt="Guarantee" />

                        <img class="star-icon" src="./assets/images/icons/star.svg" />
                        <img class="star-icon" src="./assets/images/icons/star.svg" />
                    </div>

                    <div class="guarantee-content">
                        <h3>100% Geld-zurück-Garantie</h3>

                        <ul class="guarantee-list">
                            <li><b>100% Geld-zurück-Garantie</b> <i>-</i> Senden Sie uns einfach die Dosen zurück, auch wenn sie leer sind <br />und erhalten Sie eine vollständige Rückerstattung, ohne Fragen.</li>
                            <li>
                                Jede {{NOME_PRODUTO}}-Kapsel wird mit hochwertigen Inhaltsstoffen unter strengsten Standards hergestellt. Vom ersten Tag an steht unser Team bereit, um Ihnen zu helfen, das Beste aus jeder Dosis herauszuholen. Haben Sie Fragen oder sind Sie nicht zufrieden? Wir sind nur einen Anruf oder Klick entfernt.
                            </li>
                            <li>
                                <b>Zufriedenheitsgarantie</b> <i>-</i> Wenn Sie keinen echten Unterschied spüren, wollen wir Ihr Geld nicht. Melden Sie sich einfach und wir erstatten Ihnen den vollen Betrag – ohne Aufwand, ohne Wenn und Aber.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="guarantee-logos">
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/guarantee-1.png" alt="Guarantee" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/guarantee-2.png" alt="Guarantee" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/guarantee-3.png" alt="Guarantee" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/guarantee-4.png" alt="Guarantee" />
                </div>
            </div>
        </section>

        <section class="faq esconder">
            <div class="container">
                <h2>Häufig gestellte Fragen</h2>

                <div class="questions-container">
                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Warum ist {{NOME_PRODUTO}} anders und warum wird es bei mir funktionieren?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                               Im Gegensatz zu den meisten Medikamenten und Nahrungsergänzungsmitteln, die nur Ihr Geld verschwenden, ohne die Ursache des Problems anzugehen, wurde {{NOME_PRODUTO}} speziell entwickelt, um Symptome zu lindern und die natürliche Regeneration zu unterstützen. Jede einzigartige Komponente von {{NOME_PRODUTO}} wurde sorgfältig ausgewählt und durch Hunderte von wissenschaftlichen Studien gestützt.
                            </p>
                        </div>
                    </div>

                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Wie lange dauert es, bis ich die Ergebnisse spüre?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Typischerweise werden Sie die Ergebnisse innerhalb der ersten Woche der Anwendung bemerken. Sie werden spüren, wie die Nährstoffe in Ihrem Körper wirken. In den ersten ein oder zwei Tagen können Sie noch etwas Unbehagen verspüren, aber nach einer Woche konsequenter Anwendung werden Sie wahrscheinlich eine deutliche Verbesserung bemerken. Die bemerkenswertesten Ergebnisse treten jedoch bei fortgesetzter Anwendung über mehr als sechs Monate auf.
                            </p>
                        </div>
                    </div>

                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Hat {{NOME_PRODUTO}} irgendwelche Kontraindikationen?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Im Gegensatz zu 99% der Nahrungsergänzungsmittel und Pillen, die in Apotheken oder online verkauft werden, besteht {{NOME_PRODUTO}} aus 100% natürlichen Inhaltsstoffen, hat keine Nebenwirkungen und macht nicht abhängig. Das bedeutet, dass es von jedem eingenommen werden kann, ohne Kontraindikationen.
                            </p>
                        </div>
                    </div>
                    
                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Wird {{NOME_PRODUTO}} in Geschäften oder auf anderen Websites verkauft?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Aufgrund der hohen Nachfrage erfolgt der Verkauf ausschließlich über diese offizielle Website. Der Weiterverkauf dieses Produkts durch Dritte auf anderen Websites ist strengstens untersagt. Kaufen Sie keine Fälschungen, die Ihre Gesundheit gefährden könnten.
                            </p>
                        </div>
                    </div>

                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Wie soll ich {{NOME_PRODUTO}} einnehmen? Muss ich meinen Lebensstil ändern?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Nehmen Sie einfach jeden Tag 1 Kapsel ein, und Sie werden die Ergebnisse lieben. Ihr Lebensstil wird die Ergebnisse von {{NOME_PRODUTO}} in keiner Weise beeinflussen. Es spielt keine Rolle, was Sie trinken, essen, Ihre Genetik oder Ihr Alter.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <p class="disclaimer">
                2025 Copyright ©. Alle Rechte vorbehalten.<br /><br />
                Alle Inhalte dieser Website sind urheberrechtlich geschützt und dürfen ohne vorherige schriftliche Genehmigung weder kopiert, vervielfältigt, verbreitet noch in irgendeiner Form verwendet werden. Eine unbefugte Nutzung ist strengstens untersagt und kann rechtliche Schritte nach sich ziehen. Dieses Nahrungsergänzungsmittel ist kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung sowie eine gesunde Lebensweise. Diese Aussagen wurden nicht von der Europäischen Behörde für Lebensmittelsicherheit (EFSA) bewertet. Dieses Produkt ist nicht zur Diagnose, Behandlung, Heilung oder Vorbeugung von Krankheiten bestimmt. Die Inhalte dieser Website und das angebotene Produkt beruhen auf der Meinung des Autors und werden ausschließlich „wie gesehen" und „wie verfügbar" bereitgestellt. Bitte führen Sie eigene Recherchen durch und konsultieren Sie andere vertrauenswürdige Quellen. Ziehen Sie immer Ihren Arzt oder eine andere qualifizierte medizinische Fachkraft zu Rate, bevor Sie eines der auf dieser Website dargestellten Protokolle oder Produkte anwenden. Der Autor bietet über diese Website oder das Produkt keine medizinischen oder vergleichbaren professionellen Dienstleistungen oder Ratschläge an. Die bereitgestellten Informationen ersetzen keinesfalls ärztlichen Rat. Der Verkauf dieses Produkts stellt keine Billigung der auf dieser Website geäußerten Ansichten oder eine Garantie für Strategien, Empfehlungen, Behandlungen oder Handlungen des Autors dar.
            </p>

            <a href="policies/terms-of-use/" class="privacy-policy"><u>Nutzungsbedingungen</u></a>
            <a href="policies/disclaimer/" class="terms-of-use"><u>Haftungsausschluss</u></a>
            <a href="policies/privacy-policies/" class="terms-of-use"><u>Datenschutzrichtlinien</u></a>
            <a href="policies/refund-policy/" class="terms-of-use"><u>Rückgaberichtlinien</u></a>
            <a href="policies/shipping-policies/" class="terms-of-use"><u>Versandrichtlinien</u></a>
        </footer>

        <div class="notification">
            <img src="./assets/images/blank.png" alt="" width="45" height="45" class="placeholder-loader" data-src="./assets/images/notificacao.png" />

            <div class="text">
                <h3 class="name">Anna Müller aus Berlin</h3>
                <h4 class="quantity">Kaufte 6 Dosen - {{NOME_PRODUTO}}</h4>
                <h5>
                    <span class="time">vor 18 Minuten</span>
                    <span class="verified">verifiziert</span>
                </h5>
            </div>

            <span class="close"> &times; </span>
        </div>

        <script src="./assets/js/script.js"></script>
        <script src="./assets/js/player.js"></script>
    </body>
</html>
