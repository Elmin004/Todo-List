const todoInput = document.querySelector("#todo-enter");
const form = document.querySelector("#todo-form");
const ul = document.querySelector(".list-group");
const warn = document.querySelector("#warn");
const success = document.querySelector("#success");

form.addEventListener("submit", addTodo);
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    // trim() soldan ve sagdan bosluqlari kesmek ucun
    if (newTodo === "") {
        warn.style.display = "block";

        setTimeout(function(){
            warn.style.display = "none";
        },2000);
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        success.style.display = "block";
        setTimeout(function(){
            success.style.display = "none";
        },2000);
    }

    e.preventDefault();
}
document.addEventListener("DOMContentLoaded",function run(){ //Sehife yenilendikde local storage-den olan todo-lari saxliyir
    let todos = getTodoFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
})
function getTodoFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){ //Local storage-e todolari gonderir
    let todos = getTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    ul.appendChild(listItem);

    todoInput.value = "";
}
