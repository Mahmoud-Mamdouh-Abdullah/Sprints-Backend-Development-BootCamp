//"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

// Task-3 Code Start

const viewSaveCancel = function (saveBtn, cancelBtn, editBtn) {
  saveBtn.classList.remove('d-none');
  cancelBtn.classList.remove('d-none');
  editBtn.classList.add('d-none');
}

const hideSaveCancel = function (saveBtn, cancelBtn, editBtn) {
  saveBtn.classList.add('d-none');
  cancelBtn.classList.add('d-none');
  editBtn.classList.remove('d-none');
}

const getWorkingValues = function (saveButton, i, cancelOrSave) {
  let par = saveButton.parentElement;
  let editBtn = par.querySelector('#edit' + i);

  let cancelorSaveBtn;
  if (cancelOrSave === 1)
    cancelorSaveBtn = par.querySelector('#cancel' + i);
  else
    cancelorSaveBtn = par.querySelector('#save' + i);

  let parOfPar = par.parentElement;
  let tds = parOfPar.querySelectorAll('td');

  let taskNameElement = tds[1];
  let priorityElement = tds[2];

  return [editBtn, cancelorSaveBtn, taskNameElement, priorityElement];
}

const save = function (saveBtn, i) {
  const workingValues = getWorkingValues(saveBtn, i, 1);

  let editBtn = workingValues[0];
  let cancelBtn = workingValues[1];
  let taskNameElement = workingValues[2];
  let priorityElement = workingValues[3];

  let taskName = taskNameElement.querySelector('#taskNameEdit').value;
  let priority = priorityElement.querySelector("#taskPriorityEdit").value;

  taskNameElement.innerHTML = taskName;
  priorityElement.innerHTML = getPriorityName(priority);

  tasks[i].name = taskName;
  tasks[i].priority = priority;

  hideSaveCancel(saveBtn, cancelBtn, editBtn);

}

const cancel = function (cancelBtn, i) {

  const workingValues = getWorkingValues(cancelBtn, i, 2);

  let editBtn = workingValues[0];
  let saveBtn = workingValues[1];
  let taskNameElement = workingValues[2];
  let priorityElement = workingValues[3];

  hideSaveCancel(saveBtn, cancelBtn, editBtn);

  taskNameElement.innerText = tasks[i].name;
  priorityElement.innerText = getPriorityName(tasks[i].priority);
}

const edit = function (editBtn, i) {

  let par = editBtn.parentElement;
  let saveBtn = par.querySelector('#save' + i);
  let cancelBtn = par.querySelector('#cancel' + i);

  viewSaveCancel(saveBtn, cancelBtn, editBtn);


  let parOfPar = par.parentElement;
  let tds = parOfPar.querySelectorAll('td');

  let taskNameElement = tds[1];
  taskNameElement.innerHTML =
    `<div class="col-md-6">
        <input type="text" id="taskNameEdit" class="form-control" placeholder="Task name..." value="${tasks[i].name}" />
     </div>`;


  let priorityElement = tds[2];
  priorityElement.innerHTML =
    `<div class="col-md-12">
        <select id="taskPriorityEdit" class="form-control" >
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
        </select>
    </div>`;
  priorityElement.querySelector('#taskPriorityEdit').value = tasks[i].priority;

  console.log(tasks);

}

// Task-3 Code End



const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${i > 0
        ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
        : ``
      }
        ${i < tasks.length - 1
        ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
        : ``
      }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" id="edit${i}" onclick="edit(edit${i},${i})">Edit</button>
        <button class="btn btn-success btn-sm d-none" id="save${i}" onclick="save(save${i},${i})">Save</button>
        <button class="btn btn-danger btn-sm d-none" id="cancel${i}" onclick="cancel(cancel${i},${i})">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};
const addTask = function () {
  //console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

document.querySelector("#add").addEventListener("click", addTask);
var name = "Test3";
var age = 22;
const calcFunction = () => {
  console.log(this);
  console.log(`My name is ${this.name} I'm ${this.age} years old`);
};
const obj = {
  name: "Test",
  age: 35,
  cal: calcFunction,
};

const obj2 = {
  name: "Test2",
  age: 22,
  cal: calcFunction,
};

function thisTest() {
  let obj1 = "Ramy";
  var obj2 = "Ahmed";
  console.log(this);
  const x = () => {
    console.log(this);
  };
  x();
}