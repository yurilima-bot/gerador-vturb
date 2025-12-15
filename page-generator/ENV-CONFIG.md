# 📝 Configuração de Variáveis de Ambiente

## Backend

1. **Copie o arquivo de exemplo:**
   ```bash
   cd page-generator/backend
   cp .env.example .env
   ```

2. **Edite o `.env` com suas configurações:**
   ```env
   PORT=3001
   CORS_ORIGIN=http://localhost:3000,https://seu-frontend.vercel.app
   NODE_ENV=development
   ```

3. **Instale a dependência dotenv:**
   ```bash
   npm install
   ```

## Frontend

1. **Copie o arquivo de exemplo:**
   ```bash
   cd page-generator/frontend
   cp .env.example .env
   ```

2. **Edite o `.env` com a URL do backend:**
   ```env
   VITE_API_URL=http://localhost:3001
   ```

## Deploy no Vercel

### Backend:
```bash
cd page-generator/backend
vercel env add PORT
vercel env add CORS_ORIGIN
vercel env add NODE_ENV
```

Ou via Dashboard:
- `PORT` → Deixe vazio (Vercel define automaticamente)
- `CORS_ORIGIN` → `https://seu-frontend.vercel.app`
- `NODE_ENV` → `production`

### Frontend:
```bash
cd page-generator/frontend
vercel env add VITE_API_URL
```

Ou via Dashboard:
- `VITE_API_URL` → `https://seu-backend.vercel.app`

## ⚠️ Importante

- Arquivos `.env` não são versionados (estão no `.gitignore`)
- Apenas `.env.example` deve ser commitado
- Nunca exponha suas credenciais no código
- Após alterar variáveis no Vercel, faça redeploy do projeto
