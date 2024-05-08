let tasks = [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';
    if (task.completed) {
      li.classList.add('completed');
    }
    li.innerHTML = `
      ${task.text}
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
      <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const priorityInput = document.getElementById('priorityInput');
  const dueDateInput = document.getElementById('dueDateInput');

  const text = taskInput.value.trim();
  const priority = parseInt(priorityInput.value);
  const dueDate = dueDateInput.value;

  if (text !== '') {
    tasks.push({ text, completed: false, dueDate, priority });
    taskInput.value = '';
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt('Enter new text for the task:');
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function sortTasks(criteria) {
  switch(criteria) {
    case 'priority':
      tasks.sort((a, b) => {
        if (a.priority === null) return 1;
        if (b.priority === null) return -1;
        return a.priority - b.priority;
      });
      break;
    case 'dueDate':
      tasks.sort((a, b) => {
        if (a.dueDate === null) return 1;
        if (b.dueDate === null) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      break;
    case 'completion':
      tasks.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return 0;
      });
      break;
    default:
      console.error('Invalid sorting criteria');
  }
  renderTasks();
}

// Initial rendering
renderTasks();