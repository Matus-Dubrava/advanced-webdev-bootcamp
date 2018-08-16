// --------------------- FUNCTION DECLARATIONS -------------------

async function loadTodos() {
  const response = await axios.get('/api/todos');
  addTodos(response.data);
}

function addTodo(todo) {
  const newTodo = document.createElement('li'),
        span = document.createElement('span'),
        button = document.createElement('button'),
        list = document.querySelector('.list');

  idTable.set(newTodo, { id: todo._id, completed: todo.completed });

  list.append(newTodo);
  newTodo.append(span);
  newTodo.append(button);

  span.textContent = todo.name;
  button.textContent = 'x';
  button.className = 'del-btn';

  if (todo.completed) { span.classList.add('done'); }
}

function addTodos(todos) {
  todos.forEach(addTodo);
}

async function createTodo(name) {
  let newTodo;

  try {
    newTodo = await axios.post('/api/todos', { name });
    addTodo(newTodo.data);
    input.value = '';
  } catch(err) {
    console.error(err);
  }
}

async function deleteTodo(todoItem) {
  const id = idTable.get(todoItem).id;

  try {
    await axios({ method: 'delete', url: '/api/todos/' + id });
    todoItem.remove();
  } catch(err) {
    console.error(err);
  }
}

async function updateTodo(todoItem) {
  const idTableEntry = idTable.get(todoItem);
        id = idTableEntry.id,
        completed = idTableEntry.completed,
        todoSpan = todoItem.querySelector('span');

  let updatedTodo;

  try {
    updatedTodo = await axios({
      method: 'PUT',
      url: '/api/todos/' + id,
      data: { completed: !completed }
    });

    if (completed) {
      todoSpan.classList.remove('done');
      idTableEntry.completed = false;
    } else {
      todoSpan.classList.add('done');
      idTableEntry.completed = true;
    }

  } catch (err) {
    console.error(err);
  }
}

// ---------------------- MAIN APP CODE -------------------------

const input = document.getElementById('todoInput'),
      list = document.querySelector('.list'),
      idTable = new WeakMap();

loadTodos();

input.addEventListener('keypress', (evt) => {
  if (evt.which === 13) { createTodo(input.value) };
});

list.addEventListener('click', (evt) => {
  if (evt.target.className === 'del-btn') {
    deleteTodo(evt.target.parentNode);
  } else if (evt.target.tagName === 'LI') {
    updateTodo(evt.target);
  } else if (evt.target.tagName === 'SPAN') {
    updateTodo(evt.target.parentNode);
  }
});
