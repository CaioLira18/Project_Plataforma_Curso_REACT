const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Separate the database port from the application port
const db = mysql.createPool({
    host: "maglev.proxy.rlwy.net",
    port: 43183, 
    user: "root",
    password: "CBDIOgYEkoNibcFNLjaspYqasMYOpNMF",
    database: "railway",
    waitForConnections: true,
    queueLimit: 0
});

// Add more debugging for connection issues
db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to database:", err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        if (err.code === 'ETIMEDOUT') {
            console.error('Database connection timed out.');
        }
    } else {
        console.log("Successfully connected to database");
        connection.release();
    }
});

// Enable CORS with more options
app.use(cors({
    origin: '*', // Allow all origins for testing
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something broke!', details: err.message });
});

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if(err){
            console.error("Error checking existing user:", err);
            return res.status(500).send({error: err.message});
        }
        if(result.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).send({error: err.message});
                }
                
                db.query("INSERT INTO Usuarios (email, password) VALUES (?, ?)", [email, hash], (err, response) => {
                    if(err){
                        console.error("Error inserting user:", err);
                        return res.status(500).send({error: err.message});
                    }
                    
                    res.send({msg: "Cadastrado com Sucesso", success: true});
                });
            });
        } else {
            res.send({msg: "Usuario ja cadastrado", success: false});
        }
    });
});

app.get("/test-connection", (req, res) => {
    db.query("SELECT 1", (err, result) => {
        if (err) {
            console.error("Erro na conexão:", err);
            return res.status(500).send({error: "Erro na conexão com o banco de dados", details: err});
        }
        res.send({success: true, message: "Conexão com o banco de dados funcionando"});
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    console.log("Login attempt for:", email);
    
    db.query("SELECT * FROM Usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Error finding user:", err);
            return res.status(500).send({error: err.message});
        }
        
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.status(500).send({ msg: "Erro ao verificar senha", error: err.message });
                }
                
                if (match) {
                    return res.status(200).send({ msg: "Usuario logado com sucesso", success: true });
                } else {
                    return res.status(401).send({ msg: "Senha incorreta", success: false });
                }
            });
        } else {
            return res.status(404).send({ msg: "Usuario não encontrado", success: false });
        }
    });
});

// Choose a different port for your application
const PORT = process.env.PORT || 43183;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rodando na porta ${PORT}`);
});