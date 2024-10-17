const todos = [];
const RENDER_EVENT = 'render-todo';

let editTodoId = null; 

function generateId() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted
  };
}

function findTodo(todoId) {
  return todos.find(todo => todo.id === todoId) || null;
}

function findTodoIndex(todoId) {
  return todos.findIndex(todo => todo.id === todoId);
}

function makeTodo(todoObject) {
  const { id, task, timestamp, isCompleted } = todoObject;

  const textTitle = document.createElement('h2');
  textTitle.innerText = task;

  const textTimestamp = document.createElement('p');
  textTimestamp.innerText = timestamp;

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${id}`);

  if (isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(id);
    });

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
      enterEditMode(id);
    });

    container.append(undoButton, trashButton, editButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(id);
    });

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
      enterEditMode(id);
    });

    container.append(checkButton, editButton);
  }
  return container;
}

function addTodo() {
  const textTodo = document.getElementById('title').value.trim();
  const timestamp = document.getElementById('date').value;

  if (textTodo === '' || timestamp === '') {
    alert('Silakan isi semua field.');
    return;
  }

  if (editTodoId === null) {
    
    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);
  } else {
    
    const todoIndex = findTodoIndex(editTodoId);
    if (todoIndex !== -1) {
      todos[todoIndex].task = textTodo;
      todos[todoIndex].timestamp = timestamp;
      editTodoId = null; 
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  document.getElementById('form').reset(); 
}

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function enterEditMode(todoId) {
  const todo = findTodo(todoId);
  if (todo == null) return;

  const titleInput = document.getElementById('title');
  const dateInput = document.getElementById('date');

  titleInput.value = todo.task;
  dateInput.value = todo.timestamp;

  editTodoId = todoId; 
}

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById('todos');
  const listCompleted = document.getElementById('completed-todos');

  uncompletedTODOList.innerHTML = '';
  listCompleted.innerHTML = '';

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (todoItem.isCompleted) {
      listCompleted.append(todoElement);
    } else {
      uncompletedTODOList.append(todoElement);
    }
  }
});

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function isStorageExist()  {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
