// Importações principais do React e Material UI
import React, { useState, useEffect } from 'react';
import { ThemeProvider, Container, Button } from '@mui/material';
import ProcessoForm from './components/ProcessoForm';
import ConfirmacaoDialog from './components/ConfirmacaoDialog';
import ProcessosTable from './components/ProcessosTable';
import { createTheme } from '@mui/material/styles';
import { BDtoReact } from './components/parcers';

// Definição do tema escuro para o Material UI
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

// Componente principal da aplicação
export default function App() {
    // Estados principais da aplicação
    const [processos, setProcessos] = useState([]); // Lista de processos
    const [open, setOpen] = useState(false); // Controle de abertura do formulário
    const [editIndex, setEditIndex] = useState(null); // Índice do processo em edição
    const [showConfirm, setShowConfirm] = useState(false); // Controle do dialog de confirmação
    const [lastUF, setLastUF] = useState(''); // Última UF cadastrada

    // Hook para buscar os processos do backend ao carregar a página
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca os processos do backend
                const response = await fetch('http://localhost:3001/api/posts');
                const data = await response.json();
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                    arr.push(BDtoReact(data[i])); // Converte os dados do backend para o formato do React
                }
                setProcessos(arr);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Função para abrir o formulário para adicionar novo processo
    const handleAdd = () => {
        setEditIndex(null);
        setOpen(true);
    };

    // Função para abrir o formulário para editar um processo existente
    const handleEdit = (idx) => {
        setEditIndex(idx);
        setOpen(true);
    };

    // Função para deletar um processo (local e backend)
    const handleDelete = async (idx) => {
        // Remove o processo do estado local
        setProcessos(processos.filter((_, i) => i !== idx));
        // Remove do backend se existir
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

    // Função para salvar (criar ou editar) um processo
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

    // Função para fechar o dialog de confirmação
    const handleVoltar = () => {
        setShowConfirm(false);
    };

    // Renderização do componente principal
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
                {/* Botão para adicionar novo processo */}
                <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 4 }}>
                    Novo Processo
                </Button>
                {/* Formulário de cadastro/edição de processo */}
                <ProcessoForm
                    open={open}
                    onClose={() => setOpen(false)}
                    onSave={handleSave}
                    initialData={editIndex !== null ? processos[editIndex] : null}
                />
                {/* Dialog de confirmação após criar processo */}
                <ConfirmacaoDialog open={showConfirm} uf={lastUF} onClose={handleVoltar} />
                {/* Tabela de processos cadastrados */}
                <ProcessosTable
                    processos={processos}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Container>
        </ThemeProvider>
    );
}
