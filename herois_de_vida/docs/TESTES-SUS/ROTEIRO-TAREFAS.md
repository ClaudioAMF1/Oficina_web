# 📝 Roteiro de Tarefas para Teste SUS

## 🎯 Objetivo do Teste

Avaliar a usabilidade do sistema **Heróis da Vida** através do método SUS (System Usability Scale) com usuários reais, coletando dados para cálculo do score de usabilidade.

## 👥 Perfil dos Participantes

### Critérios de Seleção
- **Idade**: 18-65 anos
- **Escolaridade**: Ensino médio completo ou superior
- **Experiência Digital**: Uso básico de computadores/smartphones
- **Interesse**: Demonstrar interesse no tema de doação de órgãos
- **Disponibilidade**: 30-45 minutos para o teste

### Personas Alvo

#### Persona 1: "Ana, a Profissional da Saúde"
- **Idade**: 32 anos
- **Profissão**: Enfermeira
- **Experiência**: Alta com sistemas digitais
- **Motivação**: Usar tecnologia para conscientização

#### Persona 2: "João, o Cidadão Engajado"
- **Idade**: 45 anos
- **Profissão**: Professor
- **Experiência**: Média com tecnologia
- **Motivação**: Participar de causas sociais

#### Persona 3: "Maria, a Estudante Universitária"
- **Idade**: 22 anos
- **Profissão**: Estudante de Medicina
- **Experiência**: Alta com tecnologia
- **Motivação**: Aprender sobre o processo de doação

---

## 📋 Roteiro de Tarefas

### ⚠️ Instruções Gerais para o Facilitador

1. **Preparação do Ambiente**
   - Sistema rodando em http://localhost:8080
   - Backend ativo em http://localhost:3000
   - Conexão estável com internet
   - Gravação de tela ativada (opcional)

2. **Briefing Inicial**
   - Explicar objetivo do teste (não avaliar o usuário)
   - Incentivar verbalização de pensamentos
   - Informar que não há respostas certas ou erradas
   - Pedir para agir naturalmente

3. **Credenciais Disponíveis**
   - **Admin**: admin@heroisdevidas.com / admin123
   - **User**: usuario@teste.com / user123

---

## 🎮 TAREFA 1: Primeiro Acesso e Login

### 🎯 **Objetivo**
Avaliar a facilidade de acesso inicial ao sistema

### 📝 **Instrução para o Usuário**
*"Imagine que você acabou de saber sobre o sistema Heróis da Vida e quer experimentá-lo. Por favor, acesse o sistema e faça login usando as credenciais de teste disponíveis."*

### ⏱️ **Tempo Esperado**: 2-3 minutos

### ✅ **Critérios de Sucesso**
- [ ] Usuário consegue identificar a tela de login
- [ ] Utiliza as credenciais de teste fornecidas
- [ ] Realiza login com sucesso
- [ ] Acessa o dashboard principal

### 📊 **Métricas a Observar**
- Tempo para localizar campos de login
- Facilidade de uso dos botões de demo
- Compreensão da interface de loading
- Reação ao design gamificado

### 🤔 **Perguntas Pós-Tarefa**
1. "O que mais chamou sua atenção na tela inicial?"
2. "Foi fácil entender como fazer login?"
3. "O que achou do design do sistema?"

---

## 🦸 TAREFA 2: Exploração do Dashboard

### 🎯 **Objetivo**
Avaliar a navegabilidade e compreensão da estrutura do sistema

### 📝 **Instruição para o Usuário**
*"Agora que você está no sistema, explore as diferentes seções disponíveis. Navegue pelas abas e me conte o que você encontra em cada uma."*

### ⏱️ **Tempo Esperado**: 3-5 minutos

### ✅ **Critérios de Sucesso**
- [ ] Identifica as abas de navegação
- [ ] Navega entre diferentes seções
- [ ] Compreende o conceito de missões
- [ ] Explora a seção de heróis

### 📊 **Métricas a Observar**
- Facilidade de navegação entre abas
- Compreensão dos ícones e labels
- Tempo gasto em cada seção
- Verbalizações sobre funcionalidades

### 🤔 **Perguntas Pós-Tarefa**
1. "Qual seção achou mais interessante?"
2. "Foi fácil navegar entre as diferentes áreas?"
3. "O que entendeu sobre o sistema de missões?"

---

## ⚙️ TAREFA 3: Atualização de Perfil

### 🎯 **Objetivo**
Avaliar a facilidade de personalização e atualização de dados

### 📝 **Instruição para o Usuário**
*"Vamos personalizar seu perfil! Vá até a seção de perfil e atualize suas informações. Adicione-se como doador se desejar e salve as alterações."*

### ⏱️ **Tempo Esperado**: 3-4 minutos

### ✅ **Critérios de Sucesso**
- [ ] Localiza a aba de perfil
- [ ] Modifica informações pessoais
- [ ] Compreende a opção de doador
- [ ] Salva as alterações com sucesso

### 📊 **Métricas a Observar**
- Facilidade de localização dos campos
- Compreensão das opções de doação
- Interação com formulários
- Feedback de salvamento

### 🤔 **Perguntas Pós-Tarefa**
1. "Foi fácil encontrar onde editar o perfil?"
2. "O que achou da opção de se tornar doador?"
3. "O sistema deu um bom feedback quando salvou?"

---

## 👥 TAREFA 4: Visualização de Outros Heróis (Admin)

### 🎯 **Objetivo**
Avaliar funcionalidades administrativas e gestão de usuários

### 📝 **Instruição para o Usuário**
*"Agora você irá testar funcionalidades administrativas. Se ainda não fez, faça login como administrador e explore a lista de heróis cadastrados. Tente criar um novo herói."*

**Obs**: Esta tarefa é específica para testar com perfil de administrador

### ⏱️ **Tempo Esperado**: 4-6 minutos

### ✅ **Critérios de Sucesso**
- [ ] Faz login como administrador
- [ ] Acessa a lista de heróis
- [ ] Identifica opções administrativas
- [ ] Cria um novo usuário (se aplicável)

### 📊 **Métricas a Observar**
- Diferenciação entre perfis (user vs admin)
- Facilidade de uso do CRUD de usuários
- Compreensão das permissões
- Interação com formulários administrativos

### 🤔 **Perguntas Pós-Tarefa**
1. "Ficou claro quais são as funcionalidades administrativas?"
2. "Foi fácil gerenciar outros usuários?"
3. "Se sentiu no controle das operações?"

---

## 📢 TAREFA 5: Exploração de Campanhas

### 🎯 **Objetivo**
Avaliar a compreensão e engajamento com campanhas de conscientização

### 📝 **Instruição para o Usuário**
*"Explore a seção de campanhas. Veja as campanhas disponíveis e me conte o que entendeu sobre cada uma. Se for administrador, tente criar uma nova campanha."*

### ⏱️ **Tempo Esperado**: 4-5 minutos

### ✅ **Critérios de Sucesso**
- [ ] Acessa a seção de campanhas
- [ ] Compreende o conceito das campanhas
- [ ] Visualiza progresso e metas
- [ ] Interage com o conteúdo

### 📊 **Métricas a Observar**
- Compreensão do conceito de campanha
- Interpretação dos indicadores de progresso
- Interesse no conteúdo apresentado
- Facilidade de criação (para admins)

### 🤔 **Perguntas Pós-Tarefa**
1. "O que entendeu sobre as campanhas?"
2. "Os indicadores de progresso fazem sentido?"
3. "Se sentiria motivado a participar?"

---

## 📊 Coleta de Dados Pós-Teste

### 📝 **Questionário SUS**
Após completar todas as tarefas, aplicar o questionário SUS padrão com 10 perguntas:

1. Eu acharia que gostaria de usar este sistema com frequência
2. Eu achei o sistema desnecessariamente complexo
3. Eu achei o sistema fácil de usar
4. Eu acho que precisaria do apoio de um suporte técnico para conseguir usar este sistema
5. Eu achei que as várias funções deste sistema estão muito bem integradas
6. Eu acho que há muita inconsistência neste sistema
7. Eu imaginaria que a maioria das pessoas aprenderia a usar este sistema muito rapidamente
8. Eu achei o sistema muito pesado para usar
9. Eu me senti muito confiante usando o sistema
10. Eu precisei aprender várias coisas antes que eu pudesse começar a usar este sistema

**Escala**: 1 (Discordo totalmente) a 5 (Concordo totalmente)

### 📋 **Observações Qualitativas**
- Dificuldades encontradas
- Comentários espontâneos
- Sugestões de melhoria
- Aspectos que mais gostaram
- Aspectos que menos gostaram

### ⏱️ **Métricas Quantitativas**
- Tempo total de teste
- Tempo por tarefa
- Número de erros por tarefa
- Taxa de completude das tarefas
- Número de cliques/interações

---

## 📈 **Metas de Performance**

### 🎯 **Objetivos SUS**
- **Score SUS ≥ 80**: Sistema Excelente
- **Score SUS 70-79**: Sistema Bom  
- **Score SUS 60-69**: Sistema Aceitável
- **Score SUS < 60**: Necessita melhorias

### ⏱️ **Objetivos de Tempo**
- **Tarefa 1**: ≤ 3 minutos
- **Tarefa 2**: ≤ 5 minutos  
- **Tarefa 3**: ≤ 4 minutos
- **Tarefa 4**: ≤ 6 minutos
- **Tarefa 5**: ≤ 5 minutos
- **Total**: ≤ 25 minutos

### ✅ **Taxa de Sucesso**
- **Completude das tarefas**: ≥ 90%
- **Taxa de erro**: ≤ 5%
- **Necessidade de ajuda**: ≤ 10%

---

## 🔄 **Pós-Teste**

### 📊 **Análise dos Resultados**
1. Calcular score SUS usando a planilha fornecida
2. Analisar padrões nas observações qualitativas
3. Identificar pontos de melhoria prioritários
4. Documentar insights principais

### 📝 **Relatório**
Produzir relatório com:
- Score SUS médio e por participante
- Principais dificuldades encontradas
- Pontos fortes identificados
- Recomendações de melhoria
- Próximos passos

### 🚀 **Ações de Melhoria**
Baseado nos resultados, priorizar:
- Ajustes de UX/UI imediatos
- Melhorias de funcionalidade
- Otimizações de performance
- Aprimoramentos de conteúdo

---

**🎮 Lembre-se: O objetivo é aprender com os usuários para tornar o sistema ainda melhor! 💪❤️**
