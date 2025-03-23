const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();
const saltRounds = 10;

app.use(express.json());

// Configuração CORS para aceitar requisições de qualquer origem
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Verificação e log das variáveis de ambiente
console.log("Verificando configurações de banco de dados:");
console.log(`Host: ${process.env.DB_HOST || 'não definido'}`);
console.log(`Porta do banco: ${process.env.DB_PORT || 'não definido'}`);
console.log(`Nome do banco: ${process.env.DB_NAME || 'não definido'}`);

// Configuração do banco de dados com as variáveis do Railway
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        // Opção para conexões SSL que podem ser necessárias para o Railway
        rejectUnauthorized: false
    }
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Erro ao conectar no banco de dados:", err);
        console.error("Detalhes da conexão:", {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            database: process.env.DB_NAME
        });
    } else {
        console.log("✅ Conexão com o banco de dados estabelecida.");
        connection.release();
    }
});

// Criação da tabela se não existir
db.query(`CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)`, (err) => {
    if (err) {
        console.error("❌ Erro ao criar tabela:", err);
    } else {
        console.log("✅ Tabela Usuarios verificada/criada com sucesso");
    }
});

app.post("/register", (req, res) => {
    const { email, password } = req.body;
    
    console.log("Recebida solicitação de registro para:", email);
    
    if (!email || !password) {
        console.log("❌ Dados incompletos");
        return res.status(400).json({ msg: "Email e senha obrigatórios!", success: false });
    }

    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("❌ Erro na consulta SQL:", err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.length > 0) {
            console.log("❌ Usuário já existe");
            return res.json({ msg: "Usuário já cadastrado", success: false });
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error("❌ Erro ao criar hash da senha:", err);
                return res.status(500).json({ error: err.message });
            }

            db.query("INSERT INTO Usuarios (email, password) VALUES (?, ?)", [email, hash], (err) => {
                if (err) {
                    console.error("❌ Erro ao inserir usuário:", err);
                    return res.status(500).json({ error: err.message });
                }

                console.log("✅ Usuário registrado com sucesso");
                res.json({ msg: "Cadastro realizado com sucesso!", success: true });
            });
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    console.log("Recebida solicitação de login para:", email);
    
    if (!email || !password) {
        console.log("❌ Dados incompletos");
        return res.status(400).json({ msg: "Email e senha obrigatórios!", success: false });
    }

    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("❌ Erro na consulta SQL:", err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.length === 0) {
            console.log("❌ Usuário não encontrado");
            return res.status(404).json({ msg: "Usuário não encontrado", success: false });
        }

        bcrypt.compare(password, result[0].password, (err, match) => {
            if (err) {
                console.error("❌ Erro ao comparar senhas:", err);
                return res.status(500).json({ error: err.message });
            }
            
            if (!match) {
                console.log("❌ Senha incorreta");
                return res.status(401).json({ msg: "Senha incorreta", success: false });
            }

            console.log("✅ Login bem-sucedido");
            res.status(200).json({ msg: "Login realizado com sucesso!", success: true });
        });
    });
});

// Rota de teste para verificar se o servidor está funcionando
app.get("/", (req, res) => {
    res.json({ msg: "API está funcionando! 🚀" });
});

// Importante: A porta que o Railway fornece em tempo de execução
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Servidor rodando na porta ${PORT}`));