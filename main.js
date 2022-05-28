let addButton = document.getElementById("add-task-button");
let taskStorage = JSON.parse(localStorage.getItem("tasks")) || [];
let taskList = document.getElementById("task-list");
let input = document.getElementById("input-task");

loadTasks(taskStorage);
let lastId = taskStorage.length - 1;

addButton.addEventListener("click", addTask);
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
})

function loadTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        // Loading all task in the JSON file
        let taskText = tasks[i];
        showTask(i, taskText);
    }
    input.focus();
}

function addTask() {
    let textNewTask = document.getElementById("input-task").value;
    if (textNewTask.trim().length > 0) {
        showTask(++lastId, textNewTask);
        taskStorage.push(textNewTask);
        localStorage.setItem("tasks", JSON.stringify(taskStorage));
    } else {
        alert("You can't add an empty task");
    }
    input.value = "";
    input.focus();
}

// This function draw the task in the DOM
function showTask(id, text) {
    let element = document.createElement('li');
    element.innerHTML = `<input type="checkbox" id="task-${id}"> <span class="task"><label for="task-${id}">${text}</label></span>
                            <button class="delete-btn" id="delete-button${id}"><i class="fa-regular fa-trash-can"></i></button>`;
    taskList.appendChild(element);

    // Adding the delete function to the button
    let button = document.getElementById(`delete-button${id}` );
    button.addEventListener("click", function () {
        taskStorage.splice(id,1);
        this.parentElement.remove();
        localStorage.setItem("tasks", JSON.stringify(taskStorage));
    })
}
