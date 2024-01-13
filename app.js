// Initialize id to 0
var id = 0;

// Retrieve task list from local storage or initialize an empty array if it doesn't exist
let tasklist = JSON.parse(localStorage.getItem("task")) || [];

// Get the tasklist element from the DOM
let tasks = document.getElementById("tasklist");

// If tasklist exists, display each task
if (tasklist) {
    tasklist.forEach((task) => {
        if (tasks) {
            displayTask(task.title, task.desc, task.id);
        }
    });
}

// Function to add a task
function addTask() {
    // Get the title and description elements from the DOM
    let titleElement = document.getElementById('Title');
    let descElement = document.getElementById('description');
    if (titleElement && descElement) {
        // Get the values of title and description
        let title = titleElement.value;
        let desc = descElement.value;
        // Push the new task to the tasklist
        tasklist.push({ id: ++id, title: title, desc: desc });
        // Display the new task
        if (tasks) {
            displayTask(title, desc, id);
        }
        // Update the tasklist in local storage
        localStorage.setItem("task",JSON.stringify(tasklist));
    }
    // Clear the input fields
    titleElement.value = "";
    descElement.value = "";
}

// Function to display a task
function displayTask(title, desc, id) {
    // Append the task to the tasks element
    tasks.innerHTML += `<div class="body bg-white mt-3 row" data-taskid="${id}"> 
    <div class="col">
    <input type="checkbox" class="mycheck" onchange="taskCompleted(${id})">
   </div>
    <div class="col">
      ${title}
   </div>
   <div class="col">
       ${desc}
   </div>
   <div class="col">
       <button class="btn btn-danger btn-delete del" onclick="delItem(${id})">x</button>
   </div>
</div>`
}

// Function to search for a task
function search() {
    // Get the search value
    let search = document.getElementById('Search').value.toLowerCase();
    // Clear the tasks element
    tasks.innerHTML = "";
    if(search!==''){
    // Filter the tasklist based on the search value
    let filterdTask = tasklist.filter((task) => task.title.toLowerCase() == search);
    // Display the filtered tasks
    filterdTask.forEach((task) => {
        displayTask(task.title, task.desc, task.id);
    });
    }
    else{
        // If no search value, display all tasks
        tasklist.forEach((task) => {
            displayTask(task.title, task.desc, task.id);
        });
    }
}

// Function to mark a task as completed
function taskCompleted(id){
    // Get the checked status of the task
    let done = tasks.getElementsByClassName('mycheck')[0].checked;
    if(done==true){
        // If task is completed, add the checked class
        tasks.querySelector(`div[data-taskid="${id}"]`).classList.add("checkded")
    }
    else{
        // If task is not completed, remove the checked class
        tasks.querySelector(`div[data-taskid="${id}"]`).classList.remove("checkded")
    }
}

// Function to delete a task
function delItem(id) {
    // Remove the task from the DOM
    tasks.querySelector(`div[data-taskid="${id}"]`).remove();
    // Remove the task from the tasklist
    tasklist = tasklist.filter((task) => task.id != id);
    // Update the tasklist in local storage
    localStorage.setItem("task",JSON.stringify(tasklist));
}