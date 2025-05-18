// Importa as dependências principais
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a aplicação Express
const app = express();
const port = 3001; // Porta onde o backend irá rodar

// Middlewares globais
app.use(cors()); // Habilita CORS para permitir requisições de outros domínios
app.use(express.json()); // Necessário para ler JSON do body das requisições

// Função utilitária para conectar ao banco de dados MySQL usando variáveis de ambiente
async function getConnection() {
    return await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT
    });
}

// Rota para recuperar todos os processos cadastrados
app.get('/api/posts', async (req, res) => {
    try {
        const db = await getConnection();
        const [rows] = await db.query('SELECT * FROM Prossesos');
        res.json(rows); // Retorna todos os processos em formato JSON
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para inserir um novo processo no banco de dados
app.post('/api/posts', async (req, res) => {
    try {
        const db = await getConnection();
        // Extrai os dados do corpo da requisição
        const { Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso } = req.body;
        // Executa o comando de inserção
        const [result] = await db.query(
            'INSERT INTO Prossesos (Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso) VALUES (?, ?, ?, ?, ?, ?)',
            [Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso]
        );
        // Retorna o ID do novo processo criado
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar um processo existente
app.put('/api/posts/:id', async (req, res) => {
    try {
        const db = await getConnection();
        // Extrai os dados do corpo da requisição
        const { Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso } = req.body;
        const { id } = req.params; // ID do processo a ser atualizado
        // Executa o comando de atualização
        const [result] = await db.query(
            'UPDATE Prossesos SET Advogado=?, Cliente=?, DataDeAbertura=?, Descricao=?, NProcesso=?, UFdoProcesso=? WHERE processoID=?',
            [Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso, id]
        );
        // Retorna sucesso se algum registro foi alterado
        res.json({ success: result.affectedRows > 0 });
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para deletar um processo pelo ID
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const db = await getConnection();
        const { id } = req.params; // ID do processo a ser removido
        // Executa o comando de exclusão
        const [result] = await db.query(
            'DELETE FROM Prossesos WHERE processoID=?',
            [id]
        );
        // Retorna sucesso se algum registro foi removido
        res.json({ success: result.affectedRows > 0 });
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
