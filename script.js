const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
  }
  const list = document.getElementById('todo-list');
  const itemCountSpan = document.getElementById('item-count');
  const uncheckedCountSpan = document.getElementById('unchecked-count');
  let todos = []; // Масив для збереження справ
  // Функція для додавання нової справи
  function newTodo() {
    // Діалогове вікно для введення нової справи
    const todoText = prompt('Enter a new TODO:');
    if (todoText) {
      const todo = {
        text: todoText,
        checked: false,
      };
  
      todos.push(todo);
      updateTodoList();
      saveTodosToLocalStorage();
    }
  }
  // Функція для видалення справи за індексом
  function deleteTodo(index) {
    todos.splice(index, 1);
    updateTodoList();
    saveTodosToLocalStorage();
  }
  // Функція для перемикання стану справи за індексом
  function toggleTodo(index) {
    todos[index].checked = !todos[index].checked;
    updateTodoList();
    saveTodosToLocalStorage();
  }
  // Функція для оновлення списку справ у веб-сторінці
  function updateTodoList() {
    list.innerHTML = '';
    let uncheckedCount = 0;
    todos.forEach((todo, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add(classNames.TODO_ITEM);
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add(classNames.TODO_CHECKBOX);
      checkbox.checked = todo.checked;
      checkbox.addEventListener('change', () => toggleTodo(index));
  
      const todoText = document.createElement('span');
      todoText.classList.add(classNames.TODO_TEXT);
      todoText.textContent = todo.text;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add(classNames.TODO_DELETE);
      deleteButton.addEventListener('click', () => deleteTodo(index));
  
      listItem.appendChild(checkbox);
      listItem.appendChild(todoText);
      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
  
      if (!todo.checked) {
        uncheckedCount++;
      }
    });
  
    itemCountSpan.textContent = todos.length;
    uncheckedCountSpan.textContent = uncheckedCount;
  }
  // Функція для збереження списку справ у Local Storage
  function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  // Функція для завантаження списку справ із Local Storage
  function loadTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
      updateTodoList();
    }
  }
  // Завантаження списку справ із Local Storage при завантаженні сторінки
  loadTodosFromLocalStorage();
  updateTodoList();