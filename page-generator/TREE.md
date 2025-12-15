# 🌳 ÁRVORE DE ARQUIVOS COMPLETA

```
📦 page-generator/
│
├── 📄 package.json                  ← Scripts para rodar tudo junto
├── 📄 .gitignore                    ← Arquivos ignorados pelo Git
│
├── 📘 START.md                      ← LEIA ISTO PRIMEIRO!
├── 📘 README.md                     ← Documentação completa
├── 📘 QUICKSTART.md                 ← Guia rápido de uso
├── 📘 STRUCTURE.md                  ← Estrutura detalhada
│
├── 🔧 setup.bat                     ← Instalação automática (Windows)
├── 🔧 setup.sh                      ← Instalação automática (Linux/Mac)
│
├── 🟢 backend/                      ← Servidor Node.js + Express
│   ├── 📄 package.json              │   express, cors, archiver
│   └── 📄 server.js                 │   API de geração de arquivos
│                                    │   • POST /api/generate
│                                    │   • GET /api/health
│
└── 🔵 frontend/                     ← Interface React + Vite
    ├── 📄 package.json              │   react, axios, vite
    ├── 📄 vite.config.js            │   Configuração Vite
    ├── 📄 index.html                │   HTML base
    │
    └── 📁 src/
        ├── 📄 main.jsx              ← Entry point
        ├── 📄 App.jsx               ← App principal (configura wizard)
        ├── 📄 index.css             ← Estilos globais + variáveis CSS
        │
        └── 📁 components/
            │
            ├── 📁 UI/                    ← Componentes reutilizáveis
            │   ├── Input.jsx             │   Campo genérico
            │   ├── Input.css             │   Estilos do Input
            │   ├── Button.jsx            │   Botão com variantes
            │   └── Button.css            │   Estilos do Button
            │
            ├── 📁 Wizard/                ← Sistema de etapas
            │   ├── WizardContainer.jsx   │   Container principal
            │   ├── WizardContainer.css   │   Estilos do container
            │   ├── StepIndicator.jsx     │   Indicador de progresso
            │   └── StepIndicator.css     │   Estilos do indicador
            │
            └── 📁 Steps/                 ← Etapas do formulário
                ├── Step1BasicInfo.jsx    │   Info básicas (produto, RedTrack)
                ├── Step2Videos.jsx       │   Config de vídeos (vTurb)
                ├── Step3Checkout.jsx     │   Preços e links
                └── Step4Preview.jsx      │   Preview e download
```

---

## 📊 ESTATÍSTICAS DO PROJETO

- **Total de arquivos:** 29
- **Componentes React:** 9
- **Arquivos CSS:** 5
- **Documentação:** 4 arquivos MD
- **Scripts:** 2 (Windows + Linux)

---

## 🎯 ARQUIVOS PRINCIPAIS

### Para USAR o projeto:
1. **START.md** ← Comece aqui!
2. **QUICKSTART.md** ← Guia rápido

### Para ENTENDER o projeto:
1. **README.md** ← Documentação completa
2. **STRUCTURE.md** ← Arquitetura detalhada

### Para DESENVOLVER:
1. **backend/server.js** ← Lógica do servidor
2. **frontend/src/App.jsx** ← Configuração do wizard
3. **frontend/src/components/** ← Componentes React

---

## 🔥 COMPONENTES REACT

### UI Base (Reutilizáveis)
```
Input.jsx    → Campo genérico (text, textarea, select)
Button.jsx   → Botão com estados (primary, ghost, loading)
```

### Sistema Wizard
```
WizardContainer.jsx   → Gerencia estado e navegação
StepIndicator.jsx     → Indicador visual de progresso
```

### Etapas do Formulário
```
Step1BasicInfo.jsx    → Nome, idioma, RedTrack, campanha
Step2Videos.jsx       → Até 3 vídeos + delays
Step3Checkout.jsx     → Preços, links de compra
Step4Preview.jsx      → Resumo + botão de download
```

---

## 🎨 ARQUIVOS DE ESTILO

```css
index.css              → Variáveis CSS + reset + scrollbar
Input.css              → Estilos do componente Input
Button.css             → Estilos do componente Button
WizardContainer.css    → Layout do wizard
StepIndicator.css      → Indicador de progresso
```

**Variáveis CSS disponíveis:**
- `--color-bg`, `--color-surface`, `--color-border`
- `--color-text`, `--color-text-secondary`
- `--color-primary`, `--color-success`, `--color-error`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- `--radius`

---

## 📦 DEPENDÊNCIAS

### Backend (3)
```json
{
  "express": "^4.18.2",      // Servidor HTTP
  "cors": "^2.8.5",          // CORS middleware
  "archiver": "^6.0.1"       // Criação de ZIP
}
```

### Frontend (3)
```json
{
  "react": "^18.2.0",        // Biblioteca UI
  "react-dom": "^18.2.0",    // DOM renderer
  "axios": "^1.6.2"          // HTTP client
}
```

### Dev Dependencies (2)
```json
{
  "nodemon": "^3.0.1",       // Backend hot reload
  "concurrently": "^8.2.2"   // Rodar múltiplos scripts
}
```

---

## 🚀 COMANDOS RÁPIDOS

### Instalar tudo
```bash
npm run install:all
```

### Rodar backend + frontend juntos
```bash
npm run dev
```

### Rodar individualmente
```bash
npm run dev:backend    # Porta 3001
npm run dev:frontend   # Porta 3000
```

---

## 📱 RESPONSIVIDADE

### Desktop (> 768px)
- Layout horizontal
- Labels visíveis
- Stepper completo com texto

### Mobile (≤ 768px)
- Cards verticais
- Stepper simplificado (apenas números)
- Botões em largura total
- Campos maiores (evita zoom no iOS)

---

## ✨ CARACTERÍSTICAS TÉCNICAS

### Frontend
- ✅ React 18 com Hooks
- ✅ Componentes funcionais
- ✅ Estado gerenciado no WizardContainer
- ✅ Props drilling para comunicação
- ✅ CSS Modules evitado (classes únicas)
- ✅ Vite para dev + build rápido

### Backend
- ✅ Express com rotas RESTful
- ✅ Geração dinâmica de arquivos
- ✅ Placeholders substituídos em runtime
- ✅ ZIP criado em memória (sem arquivos temp)
- ✅ CORS habilitado para localhost

### Design
- ✅ Mobile-first approach
- ✅ Variáveis CSS para temas
- ✅ Animações sutis (fadeIn)
- ✅ Estados visuais claros
- ✅ Acessibilidade (labels, focus states)

---

## 🎓 PONTOS DE EXTENSÃO

### Fácil adicionar:
- [ ] Novos steps (copiar Step1 como template)
- [ ] Novos campos (usar componente Input)
- [ ] Novos templates (adicionar em backend)
- [ ] Novas validações (editar função validate)

### Médio adicionar:
- [ ] Temas de cores (duplicar variáveis CSS)
- [ ] Salvamento local (localStorage)
- [ ] Preview visual da página

### Avançado adicionar:
- [ ] Editor WYSIWYG
- [ ] Upload de imagens
- [ ] Integração com APIs externas
- [ ] Deploy automático

---

✨ **Estrutura 100% profissional e escalável!**

📖 **Próximo passo:** Leia o `START.md` para iniciar o projeto
