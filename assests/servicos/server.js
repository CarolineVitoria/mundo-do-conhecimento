
const mysql = require('mysql2');
const express = require('express');
const cors = require("cors");



const app = express(); //instância do express
app.use(express.json()); 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

//normalmente usamos o nome maiúsculas com informações fixas
const PORT =  8800; //porta de comuniação utilizada pela API

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'batbook',
    password: '123',
    database: 'mundo_conhecimento'
  });

app.listen(PORT, ()=>{
    console.log("Servidor escutando");
}); //Método que vai estar ouvindo o servidor

// Conectar ao banco de dados MySQL
connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
  });

app.get('/', (req, res)=>{
    res.status(200).send('Curso');
});

app.post('/cadastro', (req, res)=>{
    console.log(req.body.nome);
    const q = "INSERT INTO usuario(`nome`, `email`, `matricula`, `senha`) VALUES(?, ?, ?, ?)";


    connection.query(q, [req.body.nome, req.body.email, req.body.matricula, req.body.senha], (err)=>{
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } else {
            console.log('Usuário cadastrado com sucesso');
            res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
        }
})});

// Rota para login de usuário
app.post('/login', (req, res) => {
    console.log('Email recebido:', req.body.email);
    console.log('Senha recebida:', req.body.senha);

    // Consulta SQL para verificar se o usuário existe com o email e senha fornecidos
    const query = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    connection.query(query, [req.body.email, req.body.senha], (error, results) => {
        if (error) {
            console.error('Erro ao verificar login:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        
           // Se nenhum usuário foi encontrado, ou se as credenciais estão incorretas
           if (results.length === 0) {
            console.log('Credenciais inválidas');
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }
        console.log('Resultado da consulta SQL:', results[0]);

        // Se o usuário foi encontrado, retorna um status 200 OK
        console.log('Login bem-sucedido');
        res.status(200).json(results[0]);
    });
});
//rota criar nota
app.post('/notas', (req, res)=>{
    console.log(req.body);
    console.log(req.body.autor);
    const q = "INSERT INTO nota(`materia`, `autor`, `conteudo`) VALUES(?, ?, ?)";


    connection.query(q, [req.body.materia, req.body.autor, req.body.conteudo], (err)=>{
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } else {
            console.log('Usuário cadastrado com sucesso');
            res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
        }
})
})
