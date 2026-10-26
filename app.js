//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTasksList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTasksList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskString) {
  const taskItem = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const taskEditInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteIcon = document.createElement('img'); //delete button image

  label.innerText = taskString;
  label.className = 'task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  taskEditInput.type = 'text';
  taskEditInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(taskEditInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  //Append taskItem to incompleteTasksList
  incompleteTasksList.appendChild(taskItem);
  attachTaskEventListeners(taskItem);

  newTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const taskEditInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = taskEditInput.value;
    editBtn.innerText = 'Edit';
  } else {
    taskEditInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const ul = taskItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(taskItem);
};

//Mark task completed
const moveTask = function (event) {
  const taskItem = event.currentTarget.closest('li');
  const isCompleted = event.currentTarget.checked;
  const targetList = isCompleted ? completedTasksList : incompleteTasksList;
  targetList.appendChild(taskItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const attachTaskEventListeners = function (tasktaskItem) {
  //select taskItems children
  const checkBox = tasktaskItem.querySelector('input[type=checkbox]');
  const editButton = tasktaskItem.querySelector('button.edit');
  const deleteButton = tasktaskItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.addEventListener('change', moveTask);
};

//cycle over incompleteTasksList ul list items
//for each list item
for (let i = 0; i < incompleteTasksList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  attachTaskEventListeners(incompleteTasksList.children[i]);
}

//cycle over completedTasksList ul list items
for (let i = 0; i < completedTasksList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  attachTaskEventListeners(completedTasksList.children[i]);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
