const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "caiolira12",
    database: "cursos",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], (err, response) => {
                    if(err){
                        res.send(err);
                    }
    
                    res.send({msg: "Cadastrado com Sucesso"});
                });
            });
           
        } else {
            res.send({msg: "Usuario ja cadastrado"})
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            return res.send(err);
        }
        
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (err) {
                    res.send({ msg: "Erro ao verificar senha" });
                }
                
                if (match) {
                    res.send({ msg: "Usuario logado com sucesso" });
                } else {
                    res.send({ msg: "Senha incorreta" });
                }
            });
        } else {
            return res.send({ msg: "Usuario não encontrado" });
        }
    });
});

app.listen(3100, '0.0.0.0', () => {
    console.log("Rodando na porta 3100");
});
