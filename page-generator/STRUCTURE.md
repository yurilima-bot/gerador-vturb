# 📊 ESTRUTURA COMPLETA DO PROJETO

```
page-generator/
│
├── 📁 backend/                          # Servidor Node.js
│   ├── server.js                        # API Express + geração de arquivos
│   └── package.json                     # Dependências: express, cors, archiver
│
├── 📁 frontend/                         # Interface React
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 UI/                   # Componentes reutilizáveis
│   │   │   │   ├── Input.jsx            # Campo de entrada com validação
│   │   │   │   ├── Input.css
│   │   │   │   ├── Button.jsx           # Botão com variantes
│   │   │   │   └── Button.css
│   │   │   │
│   │   │   ├── 📁 Wizard/               # Sistema de etapas
│   │   │   │   ├── WizardContainer.jsx  # Container principal do wizard
│   │   │   │   ├── WizardContainer.css
│   │   │   │   ├── StepIndicator.jsx    # Indicador visual de progresso
│   │   │   │   └── StepIndicator.css
│   │   │   │
│   │   │   └── 📁 Steps/                # Etapas do formulário
│   │   │       ├── Step1BasicInfo.jsx   # Informações básicas
│   │   │       ├── Step2Videos.jsx      # Configuração de vídeos
│   │   │       ├── Step3Checkout.jsx    # Preços e checkout
│   │   │       └── Step4Preview.jsx     # Preview e download
│   │   │
│   │   ├── App.jsx                      # Componente principal
│   │   ├── main.jsx                     # Entry point React
│   │   └── index.css                    # Estilos globais + variáveis CSS
│   │
│   ├── index.html                       # HTML base
│   ├── vite.config.js                   # Configuração Vite
│   └── package.json                     # Dependências: react, axios, vite
│
├── package.json                         # Scripts de desenvolvimento
├── setup.sh                             # Instalação automática (Linux/Mac)
├── setup.bat                            # Instalação automática (Windows)
├── README.md                            # Documentação completa
├── QUICKSTART.md                        # Guia de início rápido
├── STRUCTURE.md                         # Este arquivo
└── .gitignore                           # Arquivos ignorados pelo Git

```

---

## 🎯 COMPONENTES PRINCIPAIS

### Backend (`server.js`)

**Funções:**
- `generateNotificationsBR()` - Gera notificações em português
- `generateNotificationsEN()` - Gera notificações em inglês
- `convertTimeToSeconds()` - Converte formato de tempo
- `replacePlaceholders()` - Substitui placeholders no template
- `generateScriptJS()` - Gera script.js personalizado
- `generatePlayerJS()` - Gera player.js com configuração de vídeos

**Rotas:**
- `POST /api/generate` - Gera e retorna ZIP com arquivos
- `GET /api/health` - Health check do servidor

---

### Frontend

#### 🧩 Componentes UI

**`Input.jsx`**
- Campo de entrada genérico
- Suporte para text, textarea, select
- Validação de erros
- Labels com "(Opcional)"
- Help text

**`Button.jsx`**
- Variantes: primary, secondary, ghost, success
- Tamanhos: sm, md, lg
- Estado de loading
- Desabilitado

#### 🔄 Sistema Wizard

**`WizardContainer.jsx`**
- Gerencia estado global do formulário
- Controla navegação entre etapas
- Validação antes de avançar
- Marca etapas como concluídas
- Permite voltar para etapas anteriores

**`StepIndicator.jsx`**
- Indicador visual de progresso
- Círculos numerados
- Labels das etapas
- Estados: ativo, concluído, pendente
- Navegação por clique

#### 📋 Etapas

**`Step1BasicInfo.jsx`**
- Nome do produto (obrigatório)
- Idioma (BR/EN)
- Domínio RedTrack (obrigatório)
- ID da campanha (obrigatório)

**`Step2Videos.jsx`**
- Vídeo 1 + delay (obrigatório)
- Vídeos 2 e 3 + delays (opcionais)
- Formato de tempo flexível

**`Step3Checkout.jsx`**
- Link de checkout (obrigatório)
- Preços original e desconto (obrigatórios)
- Links de termos/privacidade (opcionais)

**`Step4Preview.jsx`**
- Resumo de configuração
- Botão de download
- Integração com API backend
- Download automático de ZIP

---

## 🎨 DESIGN SYSTEM

### Variáveis CSS (`index.css`)

```css
--color-bg: #ffffff           /* Fundo principal */
--color-surface: #fafafa      /* Fundo de cards */
--color-border: #e0e0e0       /* Bordas sutis */
--color-text: #1a1a1a         /* Texto principal */
--color-text-secondary: #6b6b6b  /* Texto secundário */
--color-primary: #2563eb      /* Azul primário */
--color-success: #10b981      /* Verde sucesso */
--color-error: #ef4444        /* Vermelho erro */
--shadow-sm/md/lg            /* Sombras em 3 níveis */
--radius: 8px                /* Border radius padrão */
```

### Princípios de Design

1. **Minimalismo** - Apenas o essencial
2. **Espaçamento** - Muito breathing room
3. **Hierarquia** - Tamanhos de fonte claros
4. **Consistência** - Componentes reutilizáveis
5. **Responsividade** - Mobile-first

---

## 🔄 FLUXO DE DADOS

```
Usuario preenche Step 1
    ↓
Validação dos campos obrigatórios
    ↓
Marca Step 1 como concluído
    ↓
Avança para Step 2
    ↓
... (repete para cada step)
    ↓
Step 4: Clica em "Baixar"
    ↓
Frontend envia POST para /api/generate
    ↓
Backend carrega template
    ↓
Backend substitui placeholders
    ↓
Backend gera script.js e player.js
    ↓
Backend cria ZIP com arquivos
    ↓
Frontend recebe blob e inicia download
```

---

## 📦 DEPENDÊNCIAS

### Backend
- `express` - Servidor HTTP
- `cors` - Cross-Origin Resource Sharing
- `archiver` - Criação de arquivos ZIP

### Frontend
- `react` - Biblioteca UI
- `react-dom` - Renderização React
- `axios` - Cliente HTTP
- `vite` - Build tool

### Dev
- `nodemon` - Hot reload backend
- `concurrently` - Rodar múltiplos scripts

---

## 🚀 COMANDOS DISPONÍVEIS

### Na raiz do projeto:
```bash
npm run install:all    # Instala todas dependências
npm run dev           # Inicia backend + frontend
npm run dev:backend   # Apenas backend
npm run dev:frontend  # Apenas frontend
npm run build:frontend # Build de produção
```

### Backend individual:
```bash
cd backend
npm start            # Inicia servidor na porta 3001
npm run dev         # Com hot reload (nodemon)
```

### Frontend individual:
```bash
cd frontend
npm run dev         # Dev server na porta 3000
npm run build      # Build de produção
npm run preview    # Preview do build
```

---

## 📝 PLACEHOLDERS SUPORTADOS

```
{{NOME_PRODUTO}}          → Nome do produto
{{DOMINIO_REDTRACK}}      → Domínio RedTrack
{{ID_CAMPANHA}}           → ID da campanha
{{LINK_CHECKOUT}}         → Link de checkout
{{PRECO_ORIGINAL}}        → Preço original
{{PRECO_DESCONTO}}        → Preço com desconto
{{VIDEO_ID_1}}            → ID do vídeo 1
{{VIDEO_ID_2}}            → ID do vídeo 2
{{VIDEO_ID_3}}            → ID do vídeo 3
{{LINK_TERMOS}}           → Link termos de uso
{{LINK_PRIVACIDADE}}      → Link política privacidade
```

---

## 🎯 PRÓXIMOS PASSOS (Extensões Futuras)

- [ ] Salvamento de configurações (localStorage)
- [ ] Preview visual da página
- [ ] Mais templates (outras nichos)
- [ ] Upload de imagens personalizadas
- [ ] Editor de cores
- [ ] Histórico de páginas geradas
- [ ] Exportação direta para FTP
- [ ] Integração com Hotmart/Eduzz

---

✨ **Estrutura 100% profissional e escalável!**
