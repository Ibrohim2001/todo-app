const todoInput = document.querySelector('.todo_input');
const addBtn = document.querySelector('.add_btn');
const todoList = document.querySelector('.todo_list');
console.log(todoInput)


window.addEventListener('click', getLocal())
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(e) {
  e.preventDefault();

  if(todoInput.value !== '') {
      // create li
    const listItem = document.createElement('li');
    listItem.classList.add('todo_items');
    
    const todoName = document.createElement('p');
    todoName.innerHTML = todoInput.value
    todoName.classList.add('todo_name');
    listItem.appendChild(todoName);
    saveLocal(todoInput.value);

    // options
    const todoOptions = document.createElement('div');
    todoOptions.classList.add('todo_options')

    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completed_btn');
    completedBtn.innerHTML = "<i class='fas fa-check'></i>";

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete_btn');
    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";

    todoOptions.appendChild(completedBtn);
    todoOptions.appendChild(deleteBtn);
    listItem.append(todoOptions);

    todoList.appendChild(listItem);
    todoInput.value = '';
  }
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === 'delete_btn') {
      const todo = item.parentElement.parentElement;
      console.log(todo)
      todo.classList.add('delete_effect');
      // if(todo.classList.contains('todo_items')) {
      //   todo.classList.remove('todo_items')
      //   todo.classList.add('delete_effect');
      // }
      removeTodo(todo);
      todo.addEventListener("transitionend", e => {
        todo.remove();
      });
    }

    if(item.classList[0] === 'completed_btn') {
      const todo = item.parentElement.parentElement;
      console.log(todo)
      todo.classList.toggle('completed');
    }
}

function saveLocal(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocal() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
      // create li
  const listItem = document.createElement('li');
  listItem.classList.add('todo_items');
  
  const todoName = document.createElement('p');
  todoName.innerHTML = todo
  todoName.classList.add('todo_name');
  listItem.appendChild(todoName);

  // options
  const todoOptions = document.createElement('div');
  todoOptions.classList.add('todo_options')

  const completedBtn = document.createElement('button');
  completedBtn.classList.add('completed_btn');
  completedBtn.innerHTML = "<i class='fas fa-check'></i>";

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete_btn');
  deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";

  todoOptions.appendChild(completedBtn);
  todoOptions.appendChild(deleteBtn);
  listItem.append(todoOptions);

  todoList.appendChild(listItem);
  });
}

function removeTodo(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // todos.push(todo);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex, 1))
  localStorage.setItem('todos', JSON.stringify(todos));
}
