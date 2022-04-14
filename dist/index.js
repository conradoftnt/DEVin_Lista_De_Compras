"use strict";
const adicionaNaLista = () => {
    let entradaParaAdicao = document.querySelector("#entradaParaAdicao");
    if (entradaParaAdicao === null || entradaParaAdicao === void 0 ? void 0 : entradaParaAdicao.value) {
        const item = new Item((entradaParaAdicao === null || entradaParaAdicao === void 0 ? void 0 : entradaParaAdicao.value) || "Erro");
        item.novoItem();
        item.mostraItem();
    }
    // entradaParaAdicao?.value = null;
};
const carregaLista = () => {
    // const meuStorage = JSON.parse(localStorage.get("lista"));
    const meuStorage = JSON.parse(localStorage.getItem("lista") || "[]");
    meuStorage.forEach((index) => {
        const novoItem = new Item(index.item);
    });
};
class Item {
    constructor(item, marcado = false, valor = 0, 
    // Determina um ID aleatório para nosso item
    id = Math.random().toString(16).slice(2)) {
        this.item = "";
        this.marcado = false;
        this.valor = 0;
        this.id = "";
        this.item = item;
        this.marcado = marcado;
        this.valor = valor;
        this.id = id;
    }
    // Cria item novo para ser adicionado na lista e no localStorage
    novoItem() {
        // Atualiza a lista do localStorage com o novo item
        const meuStorage = JSON.parse(localStorage.getItem("lista") || "[]");
        meuStorage.push({
            id: this.id,
            item: this.item,
            marcado: this.marcado,
            valor: this.valor,
        });
        localStorage.setItem("lista", JSON.stringify(meuStorage));
    }
    mostraItem() {
        // Cria o novo item da lista
        const novoLi = document.createElement("li");
        novoLi.classList.add("postit");
        novoLi.classList.add("list-group-item");
        novoLi.setAttribute("id", this.id);
        // Cria o checkbox e adiciona ele no item da lista
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("m-1");
        checkbox.classList.add("form-check-input");
        // checkbox.setAttribute(
        //     "onclick",
        //     atualizaValor(novoId),
        // );
        novoLi.appendChild(checkbox);
        // Adiciona o produto digitado
        const produto = document.createElement("span");
        produto.classList.add("ms-1");
        produto.innerText = this.item;
        novoLi.appendChild(produto);
        // Adiciona novo item na lista
        const lista = document.getElementById("lista");
        lista === null || lista === void 0 ? void 0 : lista.appendChild(novoLi);
    }
}
// const carregaLocalStorage: Function = () => {
//     const lista = document.createElement("ul");
//     const valorInicial = JSON.parse(localStorage.lista) || [];
//     valorInicial.forEach((item) => {});
// };
