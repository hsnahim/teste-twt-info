import React, { useState } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ProcessoForm from '../components/ProcessoForm';
import ConfirmacaoDialog from '../components/ConfirmacaoDialog';

export default function App() {
  const [processos, setProcessos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [lastUF, setLastUF] = useState('');

  const handleAdd = () => {
    setEditIndex(null);
    setOpen(true);
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setOpen(true);
  };

  const handleDelete = (idx) => {
    setProcessos(processos.filter((_, i) => i !== idx));
  };

  const handleSave = (data) => {
    if (editIndex !== null) {
      setProcessos(processos.map((p, i) => (i === editIndex ? data : p)));
    } else {
      setProcessos([...processos, data]);
    }
    setOpen(false);
    setLastUF(data.uf);
    setShowConfirm(true);
  };

  const handleVoltar = () => {
    setShowConfirm(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, padding: '20px', borderRadius: '8px' }}>
      <h2>Cadastro de Processos</h2>
      <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
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
                  <Button size="small" onClick={() => handleEdit(idx)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(idx)}>Remover</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
