const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Configuração do banco de dados
const db = mysql.createPool({
    host: "maglev.proxy.rlwy.net",
    port: 43183, 
    user: "root",
    password: "CBDIOgYEkoNibcFNLjaspYqasMYOpNMF",
    database: "railway",
    waitForConnections: true,
    queueLimit: 0
});

// Verificar conexão com o banco de dados
db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err);
    } else {
        console.log("Conexão com o banco de dados estabelecida.");
        connection.release();
    }
});

// Configuração do servidor
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Erro no servidor', details: err.message });
});

// Criar a tabela se não existir
db.query(`CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)`, (err) => {
    if (err) console.error("Erro ao criar tabela:", err);
});

// Rota de registro
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao verificar usuário existente:", err);
            return res.status(500).send({ error: err.message });
        }
        if (result.length > 0) {
            return res.send({ msg: "Usuário já cadastrado", success: false });
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error("Erro ao gerar hash da senha:", err);
                return res.status(500).send({ error: err.message });
            }

            db.query("INSERT INTO Usuarios (email, password) VALUES (?, ?)", [email, hash], (err) => {
                if (err) {
                    console.error("Erro ao cadastrar usuário:", err);
                    return res.status(500).send({ error: err.message });
                }

                res.send({ msg: "Cadastro realizado com sucesso!", success: true });
            });
        });
    });
});

// Rota de login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).send({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).send({ msg: "Usuário não encontrado", success: false });
        }

        bcrypt.compare(password, result[0].password, (err, match) => {
            if (err) {
                console.error("Erro ao comparar senhas:", err);
                return res.status(500).send({ msg: "Erro ao verificar senha", error: err.message });
            }

            if (match) {
                return res.status(200).send({ msg: "Login realizado com sucesso!", success: true });
            } else {
                return res.status(401).send({ msg: "Senha incorreta", success: false });
            }
        });
    });
});

// Verificação de conexão com o banco
app.get("/test-connection", (req, res) => {
    db.query("SELECT 1", (err) => {
        if (err) {
            console.error("Erro na conexão com o banco de dados:", err);
            return res.status(500).send({ error: "Erro ao conectar", details: err });
        }
        res.send({ success: true, message: "Conexão com o banco de dados funcionando!" });
    });
});

// Configuração da porta do servidor
const PORT = process.env.PORT || 28401;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
