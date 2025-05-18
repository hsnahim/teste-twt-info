import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Necessário para ler JSON do body

// Função para conectar ao banco
async function getConnection() {
    return await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT
    });
}

// Recuperar todos os processos
app.get('/api/posts', async (req, res) => {
    try {
        const db = await getConnection();
        const [rows] = await db.query('SELECT * FROM Prossesos');
        res.json(rows);
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Inserir um novo processo
app.post('/api/posts', async (req, res) => {
    try {
        const db = await getConnection();
        const { Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso } = req.body;
        const [result] = await db.query(
            'INSERT INTO Prossesos (Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso) VALUES (?, ?, ?, ?, ?, ?)',
            [Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um processo
app.put('/api/posts/:id', async (req, res) => {
    try {
        const db = await getConnection();
        const { Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso } = req.body;
        const { id } = req.params;
        const [result] = await db.query(
            'UPDATE Prossesos SET Advogado=?, Cliente=?, DataDeAbertura=?, Descricao=?, NProcesso=?, UFdoProcesso=? WHERE processoID=?',
            [Advogado, Cliente, DataDeAbertura, Descricao, NProcesso, UFdoProcesso, id]
        );
        res.json({ success: result.affectedRows > 0 });
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

// Deletar um processo
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const db = await getConnection();
        const { id } = req.params;
        const [result] = await db.query(
            'DELETE FROM Prossesos WHERE processoID=?',
            [id]
        );
        res.json({ success: result.affectedRows > 0 });
    } catch (err) {
        console.log('Erro MySQL:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
