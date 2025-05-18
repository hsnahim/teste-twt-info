export function BDtoReact(data) {
    return {
        advogado: data.Advogado,
        cliente: data.Cliente,
        dataAbertura: data.DataDeAbertura ? data.DataDeAbertura.slice(0, 10) : "",
        descricao: data.Descricao,
        numero: data.NProcesso,
        uf: data.UFdoProcesso,
        processoID: data.processoID
    };
}

export function ReacttoBD(data) {
    return {
        Advogado: data.advogado,
        Cliente: data.cliente,
        DataDeAbertura: data.dataAbertura,
        Descricao: data.descricao,
        NProcesso: data.numero,
        UFdoProcesso: data.uf,
        processoID: data.processoID
    }
}