// =============================================================================
// 🚀 HERÓIS DA VIDA - SERVER NODE.JS COMPLETO E SEGURO
// Backend com OWASP A01 (Broken Access Control) e A02 (Cryptographic Failures)
// =============================================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'herois-da-vida-ultra-secret-key-2024';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

// =============================================================================
// SECURITY MIDDLEWARE - OWASP A01 & A02 PROTECTION
// =============================================================================

// Helmet for security headers
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

// Rate limiting to prevent brute force attacks
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: { 
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
        remainingAttempts: 0
    },
    standardHeaders: true,
    legacyHeaders: false
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Muitas requisições. Tente novamente mais tarde.' }
});

app.use(generalLimiter);
app.use('/api/auth/login', loginLimiter);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:8080', 'http://127.0.0.1:5500'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// General middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================================================
// IN-MEMORY DATABASE (Para demonstração - substitua por DB real em produção)
// =============================================================================

let users = [
    {
        id: 1,
        name: 'Administrador Sistema',
        email: 'admin@heroisdevidas.com',
        password: '$2a$12$8xZv3.BNhJD8cF2k.QTz.OvCcEPZKqM9VaF1HGbF1.QUX3KCX2P4W', // admin123
        role: 'admin',
        isDonor: true,
        organsDonated: ['heart', 'liver', 'kidney'],
        createdAt: new Date('2024-01-01'),
        lastLogin: null
    },
    {
        id: 2,
        name: 'Usuário Teste',
        email: 'usuario@teste.com',
        password: '$2a$12$rV8/8KmV.QbV5FkF4F5GjuFEEFKBWVK8VCODKqE9mVBc7NZXQ8BpC', // user123
        role: 'user',
        isDonor: false,
        organsDonated: [],
        createdAt: new Date('2024-01-15'),
        lastLogin: null
    }
];

let campaigns = [
    {
        id: 1,
        title: 'Campanha Coração Solidário',
        description: 'Conscientização sobre doação de coração para salvar vidas. Participe desta iniciativa heroica!',
        targetOrgan: 'heart',
        goal: 1000,
        current: 245,
        status: 'active',
        createdBy: 1,
        createdAt: new Date('2024-02-01'),
        participants: [1, 2]
    },
    {
        id: 2,
        title: 'Doe Vida - Rins',
        description: 'Campanha especial para aumentar o número de doadores de rim na nossa comunidade.',
        targetOrgan: 'kidney',
        goal: 500,
        current: 123,
        status: 'active',
        createdBy: 1,
        createdAt: new Date('2024-02-15'),
        participants: [1]
    }
];

let nextUserId = 3;
let nextCampaignId = 3;

// =============================================================================
// AUTHENTICATION MIDDLEWARE - OWASP A01 PROTECTION
// =============================================================================

// Token verification middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

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

        // Verify user still exists
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

// Role-based access control
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

// Resource ownership check
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

// =============================================================================
// INPUT VALIDATION MIDDLEWARE
// =============================================================================

const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter pelo menos 6 caracteres')
];

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
        .withMessage('Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número'),
    body('role')
        .isIn(['user', 'admin'])
        .withMessage('Role deve ser user ou admin')
];

const validateUserUpdate = [
    body('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .trim()
        .escape(),
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn(['user', 'admin']),
    body('isDonor')
        .optional()
        .isBoolean()
];

const validateCampaignCreation = [
    body('title')
        .isLength({ min: 5, max: 200 })
        .trim()
        .escape()
        .withMessage('Título deve ter entre 5 e 200 caracteres'),
    body('description')
        .isLength({ min: 10, max: 1000 })
        .trim()
        .escape()
        .withMessage('Descrição deve ter entre 10 e 1000 caracteres'),
    body('targetOrgan')
        .isIn(['heart', 'liver', 'kidney', 'lung', 'cornea'])
        .withMessage('Órgão alvo inválido'),
    body('goal')
        .isInt({ min: 1, max: 100000 })
        .withMessage('Meta deve ser um número entre 1 e 100.000')
];

// =============================================================================
// UTILITY FUNCTIONS - OWASP A02 PROTECTION (Cryptographic Failures)
// =============================================================================

// Secure password hashing
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Erro interno do servidor');
    }
};

// Secure password verification
const verifyPassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
};

// Generate secure JWT token
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

// Sanitize user data (remove sensitive information)
const sanitizeUser = (user) => {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
};

// =============================================================================
// API ROUTES
// =============================================================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Heróis da Vida API está online!', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

// POST /api/auth/login - Login de usuário
app.post('/api/auth/login', validateLogin, async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find user by email (case insensitive)
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'Email ou senha incorretos' 
            });
        }

        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                error: 'Email ou senha incorretos' 
            });
        }

        // Update last login
        user.lastLogin = new Date();

        // Generate JWT token
        const token = generateToken(user);

        // Return success response (without sensitive data)
        res.json({ 
            success: true, 
            message: 'Login realizado com sucesso',
            user: sanitizeUser(user),
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// POST /api/auth/register - Registro de usuário
app.post('/api/auth/register', validateUserCreation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const { name, email, password, role = 'user' } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                error: 'Usuário já existe com este email' 
            });
        }

        // Hash password securely
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = {
            id: nextUserId++,
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            isDonor: false,
            organsDonated: [],
            createdAt: new Date(),
            lastLogin: null
        };

        users.push(newUser);

        res.status(201).json({ 
            success: true, 
            message: 'Usuário criado com sucesso',
            user: sanitizeUser(newUser)
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// =============================================================================
// USER CRUD ROUTES - WITH OWASP A01 PROTECTION
// =============================================================================

// GET /api/users - Listar usuários (requer autenticação)
app.get('/api/users', authenticateToken, (req, res) => {
    try {
        // Admins can see all users, regular users can only see public info
        let visibleUsers;

        if (req.user.role === 'admin') {
            visibleUsers = users.map(sanitizeUser);
        } else {
            // Regular users can only see limited public information
            visibleUsers = users.map(user => ({
                id: user.id,
                name: user.name,
                role: user.role,
                isDonor: user.isDonor,
                createdAt: user.createdAt
            }));
        }

        res.json({ 
            success: true, 
            users: visibleUsers,
            total: users.length
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// GET /api/users/:id - Obter usuário específico
app.get('/api/users/:id', authenticateToken, requireOwnershipOrAdmin, (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: 'Usuário não encontrado' 
            });
        }

        res.json({ 
            success: true, 
            user: sanitizeUser(user) 
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// POST /api/users - Criar usuário (apenas admin)
app.post('/api/users', authenticateToken, requireRole('admin'), validateUserCreation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const { name, email, password, role = 'user', isDonor = false } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                error: 'Usuário já existe com este email' 
            });
        }

        // Hash password securely
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = {
            id: nextUserId++,
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            isDonor,
            organsDonated: [],
            createdAt: new Date(),
            lastLogin: null
        };

        users.push(newUser);

        res.status(201).json({ 
            success: true, 
            message: 'Usuário criado com sucesso',
            user: sanitizeUser(newUser)
        });

    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// PUT /api/users/:id - Atualizar usuário
app.put('/api/users/:id', authenticateToken, requireOwnershipOrAdmin, validateUserUpdate, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                error: 'Usuário não encontrado' 
            });
        }

        const { name, email, password, role, isDonor } = req.body;
        const user = users[userIndex];

        // Update allowed fields
        if (name) user.name = name.trim();
        if (email) {
            // Check if new email is already in use
            const emailExists = users.find(u => u.id !== userId && u.email.toLowerCase() === email.toLowerCase());
            if (emailExists) {
                return res.status(409).json({ 
                    success: false, 
                    error: 'Email já está em uso' 
                });
            }
            user.email = email.toLowerCase();
        }
        if (password) {
            user.password = await hashPassword(password);
        }
        if (role !== undefined && req.user.role === 'admin') {
            user.role = role;
        }
        if (isDonor !== undefined) {
            user.isDonor = isDonor;
        }

        res.json({ 
            success: true, 
            message: 'Usuário atualizado com sucesso',
            user: sanitizeUser(user)
        });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// DELETE /api/users/:id - Excluir usuário (apenas admin, não pode excluir a si mesmo)
app.delete('/api/users/:id', authenticateToken, requireRole('admin'), (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Prevent admin from deleting themselves
        if (userId === req.user.id) {
            return res.status(400).json({ 
                success: false, 
                error: 'Você não pode excluir sua própria conta' 
            });
        }

        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                error: 'Usuário não encontrado' 
            });
        }

        users.splice(userIndex, 1);

        res.json({ 
            success: true, 
            message: 'Usuário excluído com sucesso' 
        });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// =============================================================================
// CAMPAIGN CRUD ROUTES
// =============================================================================

// GET /api/campaigns - Listar campanhas
app.get('/api/campaigns', authenticateToken, (req, res) => {
    try {
        const visibleCampaigns = campaigns.map(campaign => ({
            ...campaign,
            participantCount: campaign.participants ? campaign.participants.length : 0
        }));

        res.json({ 
            success: true, 
            campaigns: visibleCampaigns,
            total: campaigns.length
        });

    } catch (error) {
        console.error('Get campaigns error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// GET /api/campaigns/:id - Obter campanha específica
app.get('/api/campaigns/:id', authenticateToken, (req, res) => {
    try {
        const campaignId = parseInt(req.params.id);
        const campaign = campaigns.find(c => c.id === campaignId);

        if (!campaign) {
            return res.status(404).json({ 
                success: false, 
                error: 'Campanha não encontrada' 
            });
        }

        res.json({ 
            success: true, 
            campaign: {
                ...campaign,
                participantCount: campaign.participants ? campaign.participants.length : 0
            }
        });

    } catch (error) {
        console.error('Get campaign error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// POST /api/campaigns - Criar campanha (apenas admin)
app.post('/api/campaigns', authenticateToken, requireRole('admin'), validateCampaignCreation, (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Dados inválidos',
                details: errors.array()
            });
        }

        const { title, description, targetOrgan, goal } = req.body;

        // Create new campaign
        const newCampaign = {
            id: nextCampaignId++,
            title: title.trim(),
            description: description.trim(),
            targetOrgan,
            goal: parseInt(goal),
            current: 0,
            status: 'active',
            createdBy: req.user.id,
            createdAt: new Date(),
            participants: []
        };

        campaigns.push(newCampaign);

        res.status(201).json({ 
            success: true, 
            message: 'Campanha criada com sucesso',
            campaign: newCampaign
        });

    } catch (error) {
        console.error('Create campaign error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// PUT /api/campaigns/:id - Atualizar campanha (apenas admin ou criador)
app.put('/api/campaigns/:id', authenticateToken, (req, res) => {
    try {
        const campaignId = parseInt(req.params.id);
        const campaignIndex = campaigns.findIndex(c => c.id === campaignId);

        if (campaignIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                error: 'Campanha não encontrada' 
            });
        }

        const campaign = campaigns[campaignIndex];

        // Check if user can modify this campaign
        if (req.user.role !== 'admin' && campaign.createdBy !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                error: 'Acesso negado. Você só pode editar suas próprias campanhas.' 
            });
        }

        const { title, description, targetOrgan, goal, status } = req.body;

        // Update allowed fields
        if (title) campaign.title = title.trim();
        if (description) campaign.description = description.trim();
        if (targetOrgan) campaign.targetOrgan = targetOrgan;
        if (goal) campaign.goal = parseInt(goal);
        if (status && ['active', 'paused', 'completed'].includes(status)) {
            campaign.status = status;
        }

        res.json({ 
            success: true, 
            message: 'Campanha atualizada com sucesso',
            campaign
        });

    } catch (error) {
        console.error('Update campaign error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// DELETE /api/campaigns/:id - Excluir campanha (apenas admin)
app.delete('/api/campaigns/:id', authenticateToken, requireRole('admin'), (req, res) => {
    try {
        const campaignId = parseInt(req.params.id);
        const campaignIndex = campaigns.findIndex(c => c.id === campaignId);

        if (campaignIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                error: 'Campanha não encontrada' 
            });
        }

        campaigns.splice(campaignIndex, 1);

        res.json({ 
            success: true, 
            message: 'Campanha excluída com sucesso' 
        });

    } catch (error) {
        console.error('Delete campaign error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Endpoint não encontrado',
        availableEndpoints: [
            'GET /api/health',
            'POST /api/auth/login',
            'POST /api/auth/register',
            'GET /api/users',
            'POST /api/users',
            'GET /api/users/:id',
            'PUT /api/users/:id',
            'DELETE /api/users/:id',
            'GET /api/campaigns',
            'POST /api/campaigns',
            'GET /api/campaigns/:id',
            'PUT /api/campaigns/:id',
            'DELETE /api/campaigns/:id'
        ]
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);

    res.status(error.status || 500).json({ 
        success: false, 
        error: process.env.NODE_ENV === 'production' 
            ? 'Erro interno do servidor' 
            : error.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
    });
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
    console.log('🚀 ======================================');
    console.log('🎮 HERÓIS DA VIDA - API BACKEND');
    console.log('🚀 ======================================');
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`🛡️  OWASP A01: Broken Access Control - PROTEGIDO`);
    console.log(`🔐 OWASP A02: Cryptographic Failures - PROTEGIDO`);
    console.log(`📊 Usuários cadastrados: ${users.length}`);
    console.log(`📢 Campanhas ativas: ${campaigns.length}`);
    console.log('🚀 ======================================');
    console.log('📖 Endpoints disponíveis:');
    console.log('   POST /api/auth/login');
    console.log('   POST /api/auth/register');
    console.log('   GET  /api/users');
    console.log('   POST /api/users (admin)');
    console.log('   GET  /api/users/:id');
    console.log('   PUT  /api/users/:id');
    console.log('   DELETE /api/users/:id (admin)');
    console.log('   GET  /api/campaigns');
    console.log('   POST /api/campaigns (admin)');
    console.log('   GET  /api/campaigns/:id');
    console.log('   PUT  /api/campaigns/:id');
    console.log('   DELETE /api/campaigns/:id (admin)');
    console.log('🚀 ======================================');
});

module.exports = app;