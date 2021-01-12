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
  newTaskForm.addEventListener('submit', addNewTask);
  tasksForm.addEventListener('submit', (e) => e.preventDefault());
  tasksList.addEventListener('click', removeTask);
  filterTasksText.addEventListener('input', filterTasks);
  clearTasksBtn.addEventListener('click', clearTasks);
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
}

function removeTask(e) {
  if (e.target.classList.contains('remove-task')) {
    if (confirm('Remove task?')) {
      e.target.parentElement.remove();
    }
  }
}

function filterTasks(e) {
  const filterText = e.target.value.trim().toLowerCase();

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
    // tasksList.innerHTML = '';

    while (tasksList.firstChild) {
      tasksList.removeChild(tasksList.firstChild);
    }
  }
}
