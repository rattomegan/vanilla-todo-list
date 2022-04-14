const icons = {
  // complete: '<i class="fa-regular fa-check"></i>',
  complete: '<i class="fa-regular fa-square-check"></i>',
  deleted: '<i class="fa-solid fa-xmark"></i>',
  checkbox: '<i class="fa-regular fa-square"></i>'
}


// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const error = document.querySelector('.error')


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);


// State Variables
let todos;

// Functions

function addTodo(evt) {
  // Prevent form from submitting 
  evt.preventDefault();
  error.innerText = '';
  // alert for empty string entry
  if(!todoInput.value) {
    error.innerText = 'Please enter a todo'
  } else {
    // create div container for todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // completed button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = icons['complete'];
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);


    // create li for todo item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = icons['deleted'];
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // add todo to list
    todoList.appendChild(todoDiv);

    // clear input value
    todoInput.value = '';
  }
  
}

function deleteOrCheck(evt) {
  const item = evt.target; // this returns the entire button
  // delete todo
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo)
    // remove todo once transition has finished
    todo.addEventListener('transitionend', evt => {
      todo.remove();
    })
  }

  // mark as complete
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');

    // new code here
    item.classList.toggle('complete');
    if(item.classList[1] === 'complete') {
      item.innerHTML = icons['complete']
    } else {
      item.innerHTML = icons['checkbox'];
    }
    console.log(item)
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


function getTodos() {
  // check if there are already todos saved
  checkLocalStorage();
  todos.forEach(todo => {
    // create div container for todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // completed button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = icons['checkbox'];
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    // create li for todo item
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = icons['deleted'];
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // add todo to list
    todoList.appendChild(todoDiv);

  })
}

function removeLocalTodos(todo) {
  checkLocalStorage();
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function checkLocalStorage() {
  // if our todo array doesn't exist, create on, otherwise, parse 
  return !localStorage.getItem('todos') ? todos = [] : todos = JSON.parse(localStorage.getItem('todos'));
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