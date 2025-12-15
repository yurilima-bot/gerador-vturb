<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <title>Assista ao vídeo</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="shortcut icon" href="./assets/images/favicon.png" type="image/x-icon" />

        <meta
            name="description"
            content="{{NOME_PRODUTO}} é um composto 100% natural, aprovado pela ANVISA e não possui nenhum efeito colateral. Além disso, o {{NOME_PRODUTO}} não tem contra indicações, sendo consumido por milhares de pessoas todos os dias." />

        <link rel="stylesheet" href="./assets/css/reseter.css" />
        <link rel="stylesheet" href="./assets/css/fonts.css" />
        <link rel="stylesheet" href="./assets/css/styles.css" />

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
            <h3 class="viewers">
                <b></b> Pessoas estão assistindo à esse vídeo. <br />
                Devido a alta demanda de acessos, garantimos a apresentação somente até: <span></span>
            </h3>

            <div class="header-container">
                <div class="player-container">
                    <!-- vTurb -->
                    {{VTURB_PLAYER}}
                <!-- Fim vTurb -->
                </div>

                <p class="volume-notice">
                    <img src="./assets/images/volume.svg" width="24" height="24" alt="Volume" />
                    Por favor, verifique se o som está ligado.
                </p>
            </div>
        </header>

        <section class="kits esconder">
            <div class="products-container">
                <a class="product-item smartplayer-click-event smartplayer-scroll-event" href="{{PRODUCT_1_CHECKOUT_LINK}}">
                    <h3 class="product-title">{{PRODUCT_1_TITLE}}</h3>
                    <h4 class="product-subtitle">{{PRODUCT_1_SUBTITLE}}</h4>

                    <img src="./assets/images/blank.png" class="product-image placeholder-loader" width="316" height="316" data-src="./assets/images/products/1.webp" />

                    <div class="price-container">
                        <p class="price-installments">{{PRODUCT_1_INSTALLMENTS}}x de</p>
                        <p class="price-value">R$ {{PRODUCT_1_INSTALLMENT_VALUE}}</p>
                    </div>

                    <button class="product-button">Comprar agora!</button>

                    <p class="total-price">Total: R$ {{PRODUCT_1_ORIGINAL_PRICE}}</p>

                    <p class="shipping">
                        Frete Grátis <img src="./assets/images/blank.png" width="49" height="20" class="placeholder-loader" data-src="./assets/images/shipping.jpg" />
                    </p>

                    <p class="warranty">
                        Garantia de 60 dias
                        <img src="./assets/images/blank.png" width="351" height="55" class="placeholder-loader" data-src="./assets/images/payments.jpg" />
                    </p>
                </a>

                <a class="product-item smartplayer-click-event smartplayer-scroll-event" href="{{PRODUCT_2_CHECKOUT_LINK}}">
                    <h3 class="product-title">{{PRODUCT_2_TITLE}}</h3>
                    <h4 class="product-subtitle">{{PRODUCT_2_SUBTITLE}}</h4>

                    <img src="./assets/images/blank.png" class="product-image placeholder-loader" width="316" height="316" data-src="./assets/images/products/2.webp" />

                    <div class="price-container">
                        <p class="price-installments">{{PRODUCT_2_INSTALLMENTS}}x de</p>
                        <p class="price-value">R$ {{PRODUCT_2_INSTALLMENT_VALUE}}</p>
                    </div>

                    <button class="product-button">Comprar agora!</button>

                    <p class="total-price">Total: R$ {{PRODUCT_2_ORIGINAL_PRICE}}</p>

                    <p class="shipping">
                        Frete Grátis <img src="./assets/images/blank.png" width="49" height="20" class="placeholder-loader" data-src="./assets/images/shipping.jpg" />
                    </p>

                    <p class="warranty">
                        Garantia de 60 dias
                        <img src="./assets/images/blank.png" width="351" height="55" class="placeholder-loader" data-src="./assets/images/payments.jpg" />
                    </p>
                </a>

                <a class="product-item smartplayer-click-event smartplayer-scroll-event" href="{{PRODUCT_3_CHECKOUT_LINK}}">
                    <h3 class="product-title">{{PRODUCT_3_TITLE}}</h3>
                    <h4 class="product-subtitle">{{PRODUCT_3_SUBTITLE}}</h4>

                    <img src="./assets/images/blank.png" class="product-image placeholder-loader" width="316" height="316" data-src="./assets/images/products/3.webp" />

                    <div class="price-container">
                        <p class="price-installments">{{PRODUCT_3_INSTALLMENTS}}x de</p>
                        <p class="price-value">R$ {{PRODUCT_3_INSTALLMENT_VALUE}}</p>
                    </div>

                    <button class="product-button">Comprar agora!</button>

                    <p class="total-price">Total: R$ {{PRODUCT_3_ORIGINAL_PRICE}}</p>

                    <p class="shipping">
                        +R$ 15 de frete <img src="./assets/images/blank.png" width="49" height="20" class="placeholder-loader" data-src="./assets/images/shipping.jpg" />
                    </p>

                    <p class="warranty">
                        Garantia de 60 dias
                        <img src="./assets/images/blank.png" width="351" height="55" class="placeholder-loader" data-src="./assets/images/payments.jpg" />
                    </p>
                </a>
            </div>
        </section>

        <section class="garantia esconder">
            <div class="garantia-container">
                <img
                    class="garantia-image placeholder-loader"
                    src="./assets/images/blank.png"
                    alt="Garantia blindada"
                    title=""
                    width="330"
                    height="330"
                    data-src="./assets/images/garantia.png" />

                <div class="garantia-text">
                    <h2>Garantia Blindada {{NOME_PRODUTO}}</h2>

                    <p>Quando você pedir o {{NOME_PRODUTO}}, também receberá uma <b>garantia blindada de 60 dias em cada frasco</b> para solicitar todo o seu dinheiro de volta.</p>
                    <p>
                        Estamos tão confiantes que o {{NOME_PRODUTO}} vai te trazer resultados, que se você não estiver 100% satisfeito e não notar uma grande melhora na sua qualidade
                        de vida, <b>nós vamos te devolver até o último centavo pago.</b>
                    </p>
                    <p>
                        Basta enviar um e-mail para suporte@wemegalife.com em até 60 dias a partir da sua compra que faremos a devolução integral do seu dinheiro,
                        <b>sem qualquer questionamento!</b>
                    </p>
                    <p>Por isso, faça seu pedido agora. Você não tem absolutamente NADA a perder, e tudo a ganhar.</p>
                </div>
            </div>
        </section>

        <section class="faq esconder">
            <h2>Dúvidas frequentes</h2>

            <div class="questions-container">
                <div class="question-item">
                    <div class="question-item__title">
                        <h3>O que é o {{NOME_PRODUTO}}?</h3>
                        <img class="arrow" width="24" height="24" src="./assets/images/arrow-down.svg" alt="" />
                    </div>

                    <div class="question-item__description">
                        <p>O {{NOME_PRODUTO}} é um composto 100% natural, aprovado pela ANVISA e não possui nenhum efeito colateral.</p>
                        <p>Além disso, o {{NOME_PRODUTO}} não tem contra indicações, sendo consumido por milhares de pessoas todos os dias.</p>
                    </div>
                </div>

                <div class="question-item open">
                    <div class="question-item__title">
                        <h3>Quantos frascos devo pedir?</h3>
                        <img class="arrow" width="24" height="24" src="./assets/images/arrow-down.svg" alt="" />
                    </div>

                    <div class="question-item__description">
                        <p>
                            Os melhores resultados surgem quando você toma o {{NOME_PRODUTO}} por 3 meses ou mais. Dessa forma, ele tem tempo suficiente para agir em todo o seu corpo.
                        </p>
                        <p>Por isso, recomendamos fortemente que você aproveite os pacotes de desconto de 3 ou 5 frascos.</p>
                    </div>
                </div>

                <div class="question-item">
                    <div class="question-item__title">
                        <h3>Como devo tomar o {{NOME_PRODUTO}}?</h3>
                        <img class="arrow" width="24" height="24" src="./assets/images/arrow-down.svg" alt="" />
                    </div>

                    <div class="question-item__description">
                        <p>Basta tomar 1 cápsula todos os dias, após o almoço ou jantar, e você vai adorar os resultados.</p>
                    </div>
                </div>

                <div class="question-item">
                    <div class="question-item__title">
                        <h3>Em quanto tempo posso ver resultados?</h3>
                        <img class="arrow" width="24" height="24" src="./assets/images/arrow-down.svg" alt="" />
                    </div>

                    <div class="question-item__description">
                        <p>Os resultados variam de acordo com o organismo de cada pessoa.</p>
                        <p>Mas os clientes do {{NOME_PRODUTO}} afirmam terem notado sinais de melhora já nos primeiros dias de uso.</p>
                    </div>
                </div>

                <div class="question-item">
                    <div class="question-item__title">
                        <h3>O {{NOME_PRODUTO}} é vendido em farmácia ou em lojas físicas?</h3>
                        <img class="arrow" width="24" height="24" src="./assets/images/arrow-down.svg" alt="" />
                    </div>

                    <div class="question-item__description">
                        <p>Devido à alta demanda, a venda é exclusivamente feita neste site oficial.</p>
                        <p>É totalmente proibida a revenda de terceiros em outros sites. Não compre falsificações que possam colocar sua saúde em perigo.</p>
                    </div>
                </div>

                <div class="question-item">
                    <div class="question-item__title">
                        <h3>E se não funcionar para mim?</h3>
                        <img class="arrow" width="24" height="24" src="./assets/images/arrow-down.svg" alt="" />
                    </div>

                    <div class="question-item__description">
                        <p>Cada frasco do {{NOME_PRODUTO}} vem com nossa garantia blindada de 60 dias.</p>
                        <p>
                            Se, por algum motivo, você não estiver satisfeito com os resultados, basta devolver os frascos (mesmo que vazios), e nós reembolsaremos 100% do seu
                            dinheiro, sem perguntas.
                        </p>
                    </div>
                </div>

                <div class="question-item">
                    <div class="question-item__title">
                        <h3>O que eu faço agora?</h3>
                        <img class="arrow" width="24" height="24" src="./assets/images/arrow-down.svg" alt="" />
                    </div>

                    <div class="question-item__description">
                        <p>Escolha o seu kit acima e clique no botão escrito "Próximo Passo".</p>
                        <p>Na próxima página, basta preencher as suas informações e dizer para onde devemos enviar o seu pedido do {{NOME_PRODUTO}}.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="escolher-meu-kit">
            <button class="escolher-meu-kit__button esconder">Escolher meu kit</button>
        </section>

        <section class="references">
            <h4>Referências Científicas</h4>
            <img
                class="placeholder-loader"
                width="500"
                height="95"
                src="./assets/images/blank.png"
                data-src="./assets/images/referencias-cientificas.png"
                alt="Referências científicas" />
        </section>

        <footer>
            <p class="disclaimer">
                2025 Copyright ©. Todos os direitos reservados.<br /><br />
                Todo o conteúdo deste site, incluindo fotos, imagens, logotipos, marcas e layout, é de propriedade exclusiva do {{NOME_PRODUTO}} e protegido por leis de direitos autorais e propriedade intelectual. A reprodução, modificação ou distribuição sem autorização expressa é proibida.<br /><br />
                A inclusão de qualquer conteúdo ou link neste site não implica endosso, garantia, patrocínio ou recomendação por parte do {{NOME_PRODUTO}}.<br /><br />
                As informações apresentadas neste site não constituem aconselhamento médico e não substituem diagnósticos realizados por um profissional de saúde. Este produto é um suplemento alimentar de uso amplo e não deve ser utilizado como substituto para tratamentos médicos. Sempre consulte um profissional de saúde antes de iniciar o uso.<br /><br />
                Este produto não tem intenção de dar diagnósticos, curas ou prevenir doenças, e não é um medicamento, mas sim um suplemento alimentar de uso amplo.<br /><br />
                Resultados podem variar de pessoa para pessoa e dependem de diversos fatores individuais.<br /><br />
                Depoimentos, estudos de caso e exemplos encontrados nesta página são resultados que nos foram encaminhados por usuários, e podem não refletir a experiência do
                comprador típico, podem não se aplicar a uma pessoa comum e não pretendem representar ou garantir que qualquer pessoa alcançará os mesmos resultados ou resultados
                semelhantes. Alguns nomes e informações de identificação pessoal neste site foram alterados para proteger a privacidade dos indivíduos.<br /><br />
                O conteúdo deste vídeo foi criado exclusivamente para fins publicitários. Todos os personagens e situações apresentadas são interpretados por atores profissionais e
                não representam pessoas reais. Qualquer semelhança com eventos, locais ou indivíduos reais é mera coincidência. As opiniões, atitudes e comportamentos exibidos
                neste vídeo são fictícios e não refletem necessariamente as opiniões ou políticas da empresa responsável pela produção do vídeo. Este vídeo é interpretado por
                atores com a exclusiva intenção de material publicitário. Esse disclaimer abrangente deixa claro tanto a natureza fictícia e publicitária do vídeo quanto as
                importantes informações de saúde e recomendações associadas aos produtos apresentados.<br /><br />
                Para acessar os estudos científicos, <a href="#" style="font-weight: normal; font-size: inherit; text-decoration: underline;"> clique aqui </a>. Caso não consiga através do link, entre em contato com nosso suporte.
            </p>

            <a href="politicas/politica-de-privacidade/" class="privacy-policy"><u>Política de privacidade</u></a>
            <a href="politicas/termos-de-uso/" class="terms-of-use"><u>Termos de uso</u></a>
            <a href="politicas/politica-de-envio-e-estorno/" class="terms-of-use"><u>Política de Envio e Estorno</u></a>
            <a href="politicas/aviso-legal/" class="terms-of-use"><u>Aviso Legal</u></a>
        </footer>

        <div class="notification">
            <img src="./assets/images/blank.png" alt="" width="45" height="45" class="placeholder-loader" data-src="./assets/images/notificacao.png" />

            <div class="text">
                <h3 class="name">Luciana Oliveira, em Minas Gerais</h3>
                <h4 class="quantity">Comprou 6 Frascos - {{NOME_PRODUTO}}</h4>
                <h5>
                    <span class="time">há 18 minutos</span>
                    <span class="verified">verificada</span>
                </h5>
            </div>

            <span class="close"> &times; </span>
        </div>

        <script src="./assets/js/script.js"></script>
        <script src="./assets/js/player.js"></script>
    </body>
</html>
