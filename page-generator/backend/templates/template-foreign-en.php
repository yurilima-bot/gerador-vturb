<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Watch the video</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="shortcut icon" href="./assets/images/favicon.png" type="image/x-icon" />

        <meta
            name="description"
            content="{{NOME_PRODUTO}} - Natural solution." />

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
                Please check if the sound is on.
            </p>
        </header>

        <section class="claim-discount esconder">
            <div class="container">
                <h2 class="section-title">Claim Your Discounted {{NOME_PRODUTO}}<span>®</span> <br />Below While Supplies Last</h2>
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
                                <p class="save">SAVE <span>${{PRODUCT_1_SAVE}}</span></p>
                            </div>

                            <div class="product-price hide-on-desktop">
                                <span class="product-price-old">${{PRODUCT_1_PRICE_OLD}}</span>
                                <span class="product-price-new">${{PRODUCT_1_PRICE_NEW}}</span>
                            </div>
                        </div>

                        <div class="col">
                            <h4 class="price-per-bottle"><b>$</b> {{PRODUCT_1_PRICE_PER_BOTTLE}} <span>/ Bottle</span></h4>

                            <div class="product-benefits">
                                <p class="vip-support">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    VIP Premium Support
                                </p>

                                <p class="shipping">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    FREE Shipping
                                </p>
                            </div>

                            <button class="product-button smartplayer-click-event">
                                Add To Cart
                                <img src="./assets/images/icons/cart.svg" alt="Cart" />
                            </button>

                            <div class="product-payment-methods">
                                <img src="./assets/images/icons/card-1.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-2.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-3.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-4.png" alt="Payment Method" />
                            </div>

                            <div class="product-price hide-on-mobile">
                                <span class="product-price-old">${{PRODUCT_1_PRICE_OLD}}</span>
                                <span class="product-price-new">${{PRODUCT_1_PRICE_NEW}}</span>
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
                                <p class="save">SAVE <span>${{PRODUCT_2_SAVE}}</span></p>
                            </div>

                            <div class="product-price hide-on-desktop">
                                <span class="product-price-old">${{PRODUCT_2_PRICE_OLD}}</span>
                                <span class="product-price-new">${{PRODUCT_2_PRICE_NEW}}</span>
                            </div>
                        </div>

                        <div class="col">
                            <h4 class="price-per-bottle"><b>$</b> {{PRODUCT_2_PRICE_PER_BOTTLE}} <span>/ Bottle</span></h4>

                            <div class="product-benefits">
                                <p class="vip-support">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    VIP Premium Support
                                </p>

                                <p class="shipping">
                                    <img src="./assets/images/icons/white-checkmark.svg" alt="Check" />
                                    FREE Shipping
                                </p>
                            </div>

                            <button class="product-button smartplayer-click-event">
                                Add To Cart
                                <img src="./assets/images/icons/cart.svg" alt="Cart" />
                            </button>

                            <div class="product-payment-methods">
                                <img src="./assets/images/icons/card-1.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-2.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-3.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-4.png" alt="Payment Method" />
                            </div>

                            <div class="product-price hide-on-mobile">
                                <span class="product-price-old">${{PRODUCT_2_PRICE_OLD}}</span>
                                <span class="product-price-new">${{PRODUCT_2_PRICE_NEW}}</span>
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
                                <span class="product-price-old">${{PRODUCT_3_PRICE_OLD}}</span>
                                <span class="product-price-new">${{PRODUCT_3_PRICE_NEW}}</span>
                            </div>
                        </div>

                        <div class="col">
                            <h4 class="price-per-bottle"><b>$</b> {{PRODUCT_3_PRICE_PER_BOTTLE}} <span>/ Bottle</span></h4>
                            <p class="shipping">+ $9.99 Shipping</p>

                            <button class="product-button smartplayer-click-event">
                                Add To Cart
                                <img src="./assets/images/icons/cart.svg" alt="Cart" />
                            </button>

                            <div class="product-payment-methods">
                                <img src="./assets/images/icons/card-1.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-2.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-3.png" alt="Payment Method" />
                                <img src="./assets/images/icons/card-4.png" alt="Payment Method" />
                            </div>

                            <div class="product-price hide-on-mobile">
                                <span class="product-price-old">${{PRODUCT_3_PRICE_OLD}}</span>
                                <span class="product-price-new">${{PRODUCT_3_PRICE_NEW}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reviews">
                    <h4>Our Customers Say</h4>

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

                    <p class="reviews-count">Based on 79,200+ reviews</p>
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
                        <h3>100% Money Back Guarantee</h3>

                        <ul class="guarantee-list">
                            <li><b>100% Money Back Guarantee</b> <i>-</i> Just send us the bottles, even if they're empty <br />and get a complete refund, no questions asked.</li>
                            <li>
                                Every {{NOME_PRODUTO}} capsule is crafted with top-quality ingredients under strict standards. From day one, our team is here to help you get the most out
                                of every dose. Have questions or aren't satisfied? We're just a call or click away.
                            </li>
                            <li>
                                <b>Satisfaction Guarantee</b> <i>-</i> If you don't feel a real difference, we don't want your money. Just ask and we'll refund you, no hassle, no hard feelings.
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

        <section class="free-shipping esconder">
            <div class="container">
                <div class="truck">
                    <img src="./assets/images/icons/truck.svg" />
                    <p class="timer hide-on-mobile">00:00</p>
                </div>

                <div class="free-shipping-content">
                    <h2>Order <span>6 Bottles</span> Now & Get <span>FREE SHIPPING</span> Too!</h2>

                    <p>*96% Of Customers Order 6 Bottles (Recommended)</p>
                </div>
            </div>
        </section>

        <section class="quality-assurance esconder">
            <div class="container">
                <div class="quality-assurance-title">
                    <div class="stars-container">
                        <img src="./assets/images/icons/star.svg" alt="Star" />
                        <img src="./assets/images/icons/star.svg" alt="Star" />
                        <img src="./assets/images/icons/star.svg" alt="Star" />
                        <img src="./assets/images/icons/star.svg" alt="Star" />
                        <img src="./assets/images/icons/star.svg" alt="Star" />
                    </div>

                    <h2>100% Quality Assurance</h2>
                </div>

                <p class="hide-on-mobile quality-assurance-description">
                    {{NOME_PRODUTO}} is manufactured to standards above and beyond what is required by the FDA and Good Manufacturing Standards. We 3rd-party test every batch to make
                    sure you get only the highest quality product possible. Our name is on the line and we stand by every bottle of {{NOME_PRODUTO}} we sell.
                </p>

                <div class="quality-assurance-seals">
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-1.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-2.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-3.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-4.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-5.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-6.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-7.png" alt="Quality Assurance" class="hide-on-mobile" />
                </div>

                <div class="quality-assurance-logos">
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-8.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-9.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-10.png" alt="Quality Assurance" />
                    <img src="./assets/images/blank.png" class="placeholder-loader" data-src="./assets/images/quality-assurance-11.png" alt="Quality Assurance" />
                </div>

                <button class="btn-product hide-on-mobile"><span>YES! </span>I'm Ready To Try {{NOME_PRODUTO}}</button>
            </div>
        </section>

        <section class="testimonials esconder">
            <div class="container">
                <h2>Real {{NOME_PRODUTO}}<sup>®</sup> Users. <span>Life Changing Results.</span></h2>

                <img src="./assets/images/testimonials/testimonials-mobile.jpg" alt="Testimonials" class="testimonial-grouped-image hide-on-desktop" />
                <img src="./assets/images/testimonials/testimonials-desktop.jpg" alt="Testimonials" class="testimonial-grouped-image hide-on-mobile" />

                <div class="testimonials-container">
                    <div class="testimonial-item">
                        <div class="testimonial-item-header">
                            <img src="./assets/images/testimonials/1.jpg" class="testimonial-user-image" alt="Testimonial" />

                            <div class="testimonial-item-header-info">
                                <div class="testimonial-rating">
                                    <div class="stars-container">
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                    </div>

                                    <p class="testimonial-rating-text">5 Stars</p>
                                </div>

                                <p class="testimonial-verified">
                                    <img src="./assets/images/icons/checkmark.svg" alt="Check" />
                                    Verified Purchase (6 Bottles)
                                </p>
                            </div>
                        </div>

                        <div class="testimonial-item-content">
                            <p>This is just so mind blowing. The burning and tingling in my feet have almost completely stopped, and I can finally sleep through the night without pain.</p>
                        </div>

                        <div class="testimonial-item-footer">
                            <p class="testimonial-name"><b>Kimberly Carson</b> - Cleveland, OH</p>
                        </div>
                    </div>

                    <div class="testimonial-item">
                        <div class="testimonial-item-header">
                            <img src="./assets/images/testimonials/2.jpg" class="testimonial-user-image" alt="Testimonial" />

                            <div class="testimonial-item-header-info">
                                <div class="testimonial-rating">
                                    <div class="stars-container">
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                    </div>

                                    <p class="testimonial-rating-text">5 Stars</p>
                                </div>

                                <p class="testimonial-verified">
                                    <img src="./assets/images/icons/checkmark.svg" alt="Check" />
                                    Verified Purchase (6 Bottles)
                                </p>
                            </div>
                        </div>

                        <div class="testimonial-item-content">
                            <p>I can finally hold a cup of coffee without my hands shaking or going numb. It's changed my life.</p>
                        </div>

                        <div class="testimonial-item-footer">
                            <p class="testimonial-name"><b>Rossella Kirk</b> - New Orleans LA</p>
                        </div>
                    </div>

                    <div class="testimonial-item">
                        <div class="testimonial-item-header">
                            <img src="./assets/images/testimonials/3.jpg" class="testimonial-user-image" alt="Testimonial" />

                            <div class="testimonial-item-header-info">
                                <div class="testimonial-rating">
                                    <div class="stars-container">
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                        <img src="./assets/images/icons/star.svg" alt="Star" />
                                    </div>

                                    <p class="testimonial-rating-text">5 Stars</p>
                                </div>

                                <p class="testimonial-verified">
                                    <img src="./assets/images/icons/checkmark.svg" alt="Check" />
                                    Verified Purchase (6 Bottles)
                                </p>
                            </div>
                        </div>

                        <div class="testimonial-item-content">
                            <p>Oh, my gosh. The numbness and pain in my legs have greatly improved, and I feel incredible.</p>
                        </div>

                        <div class="testimonial-item-footer">
                            <p class="testimonial-name"><b>Angie Ramiro</b> - Jackson, FL</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="faq esconder">
            <div class="container">
                <h2>Frequently Asked Questions</h2>

                <div class="questions-container">
                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Why is {{NOME_PRODUTO}} different and why will it work for me?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                               Unlike most medications and supplements that just waste your money without addressing the root cause of the problem, {{NOME_PRODUTO}} was specifically developed to help relieve symptoms and support natural regeneration. Each unique component of {{NOME_PRODUTO}} has been carefully selected and is backed by hundreds of scientific studies.
                            </p>
                        </div>
                    </div>

                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>How long will it take for me to start feeling the results?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Typically, results will be seen within the first week of use. You will begin to feel the nutrients working in your body. During the first day or two, you may still feel some discomfort, but after a week of consistent use, you'll likely notice a significant improvement. However, the most remarkable results occur with continued use for more than six months.
                            </p>
                        </div>
                    </div>

                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Does {{NOME_PRODUTO}} have any contraindications?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Unlike 99% of supplements and pills sold in pharmacies or online, {{NOME_PRODUTO}} is made with 100% natural ingredients, has no side effects, and is non-addictive. This means it can be taken by anyone, without contraindications.
                            </p>
                        </div>
                    </div>
                    
                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>Is {{NOME_PRODUTO}} sold in physical stores or on other websites?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Due to high demand, sales are exclusively made through this official website. The resale of this product by third parties on other websites is strictly prohibited. Do not purchase counterfeits that could endanger your health.
                            </p>
                        </div>
                    </div>

                    <div class="question-item">
                        <div class="question-item__title">
                            <h3>How should I take {{NOME_PRODUTO}}? Do I need to change my lifestyle?</h3>
                            <img src="./assets/images/icons/arrow-down.svg" class="question-item__icon" />
                        </div>
                        <div class="question-item__description">
                            <p>
                                Simply take 1 capsule every day, and you'll love the results. Your lifestyle won't affect the results of {{NOME_PRODUTO}} in any way. It doesn't matter what you drink, eat, your genetics, or your age.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <p class="disclaimer">
                2025 Copyright ©. All rights reserved.<br /><br />
                All content on this website is protected by copyright laws and may not be copied, reproduced, distributed, or used in any form without prior written permission. Unauthorized use is strictly prohibited and may result in legal action. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. The website's content and the product for sale is based upon the author's opinion and is provided solely on an "AS IS" and "AS AVAILABLE" basis. You should do your own research and confirm the information with other sources when searching for information regarding health issues and always review the information carefully with your professional health care provider before using any of the protocols presented on this website and/or in the product sold here. The author is not engaged in rendering medical or similar professional services or advice via this website or in the product, and the information provided is not intended to replace medical advice offered by a physician or other licensed healthcare provider. You should not construe the sale of this product as an endorsement of the views expressed herein, or any warranty or guarantee of any strategy, recommendation, treatment, action, or application of advice made by the author of the product.
            </p>

            <a href="policies/terms-of-use/" class="privacy-policy"><u>Terms of Use</u></a>
            <a href="policies/disclaimer/" class="terms-of-use"><u>Disclaimer</u></a>
            <a href="policies/privacy-policies/" class="terms-of-use"><u>Privacy Policies</u></a>
            <a href="policies/refund-policy/" class="terms-of-use"><u>Refund Policy</u></a>
            <a href="policies/shipping-policies/" class="terms-of-use"><u>Shipping Policies</u></a>
        </footer>

        <div class="notification">
            <img src="./assets/images/blank.png" alt="" width="45" height="45" class="placeholder-loader" data-src="./assets/images/notificacao.png" />

            <div class="text">
                <h3 class="name">Emily Johnson, in San Diego</h3>
                <h4 class="quantity">Bought 6 Bottles - {{NOME_PRODUTO}}</h4>
                <h5>
                    <span class="time">18 minutes ago</span>
                    <span class="verified">verified</span>
                </h5>
            </div>

            <span class="close"> &times; </span>
        </div>

        <script src="./assets/js/script.js"></script>
        <script src="./assets/js/player.js"></script>
    </body>
</html>
