const newTaskInput = document.getElementById('new-task');
const addButton = document.querySelector('#addTaskButton');
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const taskItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const taskEditInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  taskEditInput.type = 'text';
  taskEditInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(taskEditInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(taskItem);
  attachTaskEventListeners(taskItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;

  const taskEditInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = taskEditInput.value;
    editBtn.innerText = 'Edit';
  } else {
    taskEditInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const ul = taskItem.parentNode;
  ul.removeChild(taskItem);
};

const moveTask = function (event) {
  const taskItem = event.currentTarget.closest('li');
  const isCompleted = event.currentTarget.checked;
  const targetList = isCompleted ? completedTasksList : incompleteTasksList;
  targetList.appendChild(taskItem);
};

addButton.addEventListener('click', addTask);

const attachTaskEventListeners = function (taskItem) {
  const checkBox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.addEventListener('change', moveTask);
};

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  attachTaskEventListeners(incompleteTasksList.children[i]);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  attachTaskEventListeners(completedTasksList.children[i]);
}
