let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    priority: priority,
    dueDate: dueDate,
    completed: false,
  });

  taskInput.value = "";
  document.getElementById("dueDate").value = "";
  displayTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  displayTasks();
}

function filterTasks(filter) {
  document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(filter + "Btn").classList.add("active");
  displayTasks(filter);
}

function displayTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text} - ${task.priority} - ${task.dueDate}</span>
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})"/>
    `;
    taskList.appendChild(li);
  });
}
