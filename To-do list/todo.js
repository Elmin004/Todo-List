const todoInput = document.querySelector("#todo-enter");
const form = document.querySelector("#todo-form");
const ul = document.querySelector(".list-group");
const warn = document.querySelector("#warn");
const success = document.querySelector("#success");
const different = document.querySelector("#no-similar");
const filter = document.querySelector("#todo-search");
const button = document.querySelector("#clear-todos");


function allEventListeners(){
    //Bütün event-leri bura yazıram
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    document.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    button.addEventListener("click",clearTodos);
}
allEventListeners();

function clearTodos(e){
    if(confirm("Silmek istediyinizden eminsiniz?")){
        // ul.innerHTML = ""; Kiçik proyektlerde
        while(ul.firstElementChild){    // or (ul.firstElementChild != null){}
            ul.removeChild(ul.firstElementChild);
        }  //bura kimi front tərəfdən silmək idi
        // hamısını local storage-den silmək :
        localStorage.removeItem("todos");

    }
}

function filterTodos(e){
    //todo-ları filtrleme
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //tapılmır
            listItem.setAttribute("style","display: none !important");
        }
        else{
            //tapılır
            listItem.setAttribute("style","display: block");
        }
    })
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        e.preventDefault();
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodoFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); //Array-den sildim
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    // trim() soldan ve sağdan boşluqları kəsmək üçün
    if (newTodo === "") {
        warn.style.display = "block";

        setTimeout(function(){
            warn.style.display = "none";
        },2000);
    }
    else {
        let todos = getTodoFromStorage();
        let bl = todos.includes(newTodo);     // local storage-də olub-olmadığını yoxladım    
        if(bl){                  // təkrar todo-nun qarşısını almaq üçün
                different.setAttribute("style","display: block");
                setTimeout(function(){
                    different.style.display = "none";
                },2000);

        }
        else{ 
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        success.style.display = "block";
        setTimeout(function(){
            success.style.display = "none";
        },2000);
    }
    }

    e.preventDefault();
}
function pageLoaded(){
    //Səhifə yeniləndikdə local storage-den olan todo-ları saxlıyır
    let todos = getTodoFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function getTodoFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        //Stringi Js obyektine çevirmek üçün
    }
    return todos;
}
function addTodoToStorage(newTodo){ 
    //Local storage-e todolari göndərir
    let todos = getTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));  
    //JSON.stringify JS obyektini String-e dönüşdürmək üçündür
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