//arquivo js que cuida da integração da api

const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

//faz a conexão e rebe os dados das tasks
const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks')
  const tasks = await response.json()
  return tasks;
}


//pega os dados do frontend e envia por meio do fetch para a api e retorna os dados 
const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch('http://localhost:3333/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });


  loadTasks();
  inputTask.value = '';
}

//pega o id do frontend e envia por meio do fetch para a api e retorna os dados 
const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'delete',
  });

  loadTasks();
}

//pega os dados da task e envia para a api para serem alterados e os retorna
const updateTask = async ({ id, title, status }) => {

  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
}


//pega a data atual
const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
}


//esse bloco de codigo e responsavel por gera as os elementos na tela
//essa funçãp rebe a "tag" que sera gerado com ou sem o innerText e p innerHTML
const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

//essa parte é responsavel pelo o status da task
const createSelect = (value) => {
  const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluída">concluída</option>
  `;

  const select = createElement('select', '', options);

  select.value = value;

  return select;
}

//Esse bloco de codigo cria a coluna das task
//Essa parte do cogigo depende principalmente dos dados que foram recebidos da api
//e a função createElement que é essencial para geral os elementos para que mostre a  task na tela 
const createRow = (task) => {

  //separa os dados da task
  const { id, title, created_at, status } = task;

  //gera os elementos como 'tr,td' 
  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

  select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }));

  //gera os botões para alteara e excluir
  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
  
  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;
  editForm.appendChild(editInput);
  
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  deleteButton.addEventListener('click', () => deleteTask(id));
  
  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}

//responsavel por carregar as tasks
const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
}


addForm.addEventListener('submit', addTask);

//chama a função de carrega as tasks
loadTasks();