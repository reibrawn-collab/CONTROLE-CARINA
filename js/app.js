let saldo = 9;
let totalProdutos = 0;
let totalRetiradas = 0;

let historico =
JSON.parse(localStorage.getItem("historicoCarina")) || [];

if(localStorage.getItem("saldoCarina")){
    saldo = Number(localStorage.getItem("saldoCarina"));
}

if(localStorage.getItem("totalProdutos")){
    totalProdutos =
    Number(localStorage.getItem("totalProdutos"));
}

if(localStorage.getItem("totalRetiradas")){
    totalRetiradas =
    Number(localStorage.getItem("totalRetiradas"));
}

function salvar(){

    localStorage.setItem(
        "saldoCarina",
        saldo
    );

    localStorage.setItem(
        "totalProdutos",
        totalProdutos
    );

    localStorage.setItem(
        "totalRetiradas",
        totalRetiradas
    );

    localStorage.setItem(
        "historicoCarina",
        JSON.stringify(historico)
    );

}

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
