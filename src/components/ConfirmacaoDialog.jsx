// Dialog de confirmação após criar processo
// Importa componentes do Material UI e React
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function ConfirmacaoDialog({ open, uf, onClose }) {
    // Renderiza o dialog de confirmação
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogContent>
                {/* Mensagem condicional para MG ou outros estados */}
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
