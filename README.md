# 📄 GERADOR AUTOMÁTICO DE PÁGINAS - GUIA COMPLETO

## 🚀 Instalação e Uso

### 1️⃣ Requisitos

- Node.js instalado (versão 12 ou superior)
- Terminal/CMD

### 2️⃣ Como Usar

```bash
# Execute o gerador
node generator.js
```

## 📋 Menu Principal

Ao executar o gerador, você verá 3 opções:

```
1. Oferta BR (Português - Conteúdo genérico)
2. Oferta GRINGA (Inglês - Conteúdo personalizado)
3. Sair
```

---

## 🇧🇷 OPÇÃO 1: Oferta BR (Português)

### O que faz:

- Carrega conteúdo **genérico em português** (FAQ, garantia, comentários)
- Troca **automaticamente** todos os nomes do produto
- Atualiza notificações no `script.js`
- Gera página pronta para upload

### Dados solicitados:

1. **Nome do Produto** (ex: Prostazen, Mirius, etc)
2. **Domínio Redtrack** (ex: portalverdenatura.shop)
3. **Código vTurb Player** (ID do player)
4. **IDs dos vídeos** (separados por vírgula)
5. **Delays dos vídeos** (em segundos, separados por vírgula)
6. **Pixel ID do Facebook** (código do pixel)

### Exemplo de uso:

```
Nome do Produto: Prostazen
Domínio Redtrack: portalverdenatura.shop
Código vTurb Player: 6866a40367e230ecdfa33cb2
IDs dos Vídeos: 686572147a044f15b36b75fa,68657458034af7f79c7a7168
Delays (segundos): 2352,2350
Facebook Pixel ID: 1661980364669725
```

### O que é gerado automaticamente:

✅ FAQ completo em português com nome do produto
✅ Seção de garantia com nome do produto
✅ Notificações personalizadas (script.js)
✅ Configurações vTurb (player.js)
✅ Todas as menções ao produto atualizadas

---

## 🌎 OPÇÃO 2: Oferta GRINGA (Inglês)

### O que faz:

- Usa template em **inglês**
- Permite inserir conteúdo **personalizado**
- Ideal para mercados internacionais
- Atualiza configurações técnicas

### Dados solicitados:

1. **Nome do Produto**
2. **Domínio Redtrack**
3. **Código vTurb Player**
4. **IDs dos vídeos**
5. **Delays dos vídeos**
6. **Facebook Pixel ID** (opcional para ofertas gringas)

### Diferença da BR:

- Não usa conteúdo genérico
- FAQ/Garantia/Comentários não são incluídos automaticamente
- Estrutura mais limpa para customização manual posterior

---

## 📁 Estrutura de Arquivos

```
Gerador de paginas/
├── generator.js              → Script principal do gerador
├── template-default-br.php   → Template português (BR)
├── template-default-en.php   → Template inglês (GRINGA)
├── content-br.json           → Conteúdo genérico PT-BR
├── package.json              → Configuração Node.js
├── assets/
│   └── js/
│       ├── script.js         → Atualizado com notificações
│       └── player.js         → Atualizado com vídeos/delays
└── default.php               → Arquivo FINAL gerado (upload)
```

---

## 🔧 Configurações Técnicas

### vTurb Player

- **Localização**: `<head>` e `<body>`
- **Atualizado automaticamente** com ID fornecido
- Suporta múltiplos vídeos A/B test

### Redtrack

- Troca **todos os links** `gm.DOMINIO.shop`
- Mantém estrutura `/click`, `/click2`, `/click3`

### Facebook Pixel

- Inserido no `<head>`
- Suporta múltiplos pixels
- Inclui eventos PageView

### Notificações (script.js)

- 25 notificações geradas automaticamente
- Nome do produto inserido em cada uma
- Formato: "Comprou X Frascos - [PRODUTO]"

### Player (player.js)

- Array `vturbVideos` atualizado
- IDs e delays configurados
- Suporta até 10 vídeos diferentes

---

## ✅ Checklist Pré-Upload

Antes de fazer upload para Hostinger, verifique:

- [ ] Nome do produto correto em TODO o arquivo
- [ ] Domínio Redtrack atualizado
- [ ] vTurb player com ID correto
- [ ] Delays configurados corretamente
- [ ] Facebook Pixel funcionando
- [ ] Notificações com nome do produto
- [ ] Imagens na pasta `assets/images/`
- [ ] CSS na pasta `assets/css/`
- [ ] JavaScript na pasta `assets/js/`

---

## 🎯 Dicas de Uso

### Para ofertas BR:

1. Use nomes curtos (ex: Prostazen, Mirius)
2. Delays em segundos (25:30min = 1530 segundos)
3. Teste o vídeo antes de configurar delays

### Para ofertas GRINGA:

1. Mantenha consistência de idioma
2. Revise preços e moedas manualmente
3. Adapte textos de garantia se necessário

### Conversão Minutos → Segundos:

```
5:00  = 300 segundos
10:30 = 630 segundos
25:30 = 1530 segundos
30:00 = 1800 segundos
```

---

## 🐛 Resolução de Problemas

### Erro: "Template não encontrado"

- Verifique se `template-default-br.php` e `template-default-en.php` existem
- Execute o gerador na pasta correta

### Notificações não aparecem

- Verifique se `assets/js/script.js` existe
- Confirme permissões de escrita na pasta

### Player não carrega

- Confira o ID do vTurb
- Verifique conexão com CDN no navegador

### Redtrack não rastreia

- Confirme se o domínio está correto
- Teste os links `/click`, `/click2`, `/click3`

---

## 📞 Suporte

Em caso de dúvidas:

1. Revise este README
2. Verifique os arquivos gerados
3. Teste em ambiente local antes do upload

---

## 🔄 Atualizações Futuras

Melhorias planejadas:

- [ ] Modo batch (gerar múltiplas páginas)
- [ ] Validação de IDs vTurb
- [ ] Preview antes de gerar
- [ ] Backup automático de versões anteriores

---

**Versão:** 2.0  
**Data:** Dezembro 2025  
**Compatibilidade:** Node.js 12+
