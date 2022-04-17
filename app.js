class Item {
    constructor(
        item,
        marcado = false,
        valor = 0,

        // Determina um ID aleatório para nosso item
        id = "id" + Math.random().toString(16).slice(2),
    ) {
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

    // Método que mostra o respectivo item na lista do usuario
    mostraItem() {
        // Cria o novo item da lista
        const novoLi = document.createElement("li");
        novoLi.classList.add("postit");
        novoLi.classList.add("list-group-item");
        novoLi.classList.add("d-flex");
        novoLi.classList.add("justify-content-between");
        novoLi.classList.add("align-items-center");
        novoLi.setAttribute("id", this.id);

        // Cria o checkbox e adiciona ele no item da lista
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("m-1");
        checkbox.classList.add("form-check-input");

        // Adiciona o produto digitado
        const produto = document.createElement("p");
        produto.classList.add("mb-0");
        produto.innerText = this.item;

        if (this.marcado === true) {
            checkbox.setAttribute("checked", "checked");
            produto.classList.add("riscado");
        }
        novoLi.appendChild(checkbox);
        novoLi.appendChild(produto);

        // Adiciona botão de exclusão
        const excluir = document.createElement("button");
        excluir.setAttribute("type", "button");
        excluir.classList.add("excluir");
        excluir.classList.add("btn-danger");
        excluir.innerHTML = `&times;`;
        novoLi.appendChild(excluir);

        // Adiciona novo item na lista
        const lista = document.getElementById("lista");
        lista.appendChild(novoLi);
    }
}

// Adiciona na lista o que foi digitado no campo de input após o botão ser clicado
const adicionaNaLista = () => {
    let entradaParaAdicao = document.querySelector("#entradaParaAdicao");
    if (entradaParaAdicao.value) {
        const item = new Item(entradaParaAdicao.value);
        item.novoItem();
        item.mostraItem();
        entradaParaAdicao.value = "";
    }
};

// Carrega a lista de itens para o usuário
const carregaLista = () => {
    // Apaga lista anterior
    const lista = document.getElementById("lista");
    lista.innerText = "";

    // Cria nova lista com base no localStorage
    const meuStorage = JSON.parse(localStorage.getItem("lista") || "[]");
    meuStorage.forEach((index) => {
        const novoItem = new Item(
            index.item,
            index.marcado,
            index.valor,
            index.id,
        );
        novoItem.mostraItem();
    });
    carregaValorTotal();
};

let itemId;

// Função para descobrir a posição do item na lista do localStorage
const descobrePosicaoNoStorage = (id) => {
    const meuStorage = JSON.parse(localStorage.getItem("lista"));

    for (let index in meuStorage) {
        let item = meuStorage[index];
        if (item.id === id) {
            return index;
        }
    }
};

// Redireciona o evento que for recebido
const redirecionaEvento = (elemento) => {
    if (elemento.target.type === "checkbox") {
        // Pega o id da li pai do elemento
        itemId = elemento.composedPath()[1].id;

        const indexStorage = descobrePosicaoNoStorage(itemId);
        const meuStorage = JSON.parse(localStorage.getItem("lista"));

        // Verifica se o checkbox do item foi marcado
        if (elemento.target.checked) {
            // Chama modal para atualizar preço
            chamaModal();

            // Define o valor de marcado no localStorage para true
            meuStorage[indexStorage].marcado = true;

            // Adicona uma classe de estilização para traçar a escrita do item
            const item = document.querySelector(`#${itemId} p`);
            item.classList.add("riscado");
        } else {
            // Define valor no local storage para 0
            meuStorage[indexStorage].valor = 0;

            // Define o valor de marcado no localStorage para false
            meuStorage[indexStorage].marcado = false;

            // Retira a classe de estilização que traça o item
            const item = document.querySelector(`#${itemId} p`);
            item.classList.remove("riscado");
        }

        // Atualizando o localStorage
        localStorage.setItem("lista", JSON.stringify(meuStorage));

        // Atualiza o valor total na tela do usuario
        carregaValorTotal();
    }

    // Função para deletar item da lista
    else if (elemento.target.type === "button") {
        // Pega o id da li pai do elemento
        itemId = elemento.composedPath()[1].id;

        const meuStorage = JSON.parse(localStorage.getItem("lista"));
        const indexStorage = descobrePosicaoNoStorage(itemId);

        // Removendo o item do localStorage
        meuStorage.splice(indexStorage, 1);
        localStorage.setItem("lista", JSON.stringify(meuStorage));

        // Atualiza a lista e o valor total para o usuario
        carregaLista();
        carregaValorTotal();
    }
};

// Função que mostra o modal de inserção de preço parao usuário
const chamaModal = () => {
    const modal = new bootstrap.Modal(document.querySelector("#modalValor"));
    modal.show();
};

const inserePreco = () => {
    const valor = document.getElementById("valorItem");
    const itemIndex = descobrePosicaoNoStorage(itemId);
    const meuStorage = JSON.parse(localStorage.getItem("lista"));

    // Atualiza preço do item no localStorage
    meuStorage[itemIndex].valor = valor.value;
    localStorage.setItem("lista", JSON.stringify(meuStorage));

    // Atualiza o valor do input para vazio
    valor.value = "";

    // Atualiza o valor total na tela do usuario
    carregaValorTotal();
};

const fechaModal = () => {
    // Atualiza o valor do input para vazio
    const valor = document.getElementById("valorItem");
    valor.value = "";

    const itemIndex = descobrePosicaoNoStorage(itemId);
    const meuStorage = JSON.parse(localStorage.getItem("lista"));

    // Atualiza o item da lista com marcado false
    meuStorage[itemIndex].marcado = false;
    localStorage.setItem("lista", JSON.stringify(meuStorage));

    // Recarrega a lista de itens
    carregaLista();

    // Atualiza o valor total na tela do usuario
    carregaValorTotal();
};

// Soma todos os valores do produto na lista e entrega na tela do usuario
const carregaValorTotal = () => {
    const meuStorage = JSON.parse(localStorage.getItem("lista"));
    let novoValorTotal = 0;
    for (let item of meuStorage) {
        novoValorTotal += Number(item.valor);
    }
    const valorTotal = document.getElementById("valorTotal");
    valorTotal.innerText = novoValorTotal;
};

// Escuta os eventos que vão acontecer na lista do usuario
document.getElementById("lista").addEventListener("click", (elemento) => {
    redirecionaEvento(elemento);
});
