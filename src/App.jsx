import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BDtoReact } from './components/parcers';

const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#181818',
            paper: '#232323',
        },
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
});

function ProcessoForm({ open, onClose, onSave, initialData }) {
    const [form, setForm] = React.useState(
        initialData || {
            numero: '',
            dataAbertura: '',
            descricao: '',
            cliente: '',
            advogado: '',
            uf: '',
        }
    );

    React.useEffect(() => {
        setForm(initialData || {
            numero: '',
            dataAbertura: '',
            descricao: '',
            cliente: '',
            advogado: '',
            uf: '',
        });
    }, [initialData, open]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Editar Processo' : 'Novo Processo'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="processo-form">
                    <TextField
                        margin="dense"
                        label="Número do Processo"
                        name="numero"
                        value={form.numero}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Data de Abertura"
                        name="dataAbertura"
                        type="date"
                        value={form.dataAbertura}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Descrição"
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        minRows={2}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Cliente"
                        name="cliente"
                        value={form.cliente}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Advogado"
                        name="advogado"
                        value={form.advogado}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Select
                        margin="dense"
                        name="uf"
                        value={form.uf}
                        onChange={handleChange}
                        displayEmpty
                        fullWidth
                        required
                    >
                        <MenuItem value=""><em>UF do processo</em></MenuItem>
                        {estados.map((uf) => (
                            <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                        ))}
                    </Select>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit" form="processo-form" variant="contained">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}

function ConfirmacaoDialog({ open, uf, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogContent>
                <h2 style={{ textAlign: 'center' }}>
                    {uf === 'MG' ? 'Processo de MG criado com sucesso!' : 'Processo fora de MG criado com sucesso!'}
                </h2>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose}>Voltar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default function App() {
    const [processos, setProcessos] = useState([]);
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [lastUF, setLastUF] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/posts');
                const data = await response.json();
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                    arr.push(BDtoReact(data[i]));
                }
                setProcessos(arr);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleAdd = () => {
        setEditIndex(null);
        setOpen(true);
    };

    const handleEdit = (idx) => {
        setEditIndex(idx);
        setOpen(true);
    };

    const handleDelete = async (idx) => {
        // Remove the processo from the local state
        setProcessos(processos.filter((_, i) => i !== idx));
        // Remove from backend if it exists
        const processo = processos[idx];
        if (processo && processo.processoID) {
            const id = processo.processoID;
            try {
                await fetch(`http://localhost:3001/api/posts/${id}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSave = async (data) => {
        if (editIndex !== null) {
            // Editar: enviar PUT para o backend
            const processo = processos[editIndex];
            const id = processo.processoID;
            try {
                await fetch(`http://localhost:3001/api/posts/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Advogado: data.advogado,
                        Cliente: data.cliente,
                        DataDeAbertura: data.dataAbertura,
                        Descricao: data.descricao,
                        NProcesso: data.numero,
                        UFdoProcesso: data.uf,
                        processoID: data.processoID
                    })
                });
                setProcessos(processos.map((p, i) => (i === editIndex ? { ...data, processoID: id } : p)));
            } catch (error) {
                console.log(error);
            }
            setOpen(false); // Fecha o form após edição
            // NÃO exibe o Dialog de confirmação após edição
        } else {
            // Criar novo: enviar POST para o backend
            try {
                const response = await fetch('http://localhost:3001/api/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Advogado: data.advogado,
                        Cliente: data.cliente,
                        DataDeAbertura: data.dataAbertura,
                        Descricao: data.descricao,
                        NProcesso: data.numero,
                        UFdoProcesso: data.uf,
                        processoID: data.processoID
                    })
                });
                const result = await response.json();
                setProcessos([...processos, { ...data, processoID: result.id }]);
                setOpen(false);
                setLastUF(data.uf);
                setShowConfirm(true); // Exibe o Dialog de confirmação apenas após criação
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleVoltar = () => {
        setShowConfirm(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                sx={{
                    paddingTop: 0.01,
                    paddingBottom: 4,
                    mt: 6,
                    mb: 6,
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                    borderRadius: 2,
                }}
            >
                <h2>Cadastro de Processos</h2>
                <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 4 }}>
                    Novo Processo
                </Button>
                <ProcessoForm
                    open={open}
                    onClose={() => setOpen(false)}
                    onSave={handleSave}
                    initialData={editIndex !== null ? processos[editIndex] : null}
                />
                <ConfirmacaoDialog open={showConfirm} uf={lastUF} onClose={handleVoltar} />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell>Data de Abertura</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Advogado</TableCell>
                                <TableCell>UF</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processos.map((proc, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{proc.numero}</TableCell>
                                    <TableCell>{proc.dataAbertura}</TableCell>
                                    <TableCell>{proc.descricao}</TableCell>
                                    <TableCell>{proc.cliente}</TableCell>
                                    <TableCell>{proc.advogado}</TableCell>
                                    <TableCell>{proc.uf}</TableCell>
                                    <TableCell>
                                        <Button sx={{ border: 1, marginRight: 1 }} size="small" onClick={() => handleEdit(idx)}>Editar</Button>
                                        <Button sx={{ border: 1 }} size="small" color="error" onClick={() => handleDelete(idx)}>Remover</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
}
