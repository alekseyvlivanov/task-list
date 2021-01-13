import 'awsm.css/dist/awsm.min.css';

const newTaskForm = document.querySelector('#new-task');
const newTaskText = document.querySelector('#new-task-text');

const tasksForm = document.querySelector('#tasks');
const tasksList = document.querySelector('#tasks-list');
const filterTasksText = document.querySelector('#filter-tasks');
const clearTasksBtn = document.querySelector('#clear-tasks');

loadEventListeners();
newTaskText.focus();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  newTaskForm.addEventListener('submit', addNewTask);
  tasksForm.addEventListener('submit', (e) => e.preventDefault());
  tasksList.addEventListener('click', removeTask);
  filterTasksText.addEventListener('input', filterTasks);
  clearTasksBtn.addEventListener('click', clearTasks);
}

function getTasks() {
  const lsTasks = localStorage.getItem('tasks');
  const tasks = lsTasks ? JSON.parse(lsTasks) : [];

  tasks.forEach((task) => {
    const newTask = document.createElement('li');

    const text = document.createElement('span');
    text.innerText = task;

    const link = document.createElement('a');
    link.className = 'remove-task';
    link.innerText = '×';
    link.title = 'Remove task';

    newTask.append(text);
    newTask.append(link);
    tasksList.append(newTask);
  });
}

function addNewTask(e) {
  e.preventDefault();

  const taskText = newTaskText.value.trim();

  if (taskText === '') {
    return;
  }

  const newTask = document.createElement('li');

  const text = document.createElement('span');
  text.innerText = taskText;

  const link = document.createElement('a');
  link.className = 'remove-task';
  link.innerText = '×';
  link.title = 'Remove task';

  newTask.append(text);
  newTask.append(link);
  tasksList.append(newTask);

  newTaskText.select();

  filterTasks();

  storeTaskInLocalStorage(taskText);
}

function storeTaskInLocalStorage(taskText) {
  const lsTasks = localStorage.getItem('tasks');
  const tasks = lsTasks ? JSON.parse(lsTasks) : [];

  tasks.push(taskText);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.classList.contains('remove-task')) {
    if (confirm('Remove task?')) {
      e.target.parentElement.remove();

      const tasks = [];
      tasksList.querySelectorAll('li').forEach((task) => {
        tasks.push(task.firstChild.textContent);
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
}

function filterTasks() {
  const filterText = filterTasksText.value.trim().toLowerCase();

  tasksList.querySelectorAll('li').forEach((task) => {
    task.style.display = task.firstChild.textContent
      .toLowerCase()
      .includes(filterText)
      ? ''
      : 'none';
  });
}

function clearTasks(e) {
  if (confirm('Remove all tasks?')) {
    while (tasksList.firstChild) {
      tasksList.removeChild(tasksList.firstChild);
    }

    localStorage.setItem('tasks', JSON.stringify([]));
  }
}
