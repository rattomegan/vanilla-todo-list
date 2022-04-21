// Constants
const icons = {
  complete: '<i class="fa-regular fa-square-check"></i>',
  deleted: '<i class="fa-solid fa-xmark"></i>',
  checkbox: '<i class="fa-regular fa-square"></i>',
}


// State Variables
let todos;


// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const error = document.querySelector('.error');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrComplete);


// Functions
function createTodo(todo) {
  // create div container
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create checkmark button
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = icons['checkbox'];
  completeBtn.classList.add('complete-btn');
  todoDiv.appendChild(completeBtn);
  // create li element for todo text
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = icons['deleted'];
  deleteBtn.classList.add('delete-btn');
  todoDiv.appendChild(deleteBtn);

  return todoDiv;
}


function addTodo(evt) {
  // Prevent form from submitting 
  evt.preventDefault();
  error.innerText = '';
  // error for empty string entry
  if(!todoInput.value) {
    error.innerText = 'Please enter a todo!'
  } else {
    // create div container for todo
    let todoDiv = createTodo(todoInput.value);
    // add todo to list
    todoList.appendChild(todoDiv);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    // clear input value
    todoInput.value = '';
  }
};


function getTodos() {
  // check if there are already todos saved
  checkLocalStorage();
  todos.forEach(todo => {
    // create todo
    let todoDiv = createTodo(todo);
    // add todo to list
    todoList.appendChild(todoDiv);
  })
}


function deleteOrComplete(evt) {
  const item = evt.target; // this returns the entire button
  // delete todo
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement; // This gives us the entire todo div
    todo.classList.add('fall');
    removeLocalTodos(todo);
    // remove todo once transition has finished
    todo.addEventListener('transitionend', evt => {
      todo.remove();
    }) 
  }

  // mark as complete
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    // add new classname to toggle icon
    item.classList.toggle('complete');
    item.innerHTML = item.classList[1] === 'complete' 
      ? icons['complete'] 
      : icons['checkbox'];
  }
}


function saveLocalTodos(todo) {
  // check if there are already todos saved
  checkLocalStorage();
  // push new todo to array
  todos.push(todo);
  // set it back to local storage
  localStorage.setItem('todos', JSON.stringify(todos));
}


function removeLocalTodos(todo) {
  checkLocalStorage();
  const todoText = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function checkLocalStorage() {
  // if our todo array exists parse, else create
  return todos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];
}


// Live Time
function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " ");
  timeDisplay.textContent = formattedString;
}

refreshTime();

setInterval(refreshTime, 1000);


// COLOR SELECTOR CODE

// select div that holds all theme buttons
const themePicker = document.querySelector('.theme-picker');

// get target.id for each button to pass to changeTheme();
themePicker.addEventListener('click', (evt) => changeTheme(evt.target.id))

function changeTheme(theme) {
  localStorage.setItem('savedTheme', theme);
  document.body.className = theme;
}

function getTheme() {
  let savedTheme = localStorage.getItem('savedTheme');
  savedTheme === null ? changeTheme('default-theme') : changeTheme(savedTheme);
}

getTheme();