const adicionaNaLista: Function = () => {
    let entradaParaAdicao: HTMLInputElement | null =
        document.querySelector("#entradaParaAdicao");
    if (entradaParaAdicao?.value) {
        const item = new Item(entradaParaAdicao?.value || "Erro");
        item.novoItem();
        item.mostraItem();
    }
    // entradaParaAdicao?.value = null;
};

const carregaLista: Function = () => {
    // const meuStorage = JSON.parse(localStorage.get("lista"));
    const meuStorage: Array<Object> = JSON.parse(
        localStorage.getItem("lista") || "[]",
    );
    meuStorage.forEach((index: Object) => {
        const novoItem: Item = new Item(index.item);
    });
};
class Item {
    item: string = "";
    marcado: boolean = false;
    valor: number = 0;
    id: string = "";
    constructor(
        item: string,
        marcado: boolean = false,
        valor: number = 0,

        // Determina um ID aleatório para nosso item
        id: string = Math.random().toString(16).slice(2),
    ) {
        this.item = item;
        this.marcado = marcado;
        this.valor = valor;
        this.id = id;
    }

    // Cria item novo para ser adicionado na lista e no localStorage
    novoItem() {
        // Atualiza a lista do localStorage com o novo item
        const meuStorage: Array<Object | null> = JSON.parse(
            localStorage.getItem("lista") || "[]",
        );
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
        const novoLi: HTMLElement = document.createElement("li");
        novoLi.classList.add("postit");
        novoLi.classList.add("list-group-item");
        novoLi.setAttribute("id", this.id);

        // Cria o checkbox e adiciona ele no item da lista
        const checkbox: HTMLElement = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("m-1");
        checkbox.classList.add("form-check-input");
        // checkbox.setAttribute(
        //     "onclick",
        //     atualizaValor(novoId),
        // );
        novoLi.appendChild(checkbox);

        // Adiciona o produto digitado
        const produto: HTMLElement = document.createElement("span");
        produto.classList.add("ms-1");
        produto.innerText = this.item;
        novoLi.appendChild(produto);

        // Adiciona novo item na lista
        const lista: HTMLElement | null = document.getElementById("lista");
        lista?.appendChild(novoLi);
    }
}

// const carregaLocalStorage: Function = () => {
//     const lista = document.createElement("ul");

//     const valorInicial = JSON.parse(localStorage.lista) || [];
//     valorInicial.forEach((item) => {});
// };
