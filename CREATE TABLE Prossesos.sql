CREATE TABLE Prossesos (
    PersonID GUID PRIMARY KEY,
    NProcesso varchar(255),
    DataDeAbertura DATE,
    Descrição TEXT(2500),
    Cliente varchar(255),
    Advogado varchar(255),
    UFdoProcesso varchar(2)
);