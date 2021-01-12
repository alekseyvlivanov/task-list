import 'awsm.css/dist/awsm.min.css';

const newTaskForm = document.querySelector('#new-task');
const newTaskText = document.querySelector('#new-task-text');

const tasksList = document.querySelector('#tasks');
const filterTasks = document.querySelector('#filter-tasks');
const clearTasksBtn = document.querySelector('#clear-tasks');

loadEventListeners();
newTaskText.focus();

function loadEventListeners() {
  newTaskForm.addEventListener('submit', addNewTask);
}

function addNewTask(e) {
  e.preventDefault();

  if (newTaskText.value.trim() === '') {
    return;
  }

  const newTask = document.createElement('li');
  newTask.append(document.createTextNode(newTaskText.value.trim()));

  tasksList.append(newTask);

  newTaskText.select();
}
