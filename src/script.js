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
  tasksList.addEventListener('click', removeTask);
  clearTasksBtn.addEventListener('click', clearTasks);
}

function addNewTask(e) {
  e.preventDefault();

  if (newTaskText.value.trim() === '') {
    return;
  }

  const newTask = document.createElement('li');

  const text = document.createElement('span');
  text.innerText = newTaskText.value.trim();

  const link = document.createElement('a');
  link.className = 'remove-task';
  link.innerText = '×';
  link.title = 'Remove task';

  newTask.append(text);
  newTask.append(link);
  tasksList.append(newTask);

  newTaskText.select();
}

function removeTask(e) {
  if (e.target.classList.contains('remove-task')) {
    if (confirm('Remove task?')) {
      e.target.parentElement.remove();
    }
  }
}

function clearTasks(e) {
  if (confirm('Remove all tasks?')) {
    // tasksList.innerHTML = '';

    while (tasksList.firstChild) {
      tasksList.removeChild(tasksList.firstChild);
    }
  }
}
