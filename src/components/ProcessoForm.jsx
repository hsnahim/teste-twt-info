// Formulário para cadastro e edição de processos judiciais
// Importa componentes do Material UI e React
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';

const estados = [
    // Lista de siglas dos estados brasileiros
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// Componente principal do formulário de processo
export default function ProcessoForm({ open, onClose, onSave, initialData }) {
    // Estado local do formulário
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

    // Atualiza o formulário quando os dados iniciais mudam
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

    // Manipula mudanças nos campos do formulário
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Manipula o envio do formulário
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
