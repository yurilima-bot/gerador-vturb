# 🚀 GUIA DE INÍCIO RÁPIDO

## ⚡ Instalação Express (Windows)

1. **Execute o script de instalação:**
   ```bash
   setup.bat
   ```

2. **Inicie os servidores (2 terminais):**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Acesse:** `http://localhost:3000`

---

## 📋 Checklist Pré-Uso

Antes de usar o gerador, certifique-se de ter:

- [ ] ✅ Node.js 18+ instalado
- [ ] ✅ Templates (`template-default-br.php` e `template-default-en.php`) na pasta raiz
- [ ] ✅ Backend rodando na porta 3001
- [ ] ✅ Frontend rodando na porta 3000

---

## 🎯 Fluxo de Uso

### Etapa 1: Informações Básicas
- Nome do produto (obrigatório)
- Idioma da página (BR ou EN)
- Domínio RedTrack (obrigatório)
- ID da campanha (obrigatório)

### Etapa 2: Vídeos
- **Vídeo 1** (obrigatório): ID do vTurb + delay opcional
- **Vídeos 2 e 3** (opcionais): IDs + delays

💡 **Formato do delay:** `MM:SS` (ex: 27:30) ou segundos (ex: 1650)

### Etapa 3: Checkout
- Link de checkout (obrigatório)
- Preço original (obrigatório)
- Preço com desconto (obrigatório)
- Links de termos/privacidade (opcionais)

### Etapa 4: Download
- Revise os dados
- Clique em "Baixar Arquivos (ZIP)"
- Extraia o ZIP e faça upload para seu servidor

---

## 🎨 Características do Design

### Estilo Notion
- ✅ Cores neutras (branco, cinza claro, cinza escuro)
- ✅ Muito espaço em branco
- ✅ Bordas sutis e sombras leves
- ✅ Fonte limpa e moderna
- ✅ Centralizado e organizado

### Responsividade
- 📱 **Mobile:** Cards verticais, stepper no topo
- 💻 **Desktop:** Layout horizontal com labels

---

## ❓ FAQ

**P: Posso voltar para etapas anteriores?**  
R: Sim! Clique no número da etapa ou no botão "Voltar"

**P: O que acontece se eu não preencher campos opcionais?**  
R: Você pode avançar normalmente. Campos opcionais são marcados com "(Opcional)"

**P: Onde os arquivos são salvos?**  
R: O ZIP é baixado automaticamente pelo navegador

**P: Posso editar o design?**  
R: Sim! Edite as variáveis CSS em `frontend/src/index.css`

---

## 🆘 Problemas Comuns

### Backend não conecta
```bash
# Verifique se está rodando:
curl http://localhost:3001/api/health
```

### Erro ao gerar página
- ✅ Confirme que os templates estão na pasta correta
- ✅ Verifique o console do backend para erros
- ✅ Certifique-se de ter preenchido todos os campos obrigatórios

### Porta em uso
```bash
# Mude a porta no backend/server.js:
const PORT = 3002; // ou outra porta livre
```

---

## 🎓 Dicas Pro

1. **Salve seus dados:** Copie as informações antes de fechar o navegador
2. **Teste os vídeos:** Verifique se os IDs do vTurb estão corretos
3. **Personalize:** Edite cores e espaçamentos no CSS
4. **Mobile first:** Sempre teste em dispositivos móveis

---

✨ **Pronto para começar!** Abra `http://localhost:3000` e crie sua primeira página!
