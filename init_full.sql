-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS twt;
USE twt;

-- Cria o usuário se não existir e define a senha
CREATE USER IF NOT EXISTS 'twt-user'@'%' IDENTIFIED BY 'Alfa123#';

-- Concede todas as permissões no banco 'twt' para o usuário
GRANT ALL PRIVILEGES ON twt.* TO 'twt-user'@'%';
FLUSH PRIVILEGES;

-- Cria a tabela se não existir
CREATE TABLE IF NOT EXISTS Prossesos (
    processoID INT AUTO_INCREMENT PRIMARY KEY,
    Advogado VARCHAR(255),
    Cliente VARCHAR(255),
    DataDeAbertura DATE,
    Descricao TEXT,
    NProcesso VARCHAR(255),
    UFdoProcesso VARCHAR(2)
);
