// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);



// Functions

function addTodo(evt) {
  // Prevent form from submitting 
  evt.preventDefault();

  // create div container for todo
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // create li for todo item
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // add todo to local storage
  saveLocalTodos(todoInput.value);

  // completed button
  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
  completedBtn.classList.add('complete-btn');
  todoDiv.appendChild(completedBtn);

  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
  deleteBtn.classList.add('delete-btn');
  todoDiv.appendChild(deleteBtn);

  // add todo to list
  todoList.appendChild(todoDiv);

  // clear input value
  todoInput.value = '';
}

function deleteOrCheck(evt) {
  const item = evt.target;
  // delete todo
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo)
    // setTimeout(() => {
    //   todo.remove()
    // }, 1000)
    // remove todo after fall transition has completed
    todo.addEventListener('transitionend', evt => {
      todo.remove();
    })

  }

  // mark as complete
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}


function saveLocalTodos(todo) {
  // check if there are already todos saved
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // if there are, parse it back into an array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // push new todo to array
  todos.push(todo);
  // set it back to local storage
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
  // check if there are already todos saved
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // if there are, parse it back into an array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(todo => {
    // create div container for todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li for todo item
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // completed button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // add todo to list
    todoList.appendChild(todoDiv);

  })
}

function removeLocalTodos(todo) {
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // if there are, parse it back into an array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}