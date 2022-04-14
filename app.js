// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


// Event Listeners
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

  // completed button
  const completedBtn = document.createElement('button');
  completedBtn.innerText = 'C';
  completedBtn.classList.add('complete-btn');
  todoDiv.appendChild(completedBtn);

  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'D';
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
    // setTimeout(() => {
    //   todo.remove()
    // }, 1000)
    // remove todo after fall transition has completed
    todo.addEventListener('transitioned', () => {
      todo.remove();
    })

  }

  // mark as complete
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}
