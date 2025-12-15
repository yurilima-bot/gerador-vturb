#!/bin/bash

echo "🚀 Inicializando Gerador de Páginas VSL..."
echo ""

# Backend
echo "📦 Instalando dependências do Backend..."
cd backend
npm install
echo "✅ Backend pronto!"
echo ""

# Frontend
echo "📦 Instalando dependências do Frontend..."
cd ../frontend
npm install
echo "✅ Frontend pronto!"
echo ""

echo "✨ Instalação concluída!"
echo ""
echo "Para iniciar o projeto:"
echo "  1. Terminal 1: cd backend && npm start"
echo "  2. Terminal 2: cd frontend && npm run dev"
echo ""
echo "Acesse: http://localhost:3000"
