# 📖 Como Usar o Sistema Heróis da Vida

## 🎮 Primeiro Acesso

### 1. Iniciar o Sistema
- Abra http://localhost:8080 no navegador
- Aguarde a animação de loading (mostra progresso e badges de segurança)
- O sistema redirecionará automaticamente para o login

### 2. Fazer Login
**Opção 1: Credenciais Manuais**
- Email: admin@heroisdevidas.com
- Senha: admin123

**Opção 2: Botões Demo (Recomendado)**
- Clique no card "🔱 Super Admin" para admin
- Clique no card "⚔️ Herói" para usuário comum
- As credenciais são preenchidas automaticamente

### 3. Acessar Dashboard
- Após login bem-sucedido, você será direcionado ao dashboard
- O header mostra suas informações de usuário
- A navegação possui 4 abas principais

## 🎯 Navegação Principal

### 🎯 Aba Missões
**O que é**: Central de tarefas gamificadas para engajar usuários

**Funcionalidades**:
- **Missões Diárias**: Tarefas como fazer login, visualizar heróis
- **Desafios Semanais**: Metas de longo prazo com calendário
- **Sistema de Recompensas**: XP e gemas por completar missões
- **Progresso Visual**: Barras de progresso e indicadores

**Como usar**:
1. Visualize missões disponíveis nos cards
2. Clique em "Começar" para missões ativas
3. Complete a tarefa (exemplo: ir para aba Heróis)
4. Receba XP e feedback visual de conclusão

### 🦸 Aba Heróis (CRUD de Usuários)
**O que é**: Gestão completa de usuários do sistema

**Para Usuários Comuns**:
- Visualizar lista de heróis cadastrados
- Ver informações públicas (nome, role, status doador)
- Editar apenas próprio perfil

**Para Administradores**:
- **CREATE**: Botão "Novo Herói" → Formulário completo
- **READ**: Visualizar todos os usuários com detalhes
- **UPDATE**: Botão "Editar" em qualquer usuário → Modal de edição
- **DELETE**: Botão "Excluir" (não pode excluir a si mesmo)

**Como usar (Admin)**:
1. Clique "Novo Herói" para abrir formulário
2. Preencha: nome, email, senha, role (user/admin)
3. Clique "Recrutar Herói" para salvar
4. Para editar: clique "Editar" no card do usuário
5. Para excluir: clique "Excluir" e confirme

### 📢 Aba Campanhas (CRUD de Campanhas)
**O que é**: Gestão de campanhas de conscientização sobre doação

**Funcionalidades**:
- Visualizar campanhas ativas com progresso visual
- Cards mostram: órgão alvo, meta, atual, descrição
- Admins podem criar/editar/excluir campanhas

**Como usar (Admin)**:
1. Clique "Nova Campanha" para criar
2. Preencha: título, descrição, órgão alvo, meta
3. Sistema mostra progresso com barras visuais
4. Acompanhe métricas de participação

### ⚙️ Aba Perfil
**O que é**: Personalização do usuário logado

**Funcionalidades**:
- **Header Visual**: Avatar grande, nível, classe, estatísticas
- **Informações Pessoais**: Nome, email, senha (opcional)
- **Habilidades**: Checkbox para "Doador de Vida"
- **Salvamento**: Atualiza dados via API

**Como usar**:
1. Modifique nome/email conforme necessário
2. Marque "Doador de Vida" se aplicável
3. Clique "Salvar Alterações"
4. Sistema confirma com toast de sucesso

## 🔧 Funcionalidades Especiais

### Sistema de Gamificação
- **XP**: Ganhe pontos completando missões
- **Níveis**: Progrida conforme acumula XP
- **Conquistas**: Desbloqueie medalhas por ações específicas
- **Missões**: Tarefas diárias e semanais

### Sistema de Notificações
- **Toasts**: Notificações no canto superior direito
- **Cores**: Verde (sucesso), vermelho (erro), azul (info)
- **Auto-dismiss**: Desaparecem automaticamente

### Responsividade
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptado com navegação horizontal
- **Mobile**: Navegação colapsada, layout vertical

## 🛡️ Recursos de Segurança

### Controle de Acesso
- **JWT Tokens**: Autenticação segura com expiração
- **Roles**: Admin vs User com permissões diferenciadas
- **Rate Limiting**: Proteção contra força bruta

### Proteção de Dados
- **Senhas Criptografadas**: bcrypt com 12 rounds
- **Sanitização**: Dados sensíveis removidos das respostas
- **Headers Seguros**: Helmet.js para proteção HTTP

## 💡 Dicas de Uso

### Para Testes
1. **Use sempre as credenciais demo** para garantir funcionamento
2. **Teste ambos os perfis**: admin tem mais funcionalidades
3. **Explore todas as abas** para ver funcionalidades completas

### Para Administradores
1. **Crie usuários de teste** para ver o CRUD funcionando
2. **Lance campanhas variadas** para testar diferentes órgãos
3. **Monitor logs no console** para debug se necessário

### Para Demonstrações
1. **Comece com loading screen** para mostrar animações
2. **Use botões demo** para login rápido
3. **Navegue por todas as abas** mostrando cada funcionalidade
4. **Destaque a gamificação** (XP, missões, conquistas)

## 🚨 Resolução de Problemas

### Dashboard não carrega
- **Verificar**: Backend está rodando?
- **Testar**: http://localhost:3000/api/health
- **Solução**: Reiniciar backend com `npm start`

### Dados não salvam
- **Verificar**: Console do navegador (F12)
- **Possível**: Erro de CORS ou API offline
- **Solução**: Verificar se ambos (frontend/backend) estão rodando

### Botões não funcionam
- **Verificar**: JavaScript carregou corretamente
- **Possível**: Erro no console JavaScript
- **Solução**: Recarregar página (F5)

### Performance lenta
- **Verificar**: Muitos dados ou processamento pesado
- **Solução**: Sistema usa dados em memória, deve ser rápido

## 📊 Entendendo os Dados

### Usuários Demo
- **Admin**: Possui todas as permissões, pode criar/editar/excluir
- **User**: Permissões limitadas, só edita próprio perfil

### Campanhas Demo
- **Coração Solidário**: 245/1000 (24% da meta)
- **Doe Vida - Rins**: 123/500 (24% da meta)
- **Visão do Futuro**: 89/300 (30% da meta)

### Sistema de XP
- **Login diário**: +50 XP
- **Visualizar heróis**: +100 XP
- **Atualizar perfil**: +200 XP
- **Níveis**: Baseados no XP acumulado

---

**🎮 Explore todas as funcionalidades e divirta-se salvando vidas! 💪❤️**
