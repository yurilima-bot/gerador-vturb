# 🚀 Gerador de Páginas VSL

Sistema completo para geração de landing pages VSL (Video Sales Letter) com interface estilo Notion.

## 📁 Estrutura do Projeto

```
page-generator/
├── backend/           # Servidor Node.js + Express
│   ├── server.js      # API para geração de arquivos
│   └── package.json
├── frontend/          # Interface React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── UI/           # Componentes reutilizáveis (Input, Button)
│   │   │   ├── Wizard/       # Sistema de Steps/Wizard
│   │   │   └── Steps/        # Etapas do formulário
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🎯 Funcionalidades

✅ **Sistema de Wizard (Esteiras)** - Navegação por etapas com indicador visual  
✅ **Validação Inteligente** - Campos obrigatórios vs opcionais  
✅ **Design Minimalista** - Inspirado no Notion (cores neutras, muito espaço)  
✅ **100% Responsivo** - Mobile-first, otimizado para todos dispositivos  
✅ **Geração de Arquivos** - Download em ZIP com todos os arquivos  
✅ **Multi-idioma** - Suporte para PT-BR e EN  

## 📦 Instalação

### 1️⃣ Backend

```bash
cd backend
npm install
npm start
```

Servidor rodará em: `http://localhost:3001`

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Interface rodará em: `http://localhost:3000`

## 🎨 Etapas do Wizard

1. **Informações Básicas** - Nome do produto, idioma, RedTrack
2. **Vídeos** - Configuração de até 3 vídeos (vTurb)
3. **Checkout** - Preços, links de compra e políticas
4. **Download** - Revisão e download dos arquivos

## 📥 O que é gerado?

Ao finalizar o wizard, você receberá um arquivo ZIP com:

- `default.php` - Página principal personalizada
- `assets/js/script.js` - Notificações sociais customizadas
- `assets/js/player.js` - Configuração dos vídeos

## 🛠️ Tecnologias

**Backend:**
- Node.js + Express
- Archiver (geração de ZIP)
- CORS

**Frontend:**
- React 18
- Vite
- Axios
- CSS puro (sem frameworks)

## 🎯 Validações

### Campos Obrigatórios:
- Nome do Produto
- Domínio RedTrack
- ID da Campanha
- Pelo menos 1 vídeo
- Link de Checkout
- Preços (original e desconto)

### Campos Opcionais:
- Vídeos 2 e 3
- Delays dos vídeos
- Links de Termos/Privacidade

## 📱 Responsividade

- **Desktop:** Layout horizontal com labels visíveis
- **Tablet:** Layout adaptado, mantém estrutura
- **Mobile:** Cards verticais, stepper simplificado no topo

## 🔥 Como Usar

1. **Inicie o backend** (porta 3001)
2. **Inicie o frontend** (porta 3000)
3. **Acesse** `http://localhost:3000`
4. **Preencha as etapas** do wizard
5. **Baixe o ZIP** com os arquivos gerados
6. **Extraia e faça upload** para seu servidor

## ⚠️ Requisitos

- Node.js 18+ 
- NPM ou Yarn
- Templates base (`template-default-br.php` e `template-default-en.php`)

## 📝 Notas

- Os templates devem estar na pasta raiz do projeto (2 níveis acima do backend)
- O backend busca automaticamente o template correto (BR ou EN)
- Todas as substituições usam placeholders `{{NOME_VARIAVEL}}`

## 🐛 Troubleshooting

**Erro ao gerar página:**
- Verifique se o backend está rodando (porta 3001)
- Confirme que os templates existem no diretório correto

**Campos não validam:**
- Certifique-se de preencher todos os campos obrigatórios
- Campos opcionais não bloqueiam o avanço

**Não consegue voltar etapas:**
- Você pode voltar clicando no número da etapa ou no botão "Voltar"

---

💡 **Dica:** Para personalizar cores, edite as variáveis CSS em `frontend/src/index.css`
