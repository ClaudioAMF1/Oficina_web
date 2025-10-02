# 🚀 Guia de Instalação - Heróis da Vida

## 📋 Pré-requisitos

- **Node.js**: versão 18.0.0 ou superior
- **NPM**: versão 8.0.0 ou superior  
- **Navegador**: Chrome, Firefox, Safari ou Edge atualizado

## ⚡ Instalação Rápida

### 1. Extrair o Projeto
```bash
# Extrair o arquivo ZIP
unzip herois-vida-sistema-completo.zip
cd herois-vida-sistema
```

### 2. Instalar Dependências do Backend
```bash
cd backend
npm install
```

### 3. Iniciar o Backend
```bash
npm start
```
✅ Backend estará rodando em: http://localhost:3000

### 4. Iniciar o Frontend (em novo terminal)
```bash
cd ../frontend
npx serve -p 8080 .
```
✅ Frontend estará rodando em: http://localhost:8080

## 🧪 Testar Sistema

1. Abra http://localhost:8080 no navegador
2. Aguarde a tela de loading (3 segundos)
3. Use as credenciais de teste:
   - **Admin**: admin@heroisdevidas.com / admin123
   - **User**: usuario@teste.com / user123

## 🔧 Configuração Avançada

### Variáveis de Ambiente (Opcional)
```bash
cd backend
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### Modo Desenvolvimento
```bash
# Backend com auto-reload
cd backend
npm run dev

# Frontend com Live Server (VS Code)
# Ou qualquer servidor estático
```

## ✅ Verificação

- ✅ Backend: http://localhost:3000/api/health
- ✅ Frontend: http://localhost:8080
- ✅ Login funcional com credenciais de teste
- ✅ Dashboard navegável
- ✅ CRUD de usuários e campanhas funcionando

## 🆘 Solução de Problemas

### Erro "Cannot find module 'express'"
```bash
cd backend
npm install
```

### Porta 3000 já em uso
```bash
# Modificar PORT no backend/.env
PORT=3001
```

### Frontend não carrega
```bash
# Verificar se backend está rodando
curl http://localhost:3000/api/health
```

## 📚 Próximos Passos

1. **Teste o sistema**: Complete o fluxo de login → dashboard → CRUD
2. **Leia a documentação**: docs/README.md
3. **Execute testes SUS**: docs/TESTES-SUS/
4. **Analise segurança**: docs/SEGURANCA/

---

**🎮 Sistema pronto para uso! Salve vidas como um verdadeiro herói! ❤️**
