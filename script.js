//selectors
const todoInput = $(".form__input");
const todoButton = $(".form__button");
const todoList = $(".todo-container__list");
const filterOption = $('.form__select__filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.click(addTodo);
todoList.click(deleteCheck);
filterOption.click(filterTodo);

//functions
function addTodo(event) {
    // console.log('hello');
    // preent from submitting 
    event.preventDefault();
    // todo-container__todo
    const todoDiv = $('<div></div>');
    todoDiv.addClass('todo-container__todo');
    // create li 
    const newLi = $('<li></li>');
    if (todoInput[0].value.trim().length == 0) {
        alert('please enter some todos');
    } else {
        newLi.html(todoInput[0].value);


        newLi.addClass('todo-container__todo__item');
        todoDiv.append(newLi);

        //saving todo value in local storage 
        saveLocalTodo(todoInput[0].value);
        //completed button
        const completedButton = $('<button></button>');
        completedButton.html('<i class="fas fa-check todo-container__todo__complete"></i>');
        completedButton.addClass('todo-container__todo__completed-btn');
        todoDiv.append(completedButton);
        //trash button
        const trashButton = $('<button></button>');
        trashButton.html('<i class="fas fa-trash todo-container__todo__trash"></i>');
        trashButton.addClass('todo-container__todo__trash-btn');
        todoDiv.append(trashButton);
        //append to list 
        todoList.append(todoDiv);
        todoInput[0].value = '';
    }

}

function deleteCheck(e) {
    // console.log(e);
    const item = e.target;
    //delete todo 
    if (item.className == 'todo-container__todo__trash-btn') {
        const todoRemove = item.parentNode;
        //animation

        todoRemove.classList.add('fall');
        removeLocalTodos(todoRemove);
        todoRemove.addEventListener('transitionend', function () {

            todoRemove.remove();
            // console.log('im here event ');
        });
    }
    //checkmark
    if (item.className == 'todo-container__todo__completed-btn') {
        const todoComplete = item.parentNode;
        // const todoComplete = item;
        // console.log(todoComplete);
        todoComplete.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList[0].childNodes;
    // console.log(todos);
    $.each(todos, function (indexInArray, todo) {
        if (indexInArray == 0) {
            // console.log('ok');
        } else {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    // todo.css('display','flex');
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
            }
        }
    });
}

function saveLocalTodo(todo) {
    // checking localStorage 
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));


}
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = $('<div></div>');
        todoDiv.addClass('todo-container__todo');
        // create li 
        const newLi = $('<li></li>');
        newLi.html(todo);


        newLi.addClass('todo-container__todo__item');
        todoDiv.append(newLi);
        //completed button
        const completedButton = $('<button></button>');
        completedButton.html('<i class="fas fa-check todo-container__todo__complete"></i>');
        completedButton.addClass('todo-container__todo__completed-btn');
        todoDiv.append(completedButton);
        //trash button
        const trashButton = $('<button></button>');
        trashButton.html('<i class="fas fa-trash todo-container__todo__trash"></i>');
        trashButton.addClass('todo-container__todo__trash-btn');
        todoDiv.append(trashButton);
        //append to list 
        todoList.append(todoDiv);
    });
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todos.indexOf(todo.innerText);
    // console.log(todoIndex);
    // delete todos[todoIndex];
    todos.splice(todoIndex,1); 
    localStorage.setItem('todos',JSON.stringify(todos));

}