let dados = [];

// Inicia a busca ao clicar no botão
async function iniciarBusca() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();

        console.log("Dados carregados:", dados);

        exibirCards(dados); // já exibe todos ao carregar
        filtrarBusca(); // ativa o filtro da busca
    } catch (error) {
        console.error("Erro ao carregar o arquivo JSON:", error);
    }
}

// Função para exibir cards
function exibirCards(lista) {
    const container = document.querySelector(".card-container");
    container.innerHTML = ""; // limpa antes de renderizar

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    lista.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${item.titulo}</h2>
            <p><strong>Ano:</strong> ${item.ano}</p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `;

        container.appendChild(card);
    });
}

// Filtra conforme o usuário digita ou clica em buscar
function filtrarBusca() {
    const campo = document.getElementById("campo-busca");

    campo.addEventListener("input", () => {
        const texto = campo.value.toLowerCase();

        const filtrados = dados.filter(item =>
            item.titulo.toLowerCase().includes(texto)
        );

        exibirCards(filtrados);
    });
}
