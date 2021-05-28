// Define UI element

let taskForm = document.getElementById("task_form");
let taskInput = document.getElementById("new_task");
let taskFilter = document.getElementById("task_filter");
let clearTask = document.getElementById("clear_task_btn");
let taskList = document.querySelector("ul");

taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearTask.addEventListener("click", clearTasks);
taskFilter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTasks);

function addTask(e) {
  if (taskInput.value == "") {
    alert("No Task Inserted!!");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.appendChild(document.createTextNode("X"));
    li.appendChild(link);
    taskList.appendChild(li);
    storeInLocalStorage(taskInput.value);
    taskInput.value = "";
  }
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are You Sure?")) {
      let ele = e.target.parentElement;
      ele.remove();
      removeFromLS(ele);
    }
  }
}

function clearTasks(e) {
  if (confirm("Do you want to clear all the tasks?")) taskList.innerHTML = "";
  localStorage.clear();
}

function filterTask(e) {
  let text = taskFilter.value.toLowerCase();
  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent.toLocaleLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.appendChild(document.createTextNode("X"));
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeFromLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let li = task;
  li.removeChild(li.lastChild);
  tasks.forEach((item, index) => {
    if (li.textContent.trim() === item) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
