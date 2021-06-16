const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const saveButton = document.querySelector(".save-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

const addTodo = (e) => {
  // prevent Default behaviour of form
  e.preventDefault();

  // render to screen
  renderElementsToDom(todoInput.value);

  // save to local storage
  saveTodos(todoInput.value);

  // Reset Input
  todoInput.value = "";
};

const renderElementsToDom = (value) => {
  // create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.textContent = value;
  todoDiv.appendChild(newTodo);

  // create buttons
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  editButton.classList.add("edit-button");
  todoDiv.appendChild(editButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  // append todoDiv to todoList div
  todoList.appendChild(todoDiv);
};

const deleteCheck = (e) => {
  const item = e.target;

  // delete button
  if (item.classList[0] === "trash-button") {
    // grab parent
    const todo = item.parentElement;

    // add transition
    todo.classList.add("fall");
    removeTodo(todo);
    // after transition end, then remove element
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // check button
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  if (item.classList[0] === "edit-button") {
    const todo = item.parentElement;
    editTodo(todo);
  }
};

const filterTodos = (e) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "incompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

const saveTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    renderElementsToDom(todo);
  });
};

const removeTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoText = todo.children[0].textContent;
  const todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const editTodo = (todo) => {
  let saveIndex = document.getElementById("save-index");
  const todoText = todo.children[0].textContent;

  const todos = JSON.parse(localStorage.getItem("todos"));

  const todoIndex = todos.indexOf(todoText);

  saveIndex.value = todoIndex;

  todoInput.value = todos[todoIndex];
};

const saveTodo = () => {
  let saveIndex = document.getElementById("save-index").value;
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[saveIndex] = todoInput.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
saveButton.addEventListener("click", saveTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodos);
