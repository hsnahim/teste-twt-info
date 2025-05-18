CREATE TABLE IF NOT EXISTS Prossesos (
    processoID INT AUTO_INCREMENT PRIMARY KEY,
    NProcesso varchar(255),
    DataDeAbertura DATE,
    Descricao TEXT,
    Cliente varchar(255),
    Advogado varchar(255),
    UFdoProcesso varchar(2)
);