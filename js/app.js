let saldo = Number(localStorage.getItem("saldoCarina")) || 9;

let historico = JSON.parse(localStorage.getItem("historicoCarina")) || [];

function salvarDados() {
    localStorage.setItem("saldoCarina", saldo);
    localStorage.setItem("historicoCarina", JSON.stringify(historico));
}

function atualizarTela() {

    document.getElementById("saldo").textContent = saldo;

    const tabela = document.getElementById("historico");

    tabela.innerHTML = "";

    historico.forEach(function(item){

        const linha = document.createElement("tr");

        linha.innerHTML =
            "<td>" + item.data + "</td>" +
            "<td>" + item.movimento + "</td>";

        tabela.appendChild(linha);

    });
}

function dataAtual() {
    return new Date().toLocaleString("pt-BR");
}

function receberProduto() {

    saldo += 6;

    historico.unshift({
        data: dataAtual(),
        movimento: "Recebido 1 produto (+6 pizzas)"
    });

    salvarDados();
    atualizarTela();
}

function registrarRetirada() {

    const responsavel =
        document.getElementById("responsavel").value;

    const quantidade =
        Number(document.getElementById("quantidade").value);

    if (quantidade <= 0) {
        alert("Quantidade inválida.");
        return;
    }

    if (quantidade > saldo) {
        alert("Saldo insuficiente.");
        return;
    }

    saldo -= quantidade;

    historico.unshift({
        data: dataAtual(),
        movimento: responsavel + " retirou " + quantidade + " pizza(s)"
    });

    salvarDados();
    atualizarTela();
}

window.onload = function () {
    atualizarTela();
};
