// Array que armazena todas as tarefas da aplicação.
// Cada item da lista será um objeto com: titulo, data, descricao e concluida.
const lista = [];

// Captura os elementos do HTML que serão usados na página.
const formulario = document.getElementById("formulario");
const novaTarefa = document.getElementById("novaTarefa");
const dataTarefa = document.getElementById("dataTarefa");
const descricaoTarefa = document.getElementById("descricao");
const tarefas = document.getElementById("tarefas");

// Escuta o envio do formulário.
// Quando o usuário clica em cadastrar, esse evento é disparado.
formulario.addEventListener("submit", (e) => {
  // Evita que a página recarregue ao enviar o formulário.
  e.preventDefault();

  // Pega os valores digitados pelo usuário e remove espaços extras.
  const titulo = novaTarefa.value.trim();
  const data = dataTarefa.value;
  const descricao = descricaoTarefa.value.trim();

  // Validação: título e data são obrigatórios.
  if (titulo === "" || data === "") {
    // Adiciona a classe "is-invalid" nos campos vazios para mostrar erro visual.
    novaTarefa.classList.add(`${titulo === "" ? "is-invalid" : ""}`);
    dataTarefa.classList.add(`${data === "" ? "is-invalid" : ""}`);
  } else {
    // Cria o objeto da tarefa e empurra para o array.
    lista.push({
      titulo: titulo,
      data: data,
      descricao: descricao,
      concluida: false,
    });

    // Limpa os campos após salvar a tarefa.
    novaTarefa.value = "";
    dataTarefa.value = "";
    descricaoTarefa.value = "";

    // Atualiza a visualização da lista na tela.
    atualizarLista();
  }
});

// Função responsável por exibir todas as tarefas na página.
function atualizarLista() {
  // Limpa a área de tarefas antes de renderizar novamente.
  tarefas.innerHTML = "";

  // Mostra o conteúdo do array no console para debug.
  console.log(lista);

  // Percorre cada item do array e cria um card para ele.
  lista.forEach((tarefa, index) => {
    // Converte a data no formato YYYY-MM-DD para DD/MM/YYYY.
    const [ano, mes, dia] = tarefa.data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Cria o container da tarefa.
    const divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");

    // Se a tarefa estiver concluída, adiciona uma classe visual.
    if (tarefa.concluida) {
      divTarefa.classList.add("concluida");
    }

    // Cria a área do texto da tarefa.
    const containerTexto = document.createElement("div");
    containerTexto.classList.add("containerTexto");

    // Cria o título da tarefa com o nome e a data.
    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo + " - " + dataFormatada;

    // Cria a descrição da tarefa.
    const descricao = document.createElement("p");
    descricao.textContent = tarefa.descricao;

    // Adiciona título e descrição ao container de texto.
    containerTexto.appendChild(titulo);
    containerTexto.appendChild(descricao);

    // Cria a área de ações: concluir e excluir.
    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    // Se a tarefa já estiver concluída, só mostra o botão de excluir.
    // Caso contrário, mostra botão de concluir e botão de excluir.
    acoes.innerHTML = tarefa.concluida
      ? `<button class="btn excluir" onclick="excluirTarefa(${index})">
            <i class="fa-solid fa-trash-can"></i>
        </button>`
      : `<button class="btn concluir" onclick="concluirTarefa(${index})">
            <i class="fa-solid fa-circle-check"></i>
        </button>
        <button class="btn excluir" onclick="excluirTarefa(${index})">
            <i class="fa-solid fa-trash-can"></i>
        </button>`;

    // Adiciona os elementos na estrutura da tarefa.
    divTarefa.appendChild(containerTexto);
    divTarefa.appendChild(acoes);

    // Adiciona a tarefa na área principal da página.
    tarefas.appendChild(divTarefa);
  });
}

// Remove a classe de erro quando o usuário começa a digitar no campo do título.
novaTarefa.addEventListener("input", () => {
  novaTarefa.classList.remove("is-invalid");
});

// Remove a classe de erro quando o usuário começa a digitar no campo da data.
dataTarefa.addEventListener("input", () => {
  dataTarefa.classList.remove("is-invalid");
});

// Marca a tarefa como concluída alterando o campo concluida para true.
const concluirTarefa = (index) => {
  lista[index].concluida = true;
  atualizarLista();
};

// Remove a tarefa do array e atualiza a tela.
const excluirTarefa = (index) => {
  lista.splice(index, 2);
  atualizarLista();
};
