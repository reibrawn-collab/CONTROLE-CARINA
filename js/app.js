let saldo = 9;

let totalProdutos = 4;

let totalRetiradas = 15;

let historico = [
{
data:"17/10/2026",
movimento:"Recebido 1 produto (+6 pizzas)",
saldo:6
},
{
data:"17/10/2026",
movimento:"Carina retirou 1 pizza",
saldo:5
},
{
data:"25/10/2026",
movimento:"Carina retirou 2 pizzas",
saldo:3
},
{
data:"31/10/2026",
movimento:"Recebido 1 produto (+6 pizzas)",
saldo:9
},
{
data:"01/11/2026",
movimento:"Carina retirou 2 pizzas",
saldo:7
},
{
data:"02/11/2026",
movimento:"Carina retirou 2 pizzas",
saldo:5
},
{
data:"07/11/2026",
movimento:"Carina retirou 2 pizzas",
saldo:3
},
{
data:"10/11/2026",
movimento:"Recebido 1 produto (+6 pizzas)",
saldo:9
},
{
data:"10/11/2026",
movimento:"Carina retirou 1 pizza",
saldo:8
},
{
data:"14/11/2026",
movimento:"Carina retirou 2 pizzas",
saldo:6
},
{
data:"19/11/2026",
movimento:"Carina retirou 1 pizza",
saldo:5
},
{
data:"21/11/2026",
movimento:"Recebido 1 produto (+6 pizzas)",
saldo:11
},
{
data:"21/11/2026",
movimento:"Carina retirou 2 pizzas",
saldo:9
}
];

i

function atualizarTela(){

    document.getElementById("saldo").innerText =
    saldo;

    document.getElementById("totalProdutos").innerText =
    totalProdutos;

    document.getElementById("totalRetiradas").innerText =
    totalRetiradas;

    const tbody =
    document.getElementById("historico");

    tbody.innerHTML = "";

    historico.forEach(item=>{

        const linha =
        document.createElement("tr");

        linha.innerHTML =
        "<td>"+item.data+"</td>" +
        "<td>"+item.movimento+"</td>" +
        "<td>"+item.saldo+"</td>";

        tbody.appendChild(linha);

    });

}

function agora(){

    return new Date()
    .toLocaleString("pt-BR");

}

function registrarRecebimento(){

    const qtd =
    Number(
        document.getElementById("qtdProdutos").value
    );

    if(qtd <= 0){

        alert("Quantidade inválida");

        return;
    }

    const pizzasGeradas =
    qtd * 6;

    saldo += pizzasGeradas;

    totalProdutos += qtd;

    historico.unshift({

        data: agora(),

        movimento:
        "Recebimento de " +
        qtd +
        " produto(s) (+" +
        pizzasGeradas +
        " pizzas)",

        saldo: saldo

    });

    salvar();

    atualizarTela();

}

function registrarRetirada(){

    const qtd =
    Number(
        document.getElementById("qtdRetirada").value
    );

    if(qtd <= 0){

        alert("Quantidade inválida");

        return;
    }

    if(qtd > saldo){

        alert("Saldo insuficiente");

        return;
    }

    saldo -= qtd;

    totalRetiradas += qtd;

    historico.unshift({

        data: agora(),

        movimento:
        "Carina retirou " +
        qtd +
        " pizza(s)",

        saldo: saldo

    });

    salvar();

    atualizarTela();

}

function desfazerUltimo(){

    if(historico.length === 0){

        alert("Não há lançamentos.");

        return;

    }

    const ultimo =
    historico.shift();

    if(
        ultimo.movimento.includes("Recebimento")
    ){

        const match =
        ultimo.movimento.match(/\((\+)(\d+)/);

        if(match){

            saldo -= Number(match[2]);

        }

    }else{

        const match =
        ultimo.movimento.match(/(\d+)/);

        if(match){

            saldo += Number(match[1]);

            totalRetiradas -= Number(match[1]);

        }

    }

    salvar();

    atualizarTela();

}

function copiarRelatorio(){

    let texto =
`📊 CONTROLE CARINA

🍕 Saldo Atual: ${saldo}

📦 Produtos Recebidos: ${totalProdutos}

📉 Pizzas Retiradas: ${totalRetiradas}

Últimas movimentações:

`;

    historico.slice(0,10).forEach(item=>{

        texto +=
        item.data +
        " - " +
        item.movimento +
        "\n";

    });

    navigator.clipboard.writeText(texto);

    alert(
    "Relatório copiado para a área de transferência."
    );

}

atualizarTela();
