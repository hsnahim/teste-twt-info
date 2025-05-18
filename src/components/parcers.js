export function BDtoReact(data) {
    return {
        advogado: data.Advogado,
        cliente: data.Cliente,
        dataAbertura: data.DataDeAbertura.replace("T03:00:00.000Z", ""),
        descricao: data.Descrição,
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
        Descrição: data.descricao,
        NProcesso: data.numero,
        UFdoProcesso: data.uf,
        processoID: data.processoID
    }
}
// advogado: "22"
// ​
// cliente: "22"
// ​
// dataAbertura: "0002-02-22"
// ​
// descricao: "22"
// numero: "alfa"
// uf: "AL"
// ---------
// Advogado: "sigma"
// ​​
// Cliente: "alfa"
// ​​
// DataDeAbertura: "2025-12-31T03:00:00.000Z"
// ​​
// "Descrição": "este prosseso é um teste"
// ​​
// NProcesso: "12"
// ​​
// UFdoProcesso: "MG"
// ​​
// prossesoID: 1