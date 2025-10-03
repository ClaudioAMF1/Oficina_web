# 🎮 Heróis de Vidas - Sistema Gamificado de Doação de Órgãos

## 📋 Visão Geral

O **Heróis de Vidas** é um sistema gamificado inovador para conscientização e gestão de doação de órgãos. Desenvolvido com foco na segurança (OWASP A01 e A02), experiência do usuário e metodologias ágeis.

## 🚀 Funcionalidades Principais

### 🎯 Para Usuários
- **Sistema Gamificado**: Missões, XP, níveis e conquistas
- **Perfil Personalizável**: Informações de doador e preferências
- **Campanhas Interativas**: Participação em campanhas de conscientização
- **Dashboard Intuitivo**: Interface moderna e responsiva

### 🔧 Para Administradores
- **CRUD Completo**: Gestão de usuários e campanhas
- **Painel Administrativo**: Controle total do sistema
- **Relatórios**: Acompanhamento de métricas e resultados

### 🛡️ Segurança (OWASP)
- **A01 - Broken Access Control**: Controle rigoroso de acesso baseado em roles
- **A02 - Cryptographic Failures**: Criptografia segura para senhas e dados sensíveis

## 📁 Estrutura do Projeto

```
herois-vida-sistema/
├── 📂 frontend/              # Interface do usuário (HTML/CSS/JS)
│   ├── index.html           # Página principal navegável
│   ├── style.css            # Estilos gamificados (2500+ linhas)
│   └── app.js               # JavaScript funcional (CRUD completo)
├── 📂 backend/              # API Node.js segura
│   ├── server.js            # Servidor principal com OWASP protection
│   ├── package.json         # Dependências do backend
│   └── .env.example         # Variáveis de ambiente
├── 📂 docs/                 # Documentação técnica
│   ├── UX-UI/              # Documentação de UX/UI
│   ├── SEGURANCA/          # Análise de segurança OWASP
│   └── TESTES-SUS/         # Materiais para teste SUS
└── README.md               # Este arquivo
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18.0.0 ou superior
- npm ou yarn
- Navegador moderno

### 1. Instalar Backend
```bash
cd backend
npm install
npm start
```

### 2. Instalar Frontend
```bash
cd frontend
npx serve -p 8080 .
# Ou use Live Server no VS Code
```

### 3. Acessar Sistema
- **Frontend**: http://localhost:8080
- **API**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## 👤 Contas de Teste

### Administrador
- **Email**: admin@heroisdevidas.com
- **Senha**: admin123
- **Privilégios**: Acesso completo ao sistema

### Usuário Regular
- **Email**: usuario@teste.com  
- **Senha**: user123
- **Privilégios**: Funcionalidades básicas

## 🎮 Como Usar o Sistema

### 1. Login
1. Abra o sistema no navegador
2. Aguarde a tela de loading
3. Use as credenciais de teste ou clique nos botões de demo
4. Clique em "Iniciar Missão"

### 2. Dashboard
- **🎯 Missões**: Complete tarefas para ganhar XP
- **🦸 Heróis**: Visualize e gerencie usuários
- **📢 Campanhas**: Participe de campanhas de conscientização
- **⚙️ Perfil**: Personalize suas informações

### 3. Funcionalidades Admin
- Criar/editar/excluir usuários
- Gerenciar campanhas
- Visualizar relatórios e métricas

## 🛡️ Segurança Implementada

### OWASP A01 - Broken Access Control
✅ **Autenticação JWT**: Tokens seguros com expiração  
✅ **Autorização baseada em Roles**: Admin vs User  
✅ **Controle de Recursos**: Usuários só acessam próprios dados  
✅ **Rate Limiting**: Proteção contra ataques de força bruta  

### OWASP A02 - Cryptographic Failures  
✅ **Hashing Seguro**: bcrypt com salt rounds 12  
✅ **JWT Seguro**: Secret forte e assinatura verificada  
✅ **Sanitização**: Remoção de dados sensíveis nas respostas  
✅ **Headers de Segurança**: Helmet.js para proteções HTTP  

## 📊 Testes de Usabilidade (SUS)

O sistema inclui materiais completos para teste SUS:
- Roteiro de tarefas para usuários
- Questionário SUS padrão
- Planilha de cálculo automático
- Personas e cenários de uso

Localização: `docs/TESTES-SUS/`

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário

### Usuários (CRUD)
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário (admin)
- `GET /api/users/:id` - Obter usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Excluir usuário (admin)

### Campanhas (CRUD)
- `GET /api/campaigns` - Listar campanhas
- `POST /api/campaigns` - Criar campanha (admin)
- `GET /api/campaigns/:id` - Obter campanha
- `PUT /api/campaigns/:id` - Atualizar campanha
- `DELETE /api/campaigns/:id` - Excluir campanha (admin)

## 🎨 Design System

### Cores Principais
- **Primary**: `#667eea` (Azul heroico)
- **Secondary**: `#764ba2` (Roxo real)
- **Success**: `#28a745` (Verde vida)
- **Error**: `#dc3545` (Vermelho alerta)

### Componentes
- Botões gamificados com animações
- Cards responsivos e interativos
- Formulários com validação visual
- Modais e toasts informativos

## 🚀 Deploy em Produção

### Backend (Node.js)
1. Configure as variáveis de ambiente
2. Use um banco de dados real (PostgreSQL/MongoDB)
3. Configure HTTPS e certificados SSL
4. Use PM2 para gerenciamento de processos

### Frontend
1. Configure um servidor web (nginx/Apache)
2. Ajuste as URLs da API
3. Configure cache e compressão
4. Implemente CDN para assets

## 🧪 Testes

### Backend
```bash
cd backend
npm test
```

### Frontend
- Testes manuais com diferentes navegadores
- Testes de responsividade
- Testes de usabilidade com usuários reais

## 📚 Documentação Técnica

- **UX/UI**: `docs/UX-UI/`
- **Segurança**: `docs/SEGURANCA/`
- **Testes SUS**: `docs/TESTES-SUS/`
- **API**: Documentação inline no código

## 👥 Equipe

- **Frontend Developer**: Claudio Meireles
- **Backend Developer**: Lucas Fiche
- **UX/UI Designer**: Pedro Araújo
- **Security Analyst**: Felipe Dutra

---

## 🏆 Objetivos Alcançados

✅ **Protótipo Navegável**: Interface completa e funcional  
✅ **CRUD Funcional**: Operações Create, Read, Update, Delete  
✅ **Segurança OWASP**: A01 e A02 implementados  
✅ **Testes SUS**: Materiais completos para avaliação  
✅ **Gamificação**: Sistema de XP, níveis e missões  
✅ **Responsividade**: Compatível com todos os dispositivos  

---

**🎮 Salve vidas como um verdadeiro herói! 💪❤️**
