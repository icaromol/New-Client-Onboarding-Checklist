// Seleciona o formulário, input e lista de tarefas da categoria "Outros"
const form = document.querySelector("form");
const input = document.querySelector("#name");
const otherCategory = document.querySelector("#other-category"); // Categoria "Outros"
const taskList = document.querySelector("#other-tasks"); // Lista de tarefas dentro da categoria "Outros"

// Evento para capturar o envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Previne o comportamento padrão de recarregar a página

  const taskText = input.value.trim(); // Obtém o texto do input e remove espaços extras
  const regex = /^[a-zA-Z\s]+$/; // Regex para validar apenas letras e espaços

  // Validação: o texto deve conter apenas letras e espaços
  if (regex.test(taskText)) {
    addTask(taskText); // Chama a função para adicionar a nova tarefa
    alert("Tarefa de onboarding adicionada."); // Exibe um alerta de confirmação
    input.value = ""; // Limpa o campo de input após a adição da tarefa
  } else {
    alert("Digite uma tarefa válida (somente letras e espaços)."); // Exibe erro de validação
  }
});

// Função para adicionar uma nova tarefa na categoria "Outros"
function addTask(taskText) {
  // Exibe a categoria "Outros" caso esteja escondida
  if (otherCategory.classList.contains("hidden")) {
    otherCategory.classList.remove("hidden");
  }

  // Cria o elemento <li> para a nova tarefa
  const newTask = document.createElement("li");
  newTask.classList.add("guest"); // Adiciona a classe "guest" para o estilo
  newTask.id = `task-${taskList.children.length + 1}`; // Define um ID único baseado no número de tarefas

  // Cria o ícone clicável para alternar entre "check" e "uncheck"
  const taskIcon = document.createElement("img");
  taskIcon.src = "assets/square-stroke-rounded.svg"; // Ícone padrão de tarefa
  taskIcon.alt = "Task Icon"; // Texto alternativo para acessibilidade
  taskIcon.classList.add("task-icon");
  taskIcon.onclick = () => toggleCheck(taskIcon); // Adiciona o evento de clique para alternar o estado

  // Cria o elemento <span> para o texto da tarefa
  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = taskText; // Define o texto da tarefa

  // Cria o ícone de deleção para a tarefa
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "assets/cancel-01-stroke-rounded.svg"; // Novo ícone de cancelamento
  deleteIcon.alt = "Cancel Icon"; // Texto alternativo para acessibilidade
  deleteIcon.classList.add("delete-icon");
  deleteIcon.onclick = () => confirmDelete(newTask, taskText); // Adiciona o evento de clique para confirmar a exclusão

  // Adiciona os elementos (ícone, texto e deleção) à nova tarefa
  newTask.appendChild(taskIcon);
  newTask.appendChild(taskTextElement);
  newTask.appendChild(deleteIcon);

  // Adiciona a nova tarefa à lista de "Outros"
  document.querySelector("#other-tasks").appendChild(newTask);

  // Atualiza o estado no Local Storage
  saveTaskState();
}

// Função para alternar entre ícones "check" e "uncheck"
function toggleCheck(img) {
  const uncheckedIcon = "assets/square-stroke-rounded.svg"; // Ícone de "uncheck"
  const checkedIcon = "assets/checkmark-square-04-stroke-rounded.svg"; // Ícone de "check"
  const taskText = img.parentElement.querySelector("span"); // Seleciona o texto da tarefa

  // Verifica o estado atual do ícone e alterna
  if (img.src.includes("square-stroke-rounded.svg")) {
    img.src = checkedIcon; // Altera para "check"
    img.alt = "Checked";
    img.classList.add("checked"); // Adiciona a classe de estado
    taskText.classList.add("checked"); // Adiciona o estilo riscado ao texto
  } else {
    img.src = uncheckedIcon; // Altera para "uncheck"
    img.alt = "Unchecked";
    img.classList.remove("checked"); // Remove a classe de estado
    taskText.classList.remove("checked"); // Remove o estilo riscado do texto
  }

  // Salva o estado atualizado no Local Storage
  saveTaskState();
}

// Função para confirmar a exclusão de uma tarefa
function confirmDelete(task, taskText) {
  // Cria a mensagem de confirmação
  const confirmBox = document.createElement("div");
  confirmBox.classList.add("confirm-box");

  // Mensagem de confirmação
  const message = document.createElement("p");
  message.textContent = `Você deseja realmente excluir a tarefa "${taskText}"?`;

  // Botão Excluir
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";
  deleteButton.classList.add("confirm-delete");
  deleteButton.onclick = () => {
    task.remove(); // Remove a tarefa da lista
    confirmBox.remove(); // Remove a caixa de confirmação
    saveTaskState(); // Atualiza o estado no Local Storage
  };

  // Botão Voltar
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Voltar";
  cancelButton.classList.add("confirm-cancel");
  cancelButton.onclick = () => confirmBox.remove(); // Fecha a caixa de confirmação

  // Adiciona os elementos à caixa de confirmação
  confirmBox.appendChild(message);
  confirmBox.appendChild(deleteButton);
  confirmBox.appendChild(cancelButton);

  // Adiciona a caixa de confirmação ao corpo
  document.body.appendChild(confirmBox);
}