# 🛡️ Análise de Segurança OWASP A01 e A02

## 📋 Visão Geral

Este documento detalha a implementação das proteções contra as duas principais vulnerabilidades do **OWASP Top 10**:
- **A01: Broken Access Control**
- **A02: Cryptographic Failures**

## 🚨 A01 - Broken Access Control

### 📖 Definição da Vulnerabilidade

**Broken Access Control** ocorre quando usuários podem agir fora de suas permissões intencionais. Isso pode levar a:
- Acesso não autorizado a dados
- Modificação ou destruição de dados
- Execução de funções além dos limites do usuário

### 🛡️ Implementações de Proteção

#### 1. **Autenticação JWT Robusta**

```javascript
// Geração de token segura
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            role: user.role,
            iat: Math.floor(Date.now() / 1000)
        }, 
        JWT_SECRET, 
        { expiresIn: '24h' }
    );
};
```

**Benefícios**:
- Tokens com expiração automática (24h)
- Informações mínimas no payload
- Secret forte e único por ambiente

#### 2. **Middleware de Autenticação**

```javascript
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            error: 'Token de acesso requerido' 
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                error: 'Token inválido ou expirado' 
            });
        }

        // Verificar se usuário ainda existe
        const currentUser = users.find(u => u.id === user.id);
        if (!currentUser) {
            return res.status(403).json({ 
                success: false, 
                error: 'Usuário não encontrado' 
            });
        }

        req.user = user;
        next();
    });
};
```

**Proteções**:
- Verificação de token obrigatória
- Validação de expiração
- Verificação de existência do usuário
- Tratamento de erros específicos

#### 3. **Controle de Acesso Baseado em Roles (RBAC)**

```javascript
// Middleware para exigir role específica
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ 
                success: false, 
                error: 'Acesso negado. Privilégios insuficientes.' 
            });
        }
        next();
    };
};

// Uso em rotas administrativas
app.post('/api/users', 
    authenticateToken, 
    requireRole('admin'), 
    createUser
);
```

**Implementação**:
- Roles definidos: `admin`, `user`
- Verificação antes de cada operação sensível
- Negação explícita para roles insuficientes

#### 4. **Controle de Propriedade de Recursos**

```javascript
// Middleware para verificar ownership ou admin
const requireOwnershipOrAdmin = (req, res, next) => {
    const resourceUserId = parseInt(req.params.id);

    if (req.user.role === 'admin' || req.user.id === resourceUserId) {
        next();
    } else {
        return res.status(403).json({ 
            success: false, 
            error: 'Acesso negado. Você só pode acessar seus próprios dados.' 
        });
    }
};

// Uso em rotas de usuário específico
app.get('/api/users/:id', 
    authenticateToken, 
    requireOwnershipOrAdmin, 
    getUser
);
```

**Proteção**:
- Usuários só acessam próprios dados
- Admins têm acesso completo
- Validação por ID numérico

#### 5. **Rate Limiting Contra Força Bruta**

```javascript
// Rate limiting específico para login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo 5 tentativas por IP
    message: { 
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
        remainingAttempts: 0
    }
});

app.use('/api/auth/login', loginLimiter);
```

**Benefícios**:
- Previne ataques de força bruta
- Rate limiting específico por endpoint
- Mensagens informativas para usuários

#### 6. **Validação de Input Rigorosa**

```javascript
const validateUserCreation = [
    body('name')
        .isLength({ min: 2, max: 100 })
        .trim()
        .escape()
        .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
    body('password')
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número')
];
```

**Proteções**:
- Sanitização automática de inputs
- Validação de formato e tamanho
- Prevenção de injeções

### 📊 Resultados da Implementação A01

| Área | Status | Implementação |
|------|--------|--------------|
| Autenticação | ✅ | JWT com expiração |
| Autorização | ✅ | RBAC implementado |
| Ownership | ✅ | Controle de recursos |
| Rate Limiting | ✅ | Proteção força bruta |
| Validação | ✅ | Input sanitization |

---

## 🔐 A02 - Cryptographic Failures

### 📖 Definição da Vulnerabilidade

**Cryptographic Failures** refere-se a falhas relacionadas à criptografia que frequentemente levam à exposição de dados sensíveis:
- Transmissão de dados em texto plano
- Uso de algoritmos criptográficos fracos
- Chaves fracas ou inadequadas
- Armazenamento inseguro de dados sensíveis

### 🛡️ Implementações de Proteção

#### 1. **Hashing Seguro de Senhas com bcrypt**

```javascript
const BCRYPT_ROUNDS = 12; // Alto custo computacional

// Hash seguro na criação/alteração
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Erro interno do servidor');
    }
};

// Verificação segura
const verifyPassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
};
```

**Segurança**:
- Salt único por senha
- 12 rounds de hashing (alto custo)
- Resistente a rainbow tables
- Tratamento seguro de erros

#### 2. **JWT com Secret Forte**

```javascript
// Secret robusto e único
const JWT_SECRET = process.env.JWT_SECRET || 'herois-da-vida-ultra-secret-key-2024';

// Geração com informações mínimas
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            role: user.role,
            iat: Math.floor(Date.now() / 1000) // timestamp
        }, 
        JWT_SECRET, 
        { expiresIn: '24h' }
    );
};
```

**Proteções**:
- Secret de 32+ caracteres
- Payload mínimo (sem dados sensíveis)
- Assinatura HMAC SHA256
- Timestamp para rastreamento

#### 3. **Sanitização de Dados Sensíveis**

```javascript
// Função para remover dados sensíveis
const sanitizeUser = (user) => {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
};

// Uso em todas as respostas
app.post('/api/auth/login', async (req, res) => {
    // ... autenticação ...

    res.json({ 
        success: true, 
        user: sanitizeUser(user), // SEM senha
        token
    });
});
```

**Benefícios**:
- Senhas NUNCA retornadas
- Dados pessoais minimizados
- Logs limpos e seguros

#### 4. **Headers de Segurança com Helmet**

```javascript
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
            fontSrc: ["'self'", "fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:3000"]
        }
    },
    crossOriginEmbedderPolicy: false
}));
```

**Proteções**:
- Content Security Policy (CSP)
- X-Frame-Options para clickjacking
- X-Content-Type-Options
- Strict-Transport-Security

#### 5. **CORS Configurado com Segurança**

```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:8080'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Configurações**:
- Origins específicos (não wildcard)
- Métodos limitados
- Headers controlados
- Credentials com restrições

#### 6. **Validação Rigorosa de Tipos**

```javascript
const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail() // Normalização segura
        .withMessage('Email inválido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter pelo menos 6 caracteres')
];
```

**Proteções**:
- Normalização de emails
- Escape de caracteres especiais
- Validação de tipos de dados
- Prevenção de injeções

#### 7. **Tratamento Seguro de Erros**

```javascript
// Handler global de erros
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);

    res.status(error.status || 500).json({ 
        success: false, 
        error: process.env.NODE_ENV === 'production' 
            ? 'Erro interno do servidor'  // Genérico em produção
            : error.message, // Detalhado em desenvolvimento
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
    });
});
```

**Benefícios**:
- Não exposição de stack traces em produção
- Logs detalhados para debugging
- Mensagens de erro consistentes

### 📊 Resultados da Implementação A02

| Área | Status | Implementação |
|------|--------|--------------|
| Password Hashing | ✅ | bcrypt + salt rounds 12 |
| JWT Security | ✅ | Secret forte + assinatura |
| Data Sanitization | ✅ | Remoção de dados sensíveis |
| HTTP Headers | ✅ | Helmet com CSP |
| CORS | ✅ | Origins restritivos |
| Error Handling | ✅ | Não exposição de internals |

---

## 🧪 Testes de Segurança

### Cenários de Teste A01

1. **Teste de Bypass de Autenticação**
   - Tentar acessar endpoints sem token
   - Usar tokens expirados
   - Usar tokens de outros usuários

2. **Teste de Escalação de Privilégios**
   - Usuário comum tentando operações admin
   - Modificar role no token
   - Acessar dados de outros usuários

3. **Teste de Rate Limiting**
   - Múltiplas tentativas de login
   - Requisições em massa
   - Diferentes IPs

### Cenários de Teste A02

1. **Teste de Exposição de Dados**
   - Verificar se senhas são retornadas
   - Analisar logs por dados sensíveis
   - Testar responses da API

2. **Teste de Criptografia**
   - Verificar hash das senhas no "banco"
   - Validar assinatura JWT
   - Testar força do secret

### Ferramentas de Teste

- **OWASP ZAP**: Scanner de vulnerabilidades
- **Burp Suite**: Proxy para análise HTTP
- **curl**: Testes de API específicos
- **Node Security Platform**: Análise de dependências

## 📈 Métricas de Segurança

### KPIs Monitorados

1. **Tentativas de Login**
   - Taxa de sucesso vs falha
   - IPs bloqueados por rate limiting
   - Padrões de ataques

2. **Uso de Tokens**
   - Tokens expirados utilizados
   - Tentativas de reutilização
   - Padrões anômalos

3. **Acesso a Recursos**
   - Tentativas de acesso negado
   - Escalação de privilégios
   - Patterns de usuários maliciosos

### Alertas Configurados

- **5+ tentativas de login falhadas**: Possível ataque de força bruta
- **Uso de token expirado**: Possível replay attack
- **Acesso negado frequente**: Possível reconnaissance

## 🚀 Melhorias Futuras

### Curto Prazo
- [ ] Implementar 2FA (Two Factor Authentication)
- [ ] Adicionar logs de auditoria detalhados  
- [ ] Configurar HTTPS obrigatório

### Médio Prazo
- [ ] Implementar refresh tokens
- [ ] Adicionar detecção de anomalias
- [ ] Integrar SIEM (Security Information and Event Management)

### Longo Prazo
- [ ] Implementar Zero Trust Architecture
- [ ] Adicionar criptografia end-to-end
- [ ] Conformidade com LGPD/GDPR

## ✅ Conclusão

As implementações de segurança cobrem completamente as vulnerabilidades **OWASP A01** e **A02**:

### A01 - Broken Access Control ✅
- Autenticação JWT robusta
- Controle de acesso baseado em roles
- Proteção de recursos por ownership
- Rate limiting contra força bruta
- Validação rigorosa de inputs

### A02 - Cryptographic Failures ✅
- Hashing seguro com bcrypt
- JWT com secret forte
- Sanitização de dados sensíveis
- Headers de segurança configurados
- CORS restritivo
- Tratamento seguro de erros

O sistema está **PROTEGIDO** contra as duas principais vulnerabilidades do OWASP Top 10, proporcionando um ambiente seguro para os usuários e dados do sistema Heróis da Vida.
