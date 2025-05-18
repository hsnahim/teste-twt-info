// Tabela para exibir os processos cadastrados
// Importa componentes do Material UI e React
import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

export default function ProcessosTable({ processos, onEdit, onDelete }) {
    // Renderiza a tabela de processos
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* Cabeçalhos das colunas */}
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
                    {/* Mapeia e exibe cada processo em uma linha */}
                    {processos.map((proc, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{proc.numero}</TableCell>
                            <TableCell>{proc.dataAbertura}</TableCell>
                            <TableCell>{proc.descricao}</TableCell>
                            <TableCell>{proc.cliente}</TableCell>
                            <TableCell>{proc.advogado}</TableCell>
                            <TableCell>{proc.uf}</TableCell>
                            <TableCell>
                                {/* Botões de ação */}
                                <Button sx={{ border: 1, marginRight: 1 }} size="small" onClick={() => onEdit(idx)}>Editar</Button>
                                <Button sx={{ border: 1 }} size="small" color="error" onClick={() => onDelete(idx)}>Remover</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
