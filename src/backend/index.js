const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require(" ");
require("dotenv").config();

const app = express();
const saltRounds = 10;

// Middleware para aceitar JSON
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "OPTIONS"], allowedHeaders: ["Content-Type"] }));

// Configuração do banco de dados usando variáveis de ambiente
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0
});

// Teste de conexão com o banco
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Erro ao conectar no banco de dados:", err);
    } else {
        console.log("✅ Conexão com o banco de dados estabelecida.");
        connection.release();
    }
});

// Criar tabela se não existir
db.query(`CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)`, (err) => {
    if (err) console.error("❌ Erro ao criar tabela:", err);
});

// Rota de registro
app.post("/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Email e senha obrigatórios!", success: false });

    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) return res.json({ msg: "Usuário já cadastrado", success: false });

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) return res.status(500).json({ error: err.message });

            db.query("INSERT INTO Usuarios (email, password) VALUES (?, ?)", [email, hash], (err) => {
                if (err) return res.status(500).json({ error: err.message });

                res.json({ msg: "Cadastro realizado com sucesso!", success: true });
            });
        });
    });
});

// Rota de login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Email e senha obrigatórios!", success: false });

    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ msg: "Usuário não encontrado", success: false });

        bcrypt.compare(password, result[0].password, (err, match) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!match) return res.status(401).json({ msg: "Senha incorreta", success: false });

            res.status(200).json({ msg: "Login realizado com sucesso!", success: true });
        });
    });
});

// Verificação de conexão com o banco
app.get("/test-connection", (req, res) => {
    db.query("SELECT 1", (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "✅ Conexão com o banco de dados funcionando!" });
    });
});

// Erro 404 para rotas inválidas
app.use((req, res) => res.status(404).json({ msg: "Rota não encontrada!", success: false }));

// Iniciar o servidor
const PORT = process.env.PORT || 43183;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
