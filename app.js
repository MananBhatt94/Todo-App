// let title={
//     title:document.getElementById('Title').value,
//     description:document.getElementById('description').value
// }

var id = 0;
let tasklist = []; 
try{ tasklist = JSON.parse(localStorage.getItem("task")) } catch(e){}

let tasks = document.getElementById("tasklist");

if (localStorage.getItem("task")) {
    try { 
        tasklist = JSON.parse(localStorage.getItem("task")); 
        tasklist.forEach((task) => {
            if (tasks) {
                displayTask(task.title, task.desc, task.id);
            }
        });
    } catch(e) {
        console.error(e);
    }
}
function addTask() {
    let titleElement = document.getElementById('Title');
    let descElement = document.getElementById('description');
    if (titleElement && descElement) {
        let title = titleElement.value;
        let desc = descElement.value;
        tasklist.push({ id: ++id, title: title, desc: desc });
        if (tasks) {
            displayTask(title, desc, id);
        }
        localStorage.setItem("task",JSON.stringify(tasklist));
    }
}function displayTask(title, desc, id) {


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

    

    

    // const del = taskitem.querySelector(".btn-delete");
    // del.addEventListener("click",()=>{
    //     tasks.removeChild(taskitem);
    // });



    //for appending the new task to the given task only with the remaining task
}

function search() {
    let search = document.getElementById('Search').value.toLowerCase();
    tasks.innerHTML = "";
    if(search!==''){
    let filterdTask = tasklist.filter((task) => task.title.toLowerCase() == search);
    filterdTask.forEach((task) => {
        displayTask(task.title, task.desc, task.id);
    });
    }
    else{
        tasklist.forEach((task) => {
            displayTask(task.title, task.desc, task.id);
        });
    }
}


// function displayTask(title, desc,id){
//     const taskitem=document.getElementById('tasklist'); //for storing the value of the recent task
//      taskitem.innerHTML+= `<div class="body bg-white mt-3 row"> 
//      <div class="col">
//         ${id}
//     </div>
//      <div class="col">
//        ${title}
//    </div>
//    <div class="col">
//        ${desc}
//    </div>
//    <div class="col">
//        <button class="btn btn-danger" id="delete onclick="delItem()"   ">X</button>
//    </div>
// </div>`;
// //for appending the new task to the given task only with the remaining task
// }

function taskCompleted(id){
    let done = tasks.getElementsByClassName('mycheck')[0].checked;
    if(done==true){
        tasks.querySelector(`div[data-taskid="${id}"]`).classList.add("checkded")
    }
    else{
        tasks.querySelector(`div[data-taskid="${id}"]`).classList.remove("checkded")
    }
}

function delItem(id) {
    tasks.querySelector(`div[data-taskid="${id}"]`).remove();
    tasklist = tasklist.filter((task) => task.id != id);
    localStorage.setItem("task",JSON.stringify(tasklist));

}
